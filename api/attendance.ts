import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto';
import { google } from 'googleapis';

const SHEET_NAMES = {
  employees: 'Employees',
  attendance: 'Attendance',
  settings: 'Settings',
  holidays: 'Holidays',
  users: 'Users',
  leaveBalances: 'LeaveBalances',
  auditLogs: 'AuditLogs'
} as const;

const HEADERS = {
  employees: ['employeeNo', 'employeeName', 'department', 'updatedAt', 'joinDate', 'email', 'status'],
  attendance: [
    'recordKey',
    'employeeNo',
    'employeeName',
    'department',
    'year',
    'month',
    'date',
    'day',
    'weekday',
    'attendanceType',
    'timecardIn',
    'timecardOut',
    'workStart',
    'workEnd',
    'breakMinutes',
    'basicMinutes',
    'overtimeMinutes',
    'nightMinutes',
    'totalMinutes',
    'note',
    'updatedAt'
  ],
  settings: [
    'settingKey',
    'employeeNo',
    'year',
    'month',
    'basicStart',
    'basicEnd',
    'earlyStart',
    'earlyEnd',
    'overtimeStart',
    'overtimeEnd',
    'nightStart',
    'nightEnd',
    'breakMinutes',
    'startRoundMinutes',
    'endRoundMinutes',
    'updatedAt'
  ],
  holidays: ['holidayName', 'date', 'weekday'],
  users: ['username', 'displayName', 'role', 'status', 'passwordHash', 'passwordSalt', 'createdAt', 'updatedAt'],
  leaveBalances: [
    'balanceKey',
    'employeeNo',
    'employeeName',
    'department',
    'asOfDate',
    'joinDate',
    'grantDate',
    'grantedDays',
    'usedDays',
    'remainingDays',
    'expiresAt',
    'isExpired',
    'status',
    'summaryRemainingDays',
    'summaryUsedDays',
    'summaryExpiringDays',
    'summaryExpiringDate',
    'calculatedAt'
  ],
  auditLogs: ['timestamp', 'action', 'employeeNo', 'year', 'month', 'message']
} as const;

const DEFAULT_SETTINGS = {
  basicStart: '09:00',
  basicEnd: '18:00',
  earlyStart: '05:00',
  earlyEnd: '10:00',
  overtimeStart: '19:00',
  overtimeEnd: '22:00',
  nightStart: '22:00',
  nightEnd: '05:00',
  breakMinutes: 60,
  startRoundMinutes: 30,
  endRoundMinutes: 10
};

const SCHEMA_CACHE_MS = Number(process.env.SHEETS_SCHEMA_CACHE_MS || 5 * 60 * 1000);
const READ_CACHE_MS = Number(process.env.SHEETS_READ_CACHE_MS || 20 * 1000);

let schemaEnsuredAt = 0;
const recordCache = new Map<string, { expiresAt: number; records: RecordObject[] }>();


const ROLES = ['superAdmin', 'admin', 'viewer'] as const;
type UserRole = typeof ROLES[number];
type SheetName = keyof typeof HEADERS;
type RecordObject = Record<string, string | number>;

type AuthUser = {
  username: string;
  displayName: string;
  role: UserRole;
};

type AttendancePayload = {
  employee: {
    employeeNo: string;
    name?: string;
    employeeName?: string;
    department?: string;
    joinDate?: string;
    email?: string;
    status?: string;
  };
  year: number;
  month: number;
  settings?: Record<string, unknown>;
  rows: Array<Record<string, unknown>>;
  summary?: Record<string, unknown>;
  updatedAt?: string;
};

function setCors(res: VercelResponse) {
  const allowedOrigin = process.env.ADMIN_ALLOWED_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}

function getBearerToken(req: VercelRequest) {
  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) return auth.slice('Bearer '.length);
  if (typeof req.query.token === 'string') return req.query.token;
  return '';
}

function getSessionSecret() {
  return process.env.SESSION_SECRET || process.env.ADMIN_API_TOKEN || 'viora-local-development-secret';
}

function base64UrlEncode(input: string | Buffer) {
  return Buffer.from(input).toString('base64url');
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, 'base64url').toString('utf8');
}

function sign(data: string) {
  return createHmac('sha256', getSessionSecret()).update(data).digest('base64url');
}

function issueToken(user: AuthUser) {
  const expiresInSeconds = Number(process.env.SESSION_TTL_SECONDS || 60 * 60 * 12);
  const payload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

function verifyToken(token: string): AuthUser | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encodedPayload, signature] = parts;
  const expected = sign(encodedPayload);

  const sigA = Buffer.from(signature);
  const sigB = Buffer.from(expected);
  if (sigA.length !== sigB.length || !timingSafeEqual(sigA, sigB)) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AuthUser & { exp?: number };
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (!ROLES.includes(payload.role)) return null;
    return {
      username: payload.username,
      displayName: payload.displayName,
      role: payload.role
    };
  } catch {
    return null;
  }
}

function legacyTokenUser(req: VercelRequest): AuthUser | null {
  const expected = process.env.ADMIN_API_TOKEN;
  if (!expected) return null;
  const received = getBearerToken(req);
  if (received !== expected) return null;
  return {
    username: 'api-token',
    displayName: 'API Token Admin',
    role: 'superAdmin'
  };
}

function authorize(req: VercelRequest, roles: UserRole[] = ['superAdmin', 'admin', 'viewer']) {
  const token = getBearerToken(req);
  const user = token ? verifyToken(token) || legacyTokenUser(req) : null;

  if (!user) {
    const error = new Error('Unauthorized. Please login again.');
    (error as Error & { statusCode?: number }).statusCode = 401;
    throw error;
  }

  if (!roles.includes(user.role)) {
    const error = new Error('Forbidden. This account does not have permission for this action.');
    (error as Error & { statusCode?: number }).statusCode = 403;
    throw error;
  }

  return user;
}

function getSpreadsheetId() {
  const value = process.env.GOOGLE_SPREADSHEET_ID;
  if (!value) throw new Error('GOOGLE_SPREADSHEET_ID is not configured.');

  const match = value.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match?.[1] || value;
}

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawPrivateKey = process?.env?.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!email) throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL is not configured.');
  if (!rawPrivateKey) throw new Error('GOOGLE_PRIVATE_KEY is not configured.');

  const privateKey = rawPrivateKey.replace(/\\n/g, '\n');
  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  return google.sheets({ version: 'v4', auth });
}

function columnName(index: number) {
  let name = '';
  let current = index + 1;

  while (current > 0) {
    const remainder = (current - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    current = Math.floor((current - 1) / 26);
  }

  return name;
}

function stringifyCell(value: unknown) {
  if (value === null || value === undefined) return '';
  return String(value);
}

function cloneRecords(records: RecordObject[]) {
  return records.map((record) => ({ ...record }));
}

function getRecordCacheKey(sheetName: string) {
  return `${getSpreadsheetId()}::${sheetName}`;
}

function getCachedRecords(sheetName: string) {
  const cached = recordCache.get(getRecordCacheKey(sheetName));
  if (!cached || cached.expiresAt < Date.now()) return null;
  return cloneRecords(cached.records);
}

function setCachedRecords(sheetName: string, records: RecordObject[]) {
  recordCache.set(getRecordCacheKey(sheetName), {
    expiresAt: Date.now() + READ_CACHE_MS,
    records: cloneRecords(records)
  });
}

function invalidateRecords(sheetName: string) {
  recordCache.delete(getRecordCacheKey(sheetName));
}


function normalizeNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeTime(value: unknown) {
  const text = String(value || '').trim();
  if (!text || text === '--:--') return '';
  const match = text.match(/^(\d{1,2}):(\d{2})/);
  if (match) return `${match[1].padStart(2, '0')}:${match[2]}`;
  return text;
}

function normalizeDate(value: unknown) {
  const text = String(value || '').trim();
  if (!text) return '';
  const iso = text.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (iso) return `${iso[1]}-${iso[2].padStart(2, '0')}-${iso[3].padStart(2, '0')}`;
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return '';
  return formatIsoDate(parsed);
}

function employeeNameFromPayload(payload: AttendancePayload) {
  return String(payload.employee.name || payload.employee.employeeName || '');
}

function settingKey(employeeNo: string, year: number, month: number) {
  return [employeeNo, year, String(month).padStart(2, '0')].join('|');
}

function hashPassword(password: string, salt = randomBytes(16).toString('hex')) {
  const hash = pbkdf2Sync(password, salt, 120000, 32, 'sha256').toString('hex');
  return { hash, salt };
}

function verifyPassword(password: string, salt: string, expectedHash: string) {
  const { hash } = hashPassword(password, salt);
  const a = Buffer.from(hash, 'hex');
  const b = Buffer.from(expectedHash, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}

function parseIsoDate(date: string) {
  const [year, month, day] = normalizeDate(date).split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addYears(date: Date, years: number) {
  const next = new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
  if (date.getMonth() === 1 && date.getDate() === 29 && next.getMonth() !== 1) {
    return new Date(date.getFullYear() + years, 1, 28);
  }
  return next;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function monthEndDate(year: number, month: number) {
  return new Date(year, month, 0);
}

async function ensureSheets(options: { force?: boolean } = {}) {
  if (!options.force && schemaEnsuredAt && Date.now() - schemaEnsuredAt < SCHEMA_CACHE_MS) {
    return;
  }

  const sheets = getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const metadata = await sheets.spreadsheets.get({ spreadsheetId });
  const existingTitles = new Set(
    (metadata.data.sheets || [])
      .map((sheet) => sheet.properties?.title)
      .filter(Boolean)
  );

  const addSheetRequests = Object.values(SHEET_NAMES)
    .filter((title) => !existingTitles.has(title))
    .map((title) => ({
      addSheet: {
        properties: { title }
      }
    }));

  if (addSheetRequests.length) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: addSheetRequests }
    });
  }

  await Promise.all(
    (Object.keys(HEADERS) as SheetName[]).map((key) => ensureHeaders(SHEET_NAMES[key], HEADERS[key] as readonly string[]))
  );

  schemaEnsuredAt = Date.now();
}

async function ensureHeaders(sheetName: string, headers: readonly string[]) {
  const sheets = getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!1:1`
  });

  const current = response.data.values?.[0] || [];
  const isSame = headers.every((header, index) => String(current[index] || '') === header);

  if (!isSame) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1:${columnName(headers.length - 1)}1`,
      valueInputOption: 'RAW',
      requestBody: { values: [[...headers]] }
    });
  }
}

async function readRecords(sheetName: string, headers: readonly string[]) {
  const cached = getCachedRecords(sheetName);
  if (cached) return cached;

  const sheets = getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const endColumn = columnName(headers.length - 1);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A2:${endColumn}`,
    valueRenderOption: 'FORMATTED_VALUE'
  });

  const values = response.data.values || [];
  const records = values.map((row) => {
    const record: RecordObject = {};
    headers.forEach((header, index) => {
      record[header] = String(row[index] ?? '');
    });
    return record;
  });

  setCachedRecords(sheetName, records);
  return cloneRecords(records);
}

async function readRecordsBatch(keys: SheetName[]) {
  const result: Partial<Record<SheetName, RecordObject[]>> = {};
  const missingKeys: SheetName[] = [];

  keys.forEach((key) => {
    const cached = getCachedRecords(SHEET_NAMES[key]);
    if (cached) {
      result[key] = cached;
    } else {
      missingKeys.push(key);
    }
  });

  if (!missingKeys.length) {
    return result;
  }

  const sheets = getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const ranges = missingKeys.map((key) => {
    const headers = HEADERS[key] as readonly string[];
    return `${SHEET_NAMES[key]}!A2:${columnName(headers.length - 1)}`;
  });

  const response = await sheets.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges,
    valueRenderOption: 'FORMATTED_VALUE'
  });

  const valueRanges = response.data.valueRanges || [];
  missingKeys.forEach((key, index) => {
    const headers = HEADERS[key] as readonly string[];
    const values = valueRanges[index]?.values || [];
    const records = values.map((row) => {
      const record: RecordObject = {};
      headers.forEach((header, headerIndex) => {
        record[header] = String(row[headerIndex] ?? '');
      });
      return record;
    });
    setCachedRecords(SHEET_NAMES[key], records);
    result[key] = cloneRecords(records);
  });

  return result;
}

async function replaceRecords(sheetName: string, headers: readonly string[], records: RecordObject[]) {
  const sheets = getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const endColumn = columnName(headers.length - 1);

  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: `${sheetName}!A2:${endColumn}`
  });

  if (records.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A2:${endColumn}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: records.map((record) => headers.map((header) => stringifyCell(record[header])))
      }
    });
  }

  invalidateRecords(sheetName);
  setCachedRecords(sheetName, records);
}

async function appendAuditLog(action: string, employeeNo: string, year: number, month: number, message: string) {
  const sheets = getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_NAMES.auditLogs}!A:F`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[new Date().toISOString(), action, employeeNo, year, month, message]]
    }
  });
}

type PublicEmployee = ReturnType<typeof publicEmployee>;

function publicEmployee(record: RecordObject) {
  return {
    employeeNo: String(record.employeeNo || ''),
    name: String(record.employeeName || ''),
    department: String(record.department || ''),
    joinDate: normalizeDate(record.joinDate) || '',
    email: String(record.email || ''),
    status: String(record.status || 'active') === 'inactive' ? 'inactive' : 'active'
  };
}

function publicUser(record: RecordObject) {
  const role = ROLES.includes(String(record.role) as UserRole) ? String(record.role) as UserRole : 'viewer';
  return {
    username: String(record.username || ''),
    displayName: String(record.displayName || ''),
    role,
    status: String(record.status || 'active') === 'inactive' ? 'inactive' : 'active',
    createdAt: String(record.createdAt || ''),
    updatedAt: String(record.updatedAt || '')
  };
}

async function getEmployees() {
  await ensureSheets();
  const records = await readRecords(SHEET_NAMES.employees, HEADERS.employees);
  return records
    .filter((record) => String(record.employeeNo || '').trim())
    .map(publicEmployee)
    .sort((a, b) => a.employeeNo.localeCompare(b.employeeNo));
}

async function getUsers() {
  await ensureSheets();
  const records = await readRecords(SHEET_NAMES.users, HEADERS.users);
  return records.filter((record) => String(record.username || '').trim());
}

function calculateLeaveSummary(params: {
  employeeNo: string;
  joinDate: string;
  attendanceRecords: RecordObject[];
  asOfDate: string;
}) {
  const employeeNo = params.employeeNo;
  const joinDate = normalizeDate(params.joinDate);
  const join = parseIsoDate(joinDate);
  const asOf = parseIsoDate(params.asOfDate) || new Date();

  if (!employeeNo || !join) {
    return {
      employeeNo,
      asOfDate: formatIsoDate(asOf),
      joinDate: '',
      remainingDays: 0,
      usedDays: 0,
      expiringDays: 0,
      expiringDate: '',
      calculatedAt: new Date().toISOString(),
      grants: [] as Array<Record<string, unknown>>
    };
  }

  const grants: Array<{
    grantDate: string;
    grantedDays: number;
    usedDays: number;
    remainingDays: number;
    expiresAt: string;
    isExpired: boolean;
    status: string;
  }> = [];

  for (let yearIndex = 0; yearIndex <= 80; yearIndex += 1) {
    const grantDate = addYears(join, yearIndex);
    if (grantDate > asOf) break;
    const expiresAt = addDays(addYears(grantDate, 2), -1);
    const grantedDays = Math.min(20, 12 + yearIndex * 2);
    grants.push({
      grantDate: formatIsoDate(grantDate),
      grantedDays,
      usedDays: 0,
      remainingDays: grantedDays,
      expiresAt: formatIsoDate(expiresAt),
      isExpired: expiresAt < asOf,
      status: expiresAt < asOf ? 'expired' : 'active'
    });
  }

  const paidLeaveDates = params.attendanceRecords
    .filter((record) => String(record.employeeNo) === employeeNo && String(record.attendanceType) === 'paidLeave')
    .map((record) => normalizeDate(record.date))
    .filter(Boolean)
    .filter((date) => {
      const parsed = parseIsoDate(date);
      return parsed !== null && parsed <= asOf;
    })
    .sort();

  for (const leaveDateText of paidLeaveDates) {
    const leaveDate = parseIsoDate(leaveDateText);
    if (!leaveDate) continue;

    const grant = grants
      .filter((item) => {
        const grantDate = parseIsoDate(item.grantDate)!;
        const expiresAt = parseIsoDate(item.expiresAt)!;
        return grantDate <= leaveDate && expiresAt >= leaveDate && item.remainingDays > 0;
      })
      .sort((a, b) => a.expiresAt.localeCompare(b.expiresAt))[0];

    if (grant) {
      grant.usedDays += 1;
      grant.remainingDays -= 1;
    }
  }

  grants.forEach((item) => {
    if (item.isExpired) item.status = 'expired';
    else if (item.remainingDays <= 0) item.status = 'used';
    else item.status = 'active';
  });

  const activeGrants = grants.filter((item) => !item.isExpired && item.remainingDays > 0);
  const nextExpiring = [...activeGrants].sort((a, b) => a.expiresAt.localeCompare(b.expiresAt))[0];

  return {
    employeeNo,
    asOfDate: formatIsoDate(asOf),
    joinDate,
    remainingDays: activeGrants.reduce((total, grant) => total + grant.remainingDays, 0),
    usedDays: paidLeaveDates.length,
    expiringDays: nextExpiring?.remainingDays || 0,
    expiringDate: nextExpiring?.expiresAt || '',
    calculatedAt: new Date().toISOString(),
    grants
  };
}


async function persistLeaveSummary(employee: PublicEmployee | undefined, leaveSummary: ReturnType<typeof calculateLeaveSummary>) {
  if (!leaveSummary.employeeNo) return;

  const employeeNo = leaveSummary.employeeNo;
  const calculatedAt = 'calculatedAt' in leaveSummary && typeof leaveSummary.calculatedAt === 'string'
    ? leaveSummary.calculatedAt
    : new Date().toISOString();
  const records = await readRecords(SHEET_NAMES.leaveBalances, HEADERS.leaveBalances);
  const nextRows = (leaveSummary.grants || []).map((grant) => {
    const status = String((grant as { status?: unknown }).status || ((grant as { isExpired?: unknown }).isExpired ? 'expired' : Number((grant as { remainingDays?: unknown }).remainingDays || 0) <= 0 ? 'used' : 'active'));
    return {
      balanceKey: [employeeNo, String((grant as { grantDate?: unknown }).grantDate || '')].join('|'),
      employeeNo,
      employeeName: employee?.name || '',
      department: employee?.department || '',
      asOfDate: leaveSummary.asOfDate,
      joinDate: leaveSummary.joinDate,
      grantDate: stringifyCell((grant as { grantDate?: unknown }).grantDate),
      grantedDays: normalizeNumber((grant as { grantedDays?: unknown }).grantedDays),
      usedDays: normalizeNumber((grant as { usedDays?: unknown }).usedDays),
      remainingDays: normalizeNumber((grant as { remainingDays?: unknown }).remainingDays),
      expiresAt: stringifyCell((grant as { expiresAt?: unknown }).expiresAt),
      isExpired: String(Boolean((grant as { isExpired?: unknown }).isExpired)),
      status,
      summaryRemainingDays: leaveSummary.remainingDays,
      summaryUsedDays: leaveSummary.usedDays,
      summaryExpiringDays: leaveSummary.expiringDays,
      summaryExpiringDate: leaveSummary.expiringDate,
      calculatedAt
    };
  });

  await replaceRecords(SHEET_NAMES.leaveBalances, HEADERS.leaveBalances, [
    ...records.filter((record) => String(record.employeeNo) !== employeeNo),
    ...nextRows
  ]);
}

async function getLeaveSummary(
  employeeNo: string,
  year: number,
  month: number,
  options: {
    persist?: boolean;
    employees?: PublicEmployee[];
    attendanceRecords?: RecordObject[];
  } = {}
) {
  await ensureSheets();
  const employees = options.employees || (await getEmployees());
  const employee = employees.find((item) => item.employeeNo === employeeNo);
  const attendanceRecords = options.attendanceRecords || await readRecords(SHEET_NAMES.attendance, HEADERS.attendance);
  const asOfDate = formatIsoDate(monthEndDate(year, month));

  const leaveSummary = calculateLeaveSummary({
    employeeNo,
    joinDate: employee?.joinDate || '',
    attendanceRecords,
    asOfDate
  });

  if (options.persist) {
    await persistLeaveSummary(employee, leaveSummary);
  }

  return leaveSummary;
}

function calculateLeaveSummaryForLoadedData(
  employee: PublicEmployee | undefined,
  employeeNo: string,
  year: number,
  month: number,
  attendanceRecords: RecordObject[]
) {
  return calculateLeaveSummary({
    employeeNo,
    joinDate: employee?.joinDate || '',
    attendanceRecords,
    asOfDate: formatIsoDate(monthEndDate(year, month))
  });
}

async function handleHealth(res: VercelResponse) {
  return res.status(200).json({
    ok: true,
    service: 'VIORA Attendance API',
    version: 'sheets-api-v4-cache-loading-employee-select',
    timestamp: new Date().toISOString()
  });
}

async function handleLogin(req: VercelRequest, res: VercelResponse) {
  await ensureSheets();

  const username = String(req.body?.username || '').trim();
  const password = String(req.body?.password || '');

  if (!username || !password) {
    return res.status(400).json({ ok: false, message: 'Username and password are required.' });
  }

  const envUsername = process.env.SUPER_ADMIN_USERNAME || 'superadmin';
  const envPassword = process.env.SUPER_ADMIN_PASSWORD || process.env.ADMIN_API_TOKEN;

  if (envPassword && username === envUsername && password === envPassword) {
    const user: AuthUser = {
      username,
      displayName: 'Super Admin',
      role: 'superAdmin'
    };
    return res.status(200).json({ ok: true, user, token: issueToken(user) });
  }

  const users = await getUsers();
  const record = users.find((item) => String(item.username) === username);

  if (!record || String(record.status || 'active') !== 'active') {
    return res.status(401).json({ ok: false, message: 'Invalid username or password.' });
  }

  const role = ROLES.includes(String(record.role) as UserRole) ? String(record.role) as UserRole : 'viewer';
  const valid = verifyPassword(password, String(record.passwordSalt || ''), String(record.passwordHash || ''));

  if (!valid) {
    return res.status(401).json({ ok: false, message: 'Invalid username or password.' });
  }

  const user: AuthUser = {
    username,
    displayName: String(record.displayName || username),
    role
  };

  return res.status(200).json({ ok: true, user, token: issueToken(user) });
}

async function handleMe(req: VercelRequest, res: VercelResponse) {
  const user = authorize(req);
  return res.status(200).json({ ok: true, user });
}

async function handleListEmployees(_req: VercelRequest, res: VercelResponse) {
  const employees = await getEmployees();
  return res.status(200).json({ ok: true, employees });
}

async function handleGetEmployee(req: VercelRequest, res: VercelResponse) {
  const employeeNo = String(req.query.employeeNo || '').trim();
  if (!employeeNo) return res.status(400).json({ ok: false, message: 'employeeNo is required.' });

  const employees = await getEmployees();
  const employee = employees.find((item) => item.employeeNo === employeeNo);
  if (!employee) return res.status(404).json({ ok: false, message: `Employee not found: ${employeeNo}` });

  return res.status(200).json({ ok: true, employee });
}

async function handleSaveEmployee(req: VercelRequest, res: VercelResponse, authUser: AuthUser) {
  await ensureSheets();
  const body = req.body || {};
  const employeeNo = String(body.employeeNo || '').trim();
  const employeeName = String(body.name || body.employeeName || '').trim();
  const department = String(body.department || '').trim();
  const joinDate = normalizeDate(body.joinDate);
  const email = String(body.email || '').trim();
  const status = String(body.status || 'active') === 'inactive' ? 'inactive' : 'active';

  if (!employeeNo) return res.status(400).json({ ok: false, message: 'employeeNo is required.' });
  if (!employeeName) return res.status(400).json({ ok: false, message: 'employee name is required.' });
  if (!joinDate) return res.status(400).json({ ok: false, message: 'joinDate is required for paid leave calculation.' });

  const now = new Date().toISOString();
  const batch = await readRecordsBatch(['employees', 'attendance']);
  const records = batch.employees || [];
  const existing = records.find((record) => String(record.employeeNo) === employeeNo);

  const next = {
    employeeNo,
    employeeName,
    department,
    updatedAt: now,
    joinDate,
    email,
    status
  };

  await replaceRecords(SHEET_NAMES.employees, HEADERS.employees, [
    ...records.filter((record) => String(record.employeeNo) !== employeeNo),
    next
  ]);

  const attendanceRecords = batch.attendance || [];
  const leaveSummary = calculateLeaveSummary({
    employeeNo,
    joinDate,
    attendanceRecords,
    asOfDate: formatIsoDate(new Date())
  });
  await persistLeaveSummary(publicEmployee(next), leaveSummary);

  await appendAuditLog(existing ? 'updateEmployee' : 'createEmployee', employeeNo, 0, 0, `By ${authUser.username}`);
  const employees = await getEmployees();
  return res.status(200).json({ ok: true, message: existing ? 'Employee updated.' : 'Employee created.', employee: publicEmployee(next), employees, leaveSummary });
}

async function handleDeleteEmployee(req: VercelRequest, res: VercelResponse, authUser: AuthUser) {
  await ensureSheets();
  const employeeNo = String(req.query.employeeNo || req.body?.employeeNo || '').trim();
  if (!employeeNo) return res.status(400).json({ ok: false, message: 'employeeNo is required.' });

  const batch = await readRecordsBatch(['employees', 'leaveBalances']);
  const records = batch.employees || [];
  await replaceRecords(SHEET_NAMES.employees, HEADERS.employees, records.filter((record) => String(record.employeeNo) !== employeeNo));
  const leaveRecords = batch.leaveBalances || [];
  await replaceRecords(SHEET_NAMES.leaveBalances, HEADERS.leaveBalances, leaveRecords.filter((record) => String(record.employeeNo) !== employeeNo));
  await appendAuditLog('deleteEmployee', employeeNo, 0, 0, `By ${authUser.username}`);
  const employees = await getEmployees();
  return res.status(200).json({ ok: true, message: 'Employee deleted.', employees });
}

async function handleListUsers(_req: VercelRequest, res: VercelResponse) {
  const records = await getUsers();
  return res.status(200).json({ ok: true, users: records.map(publicUser) });
}

async function handleSaveUser(req: VercelRequest, res: VercelResponse, authUser: AuthUser) {
  await ensureSheets();
  const body = req.body || {};
  const username = String(body.username || '').trim();
  const displayName = String(body.displayName || '').trim() || username;
  const role = ROLES.includes(String(body.role) as UserRole) ? String(body.role) as UserRole : 'viewer';
  const status = String(body.status || 'active') === 'inactive' ? 'inactive' : 'active';
  const password = String(body.password || '');

  if (!username) return res.status(400).json({ ok: false, message: 'username is required.' });

  const now = new Date().toISOString();
  const records = await getUsers();
  const existing = records.find((record) => String(record.username) === username);

  if (!existing && !password) {
    return res.status(400).json({ ok: false, message: 'password is required for new users.' });
  }

  const passwordData = password
    ? hashPassword(password)
    : { hash: String(existing?.passwordHash || ''), salt: String(existing?.passwordSalt || '') };

  const next = {
    username,
    displayName,
    role,
    status,
    passwordHash: passwordData.hash,
    passwordSalt: passwordData.salt,
    createdAt: String(existing?.createdAt || now),
    updatedAt: now
  };

  await replaceRecords(SHEET_NAMES.users, HEADERS.users, [
    ...records.filter((record) => String(record.username) !== username),
    next
  ]);

  await appendAuditLog(existing ? 'updateUser' : 'createUser', username, 0, 0, `By ${authUser.username}`);
  const users = (await getUsers()).map(publicUser);
  return res.status(200).json({ ok: true, message: existing ? 'User updated.' : 'User created.', user: publicUser(next), users });
}

async function handleDeleteUser(req: VercelRequest, res: VercelResponse, authUser: AuthUser) {
  await ensureSheets();
  const username = String(req.query.username || req.body?.username || '').trim();
  if (!username) return res.status(400).json({ ok: false, message: 'username is required.' });
  if (username === authUser.username) return res.status(400).json({ ok: false, message: 'You cannot delete your own account.' });

  const records = await getUsers();
  await replaceRecords(SHEET_NAMES.users, HEADERS.users, records.filter((record) => String(record.username) !== username));
  await appendAuditLog('deleteUser', username, 0, 0, `By ${authUser.username}`);
  const users = (await getUsers()).map(publicUser);
  return res.status(200).json({ ok: true, message: 'User deleted.', users });
}

async function handleLoad(req: VercelRequest, res: VercelResponse) {
  await ensureSheets();

  const employeeNo = String(req.query.employeeNo || '').trim();
  const year = Number(req.query.year);
  const month = Number(req.query.month);

  if (!employeeNo || !year || !month) {
    return res.status(400).json({
      ok: false,
      message: 'employeeNo, year and month are required.'
    });
  }

  const batch = await readRecordsBatch(['employees', 'attendance', 'settings']);
  const employeeRecords = batch.employees || [];
  const attendanceRecords = batch.attendance || [];
  const settingsRecords = batch.settings || [];
  const employeeRecord = employeeRecords.find((record) => String(record.employeeNo) === employeeNo);
  const employee = employeeRecord ? publicEmployee(employeeRecord) : { employeeNo, name: '', department: '', joinDate: '', email: '', status: 'active' };

  const rows = attendanceRecords
    .filter((record) => (
      String(record.employeeNo) === employeeNo &&
      Number(record.year) === year &&
      Number(record.month) === month
    ))
    .sort((a, b) => Number(a.day) - Number(b.day));

  const leaveSummary = calculateLeaveSummaryForLoadedData(employee, employeeNo, year, month, attendanceRecords);

  if (!rows.length) {
    return res.status(200).json({
      ok: true,
      payload: null,
      employee,
      leaveSummary,
      message: 'No attendance data found.'
    });
  }

  const savedSettings = settingsRecords.find((record) => String(record.settingKey) === settingKey(employeeNo, year, month));
  const first = rows[0];

  const payload = {
    employee: {
      employeeNo,
      name: employee.name || String(first.employeeName || ''),
      department: employee.department || String(first.department || ''),
      joinDate: employee.joinDate || '',
      email: employee.email || '',
      status: employee.status || 'active'
    },
    year,
    month,
    settings: {
      basicStart: normalizeTime(savedSettings?.basicStart) || DEFAULT_SETTINGS.basicStart,
      basicEnd: normalizeTime(savedSettings?.basicEnd) || DEFAULT_SETTINGS.basicEnd,
      earlyStart: normalizeTime(savedSettings?.earlyStart) || DEFAULT_SETTINGS.earlyStart,
      earlyEnd: normalizeTime(savedSettings?.earlyEnd) || DEFAULT_SETTINGS.earlyEnd,
      overtimeStart: normalizeTime(savedSettings?.overtimeStart) || DEFAULT_SETTINGS.overtimeStart,
      overtimeEnd: normalizeTime(savedSettings?.overtimeEnd) || DEFAULT_SETTINGS.overtimeEnd,
      nightStart: normalizeTime(savedSettings?.nightStart) || DEFAULT_SETTINGS.nightStart,
      nightEnd: normalizeTime(savedSettings?.nightEnd) || DEFAULT_SETTINGS.nightEnd,
      breakMinutes: normalizeNumber(savedSettings?.breakMinutes, DEFAULT_SETTINGS.breakMinutes),
      startRoundMinutes: normalizeNumber(savedSettings?.startRoundMinutes, DEFAULT_SETTINGS.startRoundMinutes),
      endRoundMinutes: normalizeNumber(savedSettings?.endRoundMinutes, DEFAULT_SETTINGS.endRoundMinutes)
    },
    rows: rows.map((record) => ({
      id: String(record.date || `${year}-${String(month).padStart(2, '0')}-${String(record.day).padStart(2, '0')}`),
      date: String(record.date || ''),
      day: normalizeNumber(record.day),
      weekday: String(record.weekday || ''),
      attendanceType: String(record.attendanceType || ''),
      timecardIn: normalizeTime(record.timecardIn),
      timecardOut: normalizeTime(record.timecardOut),
      workStart: normalizeTime(record.workStart),
      workEnd: normalizeTime(record.workEnd),
      basicMinutes: normalizeNumber(record.basicMinutes),
      overtimeMinutes: normalizeNumber(record.overtimeMinutes),
      nightMinutes: normalizeNumber(record.nightMinutes),
      totalMinutes: normalizeNumber(record.totalMinutes),
      note: String(record.note || '')
    })),
    summary: {},
    updatedAt: String(first.updatedAt || '')
  };

  return res.status(200).json({ ok: true, payload, leaveSummary });
}

function validatePayload(body: unknown): AttendancePayload {
  if (!body || typeof body !== 'object') throw new Error('Request body is required.');
  const payload = body as AttendancePayload;
  const employeeNo = String(payload.employee?.employeeNo || '').trim();
  const year = Number(payload.year);
  const month = Number(payload.month);

  if (!employeeNo) throw new Error('employee.employeeNo is required.');
  if (!year || !month) throw new Error('year and month are required.');
  if (!Array.isArray(payload.rows)) throw new Error('rows must be an array.');

  return {
    ...payload,
    employee: {
      ...payload.employee,
      employeeNo
    },
    year,
    month
  };
}

async function handleSave(req: VercelRequest, res: VercelResponse, authUser: AuthUser) {
  await ensureSheets();

  const payload = validatePayload(req.body);
  const employeeNo = payload.employee.employeeNo;
  const employeeName = employeeNameFromPayload(payload);
  const department = String(payload.employee.department || '');
  const joinDate = normalizeDate(payload.employee.joinDate);
  const email = String(payload.employee.email || '');
  const status = String(payload.employee.status || 'active') === 'inactive' ? 'inactive' : 'active';
  const year = Number(payload.year);
  const month = Number(payload.month);
  const settings = payload.settings || {};
  const now = new Date().toISOString();

  const batch = await readRecordsBatch(['employees', 'settings', 'attendance']);
  const employeeRecords = batch.employees || [];
  const existingEmployee = employeeRecords.find((record) => String(record.employeeNo) === employeeNo);
  await replaceRecords(SHEET_NAMES.employees, HEADERS.employees, [
    ...employeeRecords.filter((record) => String(record.employeeNo) !== employeeNo),
    {
      employeeNo,
      employeeName,
      department,
      updatedAt: now,
      joinDate: joinDate || String(existingEmployee?.joinDate || ''),
      email: email || String(existingEmployee?.email || ''),
      status: status || String(existingEmployee?.status || 'active')
    }
  ]);

  const settingsRecords = batch.settings || [];
  await replaceRecords(SHEET_NAMES.settings, HEADERS.settings, [
    ...settingsRecords.filter((record) => String(record.settingKey) !== settingKey(employeeNo, year, month)),
    {
      settingKey: settingKey(employeeNo, year, month),
      employeeNo,
      year,
      month,
      basicStart: normalizeTime(settings.basicStart) || DEFAULT_SETTINGS.basicStart,
      basicEnd: normalizeTime(settings.basicEnd) || DEFAULT_SETTINGS.basicEnd,
      earlyStart: normalizeTime(settings.earlyStart) || DEFAULT_SETTINGS.earlyStart,
      earlyEnd: normalizeTime(settings.earlyEnd) || DEFAULT_SETTINGS.earlyEnd,
      overtimeStart: normalizeTime(settings.overtimeStart) || DEFAULT_SETTINGS.overtimeStart,
      overtimeEnd: normalizeTime(settings.overtimeEnd) || DEFAULT_SETTINGS.overtimeEnd,
      nightStart: normalizeTime(settings.nightStart) || DEFAULT_SETTINGS.nightStart,
      nightEnd: normalizeTime(settings.nightEnd) || DEFAULT_SETTINGS.nightEnd,
      breakMinutes: normalizeNumber(settings.breakMinutes, DEFAULT_SETTINGS.breakMinutes),
      startRoundMinutes: normalizeNumber(settings.startRoundMinutes, DEFAULT_SETTINGS.startRoundMinutes),
      endRoundMinutes: normalizeNumber(settings.endRoundMinutes, DEFAULT_SETTINGS.endRoundMinutes),
      updatedAt: now
    }
  ]);

  const attendanceRecords = batch.attendance || [];
  const currentMonthKeys = new Set((payload.rows || []).map((row) => `${employeeNo}|${String(row.date || '')}`));
  const keptAttendance = attendanceRecords.filter((record) => !currentMonthKeys.has(String(record.recordKey)));
  const newAttendance = payload.rows.map((row) => {
    const date = String(row.date || '');
    return {
      recordKey: `${employeeNo}|${date}`,
      employeeNo,
      employeeName,
      department,
      year,
      month,
      date,
      day: normalizeNumber(row.day),
      weekday: stringifyCell(row.weekday),
      attendanceType: stringifyCell(row.attendanceType),
      timecardIn: normalizeTime(row.timecardIn),
      timecardOut: normalizeTime(row.timecardOut),
      workStart: normalizeTime(row.workStart),
      workEnd: normalizeTime(row.workEnd),
      breakMinutes: normalizeNumber(settings.breakMinutes, DEFAULT_SETTINGS.breakMinutes),
      basicMinutes: normalizeNumber(row.basicMinutes),
      overtimeMinutes: normalizeNumber(row.overtimeMinutes),
      nightMinutes: normalizeNumber(row.nightMinutes),
      totalMinutes: normalizeNumber(row.totalMinutes),
      note: stringifyCell(row.note),
      updatedAt: now
    };
  });

  await replaceRecords(SHEET_NAMES.attendance, HEADERS.attendance, [...keptAttendance, ...newAttendance]);
  await appendAuditLog('saveAttendance', employeeNo, year, month, `Saved ${newAttendance.length} attendance rows by ${authUser.username}`);

  const savedEmployee = publicEmployee({
    employeeNo,
    employeeName,
    department,
    updatedAt: now,
    joinDate: joinDate || String(existingEmployee?.joinDate || ''),
    email: email || String(existingEmployee?.email || ''),
    status
  });
  const leaveSummary = calculateLeaveSummary({
    employeeNo,
    joinDate: savedEmployee.joinDate || '',
    attendanceRecords: [...keptAttendance, ...newAttendance],
    asOfDate: formatIsoDate(monthEndDate(year, month))
  });
  await persistLeaveSummary(savedEmployee, leaveSummary);

  return res.status(200).json({
    ok: true,
    message: `Saved ${newAttendance.length} attendance rows to Google Sheet.`,
    rows: newAttendance.length,
    leaveSummary,
    updatedAt: now
  });
}

async function handleLeaveSummary(req: VercelRequest, res: VercelResponse) {
  await ensureSheets();
  const employeeNo = String(req.query.employeeNo || '').trim();
  const year = Number(req.query.year || new Date().getFullYear());
  const month = Number(req.query.month || new Date().getMonth() + 1);
  const shouldPersist = String(req.query.persist || '') === '1';
  if (!employeeNo) return res.status(400).json({ ok: false, message: 'employeeNo is required.' });

  const batch = await readRecordsBatch(['employees', 'attendance']);
  const employees = (batch.employees || []).map(publicEmployee);
  const attendanceRecords = batch.attendance || [];
  const employee = employees.find((item) => item.employeeNo === employeeNo);
  const leaveSummary = calculateLeaveSummaryForLoadedData(employee, employeeNo, year, month, attendanceRecords);

  if (shouldPersist) {
    await persistLeaveSummary(employee, leaveSummary);
  }

  return res.status(200).json({ ok: true, leaveSummary });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const action = String(req.query.action || 'health');

    if (req.method === 'GET' && action === 'health') return await handleHealth(res);
    if (req.method === 'POST' && action === 'login') return await handleLogin(req, res);

    const authUser = authorize(req);

    if (req.method === 'GET' && action === 'me') return await handleMe(req, res);
    if (req.method === 'GET' && action === 'load') return await handleLoad(req, res);
    if (req.method === 'POST' && action === 'save') return await handleSave(req, res, authUser);
    if (req.method === 'GET' && action === 'leaveSummary') return await handleLeaveSummary(req, res);

    if (req.method === 'GET' && action === 'listEmployees') return await handleListEmployees(req, res);
    if (req.method === 'GET' && action === 'getEmployee') return await handleGetEmployee(req, res);
    if (req.method === 'POST' && action === 'saveEmployee') return await handleSaveEmployee(req, res, authorize(req, ['superAdmin', 'admin']));
    if (req.method === 'POST' && action === 'deleteEmployee') return await handleDeleteEmployee(req, res, authorize(req, ['superAdmin', 'admin']));

    if (req.method === 'GET' && action === 'listUsers') return await handleListUsers(req, res);
    if (req.method === 'POST' && action === 'saveUser') return await handleSaveUser(req, res, authorize(req, ['superAdmin']));
    if (req.method === 'POST' && action === 'deleteUser') return await handleDeleteUser(req, res, authorize(req, ['superAdmin']));

    return res.status(404).json({ ok: false, message: `Unknown action: ${action}` });
  } catch (error) {
    const statusCode =
      typeof error === 'object' &&
      error !== null &&
      'statusCode' in error &&
      typeof (error as { statusCode?: unknown }).statusCode === 'number'
        ? (error as { statusCode: number }).statusCode
        : 500;

    return res.status(statusCode).json({
      ok: false,
      message: error instanceof Error ? error.message : 'Unknown server error.'
    });
  }
}
