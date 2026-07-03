import { defaultSettings } from './attendanceDefaults';
import type {
  ApiResult,
  AttendancePayload,
  AttendanceSettings,
  AuthSession,
  EmployeeProfile,
  LeaveSummary,
  UserAccount,
  UserAccountInput
} from './types';

const ENV_API_BASE_URL = cleanConfigValue(import.meta.env.VITE_ATTENDANCE_API_BASE_URL || '/api/attendance');
const LEGACY_ACCESS_TOKEN = cleanConfigValue(import.meta.env.VITE_ADMIN_ACCESS_TOKEN || '');
const SESSION_STORAGE_KEY = 'viora-admin-session';

type ApiBaseResponse = {
  ok: boolean;
  message?: string;
};

type HealthResponse = ApiBaseResponse & {
  service?: string;
  version?: string;
  timestamp?: string;
};

type LoginResponse = ApiBaseResponse & {
  token: string;
  user: AuthSession['user'];
  expiresAt?: string;
};

type SaveResponse = ApiBaseResponse & {
  rows?: number;
  updatedAt?: string;
  leaveSummary?: LeaveSummary;
};

type LoadResponse = ApiBaseResponse & {
  payload?: AttendancePayload | null;
  employee?: Partial<EmployeeProfile>;
  settings?: Partial<AttendanceSettings>;
  rows?: AttendancePayload['rows'];
  leaveSummary?: LeaveSummary;
  updatedAt?: string;
};

type EmployeeListResponse = ApiBaseResponse & {
  employees: EmployeeProfile[];
};

type EmployeeResponse = ApiBaseResponse & {
  employee: EmployeeProfile;
};

type UserListResponse = ApiBaseResponse & {
  users: UserAccount[];
};

type LeaveSummaryResponse = ApiBaseResponse & {
  leaveSummary: LeaveSummary;
};

function cleanConfigValue(value: unknown) {
  return String(value || '')
    .trim()
    .replace(/^[`'"<]+|[`'">]+$/g, '')
    .trim();
}

function resolveApiUrl(action: string, query: Record<string, string | number | undefined> = {}) {
  const base = ENV_API_BASE_URL || '/api/attendance';
  const url = /^https?:\/\//i.test(base)
    ? new URL(base)
    : new URL(base, window.location.origin);

  url.searchParams.set('action', action);

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

function getSafeApiUrlForMessage(url: string) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete('token');
    return parsed.toString();
  } catch {
    return url.replace(/token=[^&]+/g, 'token=***');
  }
}

export function getStoredSession(): AuthSession | null {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as AuthSession;
    if (!session?.token || !session?.user?.username) return null;
    return session;
  } catch {
    return null;
  }
}

export function storeSession(session: AuthSession) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

function getAuthToken() {
  return getStoredSession()?.token || LEGACY_ACCESS_TOKEN;
}

function getAuthHeaders(skipAuth = false) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  const token = getAuthToken();
  if (!skipAuth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function requestApi<T extends ApiBaseResponse>(
  action: string,
  options: {
    method?: 'GET' | 'POST';
    query?: Record<string, string | number | undefined>;
    body?: unknown;
    skipAuth?: boolean;
  } = {}
): Promise<T> {
  const method = options.method || 'GET';
  const url = resolveApiUrl(action, options.query);

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers: getAuthHeaders(options.skipAuth),
      credentials: 'omit',
      body: method === 'POST' ? JSON.stringify(options.body || {}) : undefined
    });
  } catch (error) {
    throw new Error(
      `Cannot connect to attendance API. Tried: ${getSafeApiUrlForMessage(url)}. ` +
      `Original error: ${error instanceof Error ? error.message : 'Network error'}`
    );
  }

  const text = await response.text();
  let data: T | null = null;

  try {
    data = text ? JSON.parse(text) as T : null;
  } catch {
    throw new Error(
      `Attendance API did not return valid JSON. HTTP ${response.status}. ` +
      `Tried: ${getSafeApiUrlForMessage(url)}. Response: ${text.slice(0, 240)}`
    );
  }

  if (!response.ok || !data?.ok) {
    if (response.status === 401) clearSession();
    throw new Error(data?.message || `Attendance API request failed with HTTP ${response.status}.`);
  }

  return data;
}

function normalizeNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeTime(value: unknown) {
  const text = String(value || '').trim();
  if (!text || text === '--:--') return '';

  const hhmm = text.match(/^(\d{1,2}):(\d{2})/);
  if (hhmm) return `${hhmm[1].padStart(2, '0')}:${hhmm[2]}`;

  return text;
}

function normalizeSettings(settings: Partial<AttendanceSettings> | undefined): AttendanceSettings {
  return {
    basicStart: normalizeTime(settings?.basicStart) || defaultSettings.basicStart,
    basicEnd: normalizeTime(settings?.basicEnd) || defaultSettings.basicEnd,
    earlyStart: normalizeTime(settings?.earlyStart) || defaultSettings.earlyStart,
    earlyEnd: normalizeTime(settings?.earlyEnd) || defaultSettings.earlyEnd,
    overtimeStart: normalizeTime(settings?.overtimeStart) || defaultSettings.overtimeStart,
    overtimeEnd: normalizeTime(settings?.overtimeEnd) || defaultSettings.overtimeEnd,
    nightStart: normalizeTime(settings?.nightStart) || defaultSettings.nightStart,
    nightEnd: normalizeTime(settings?.nightEnd) || defaultSettings.nightEnd,
    breakMinutes: normalizeNumber(settings?.breakMinutes, defaultSettings.breakMinutes),
    startRoundMinutes: normalizeNumber(settings?.startRoundMinutes, defaultSettings.startRoundMinutes),
    endRoundMinutes: normalizeNumber(settings?.endRoundMinutes, defaultSettings.endRoundMinutes)
  };
}

function normalizePayloadFromLoadResponse(
  response: LoadResponse,
  employeeNo: string,
  year: number,
  month: number
): AttendancePayload | null {
  if (response.payload) {
    return {
      ...response.payload,
      employee: {
        employeeNo: response.payload.employee.employeeNo || employeeNo,
        name: response.payload.employee.name || '',
        department: response.payload.employee.department || '',
        joinDate: response.payload.employee.joinDate || '',
        email: response.payload.employee.email || '',
        status: response.payload.employee.status || 'active'
      },
      year: normalizeNumber(response.payload.year, year),
      month: normalizeNumber(response.payload.month, month),
      settings: normalizeSettings(response.payload.settings),
      rows: (response.payload.rows || []).map((row) => ({
        ...row,
        timecardIn: normalizeTime(row.timecardIn),
        timecardOut: normalizeTime(row.timecardOut),
        workStart: normalizeTime(row.workStart),
        workEnd: normalizeTime(row.workEnd),
        basicMinutes: normalizeNumber(row.basicMinutes),
        overtimeMinutes: normalizeNumber(row.overtimeMinutes),
        nightMinutes: normalizeNumber(row.nightMinutes),
        totalMinutes: normalizeNumber(row.totalMinutes)
      }))
    };
  }

  if (!response.rows || !response.rows.length) return null;

  return {
    employee: {
      employeeNo: response.employee?.employeeNo || employeeNo,
      name: response.employee?.name || '',
      department: response.employee?.department || '',
      joinDate: response.employee?.joinDate || '',
      email: response.employee?.email || '',
      status: response.employee?.status || 'active'
    },
    year,
    month,
    settings: normalizeSettings(response.settings),
    rows: response.rows.map((row) => ({
      ...row,
      timecardIn: normalizeTime(row.timecardIn),
      timecardOut: normalizeTime(row.timecardOut),
      workStart: normalizeTime(row.workStart),
      workEnd: normalizeTime(row.workEnd),
      basicMinutes: normalizeNumber(row.basicMinutes),
      overtimeMinutes: normalizeNumber(row.overtimeMinutes),
      nightMinutes: normalizeNumber(row.nightMinutes),
      totalMinutes: normalizeNumber(row.totalMinutes)
    })),
    summary: {
      workDays: 0,
      absenceDays: 0,
      paidLeaveDays: 0,
      compensatoryLeaveDays: 0,
      holidayWorkDays: 0,
      publicHolidayDays: 0,
      totalMinutes: 0,
      basicMinutes: 0,
      overtimeMinutes: 0,
      nightMinutes: 0
    },
    updatedAt: response.updatedAt || ''
  };
}

export function isGoogleSheetConfigured() {
  return Boolean(getAuthToken());
}

export async function loginAdmin(username: string, password: string): Promise<AuthSession> {
  const response = await requestApi<LoginResponse>('login', {
    method: 'POST',
    body: { username, password },
    skipAuth: true
  });

  const session: AuthSession = {
    token: response.token,
    user: response.user,
    expiresAt: response.expiresAt
  };
  storeSession(session);
  return session;
}

export async function testGoogleSheetConnection(): Promise<ApiResult> {
  try {
    const response = await requestApi<HealthResponse>('health', { skipAuth: true });
    return {
      ok: true,
      mode: 'api',
      message: `Connected to Attendance API. ${response.version || ''} ${response.timestamp || ''}`.trim()
    };
  } catch (error) {
    return {
      ok: false,
      mode: 'api',
      message: error instanceof Error ? error.message : 'Cannot connect to Attendance API.'
    };
  }
}

export async function loadAttendanceFromSheet(employeeNo: string, year: number, month: number) {
  const response = await requestApi<LoadResponse>('load', {
    query: {
      employeeNo,
      year,
      month
    }
  });

  return {
    payload: normalizePayloadFromLoadResponse(response, employeeNo, year, month),
    employee: response.employee,
    leaveSummary: response.leaveSummary || null
  };
}

export async function saveAttendanceToSheet(payload: AttendancePayload): Promise<ApiResult & { leaveSummary?: LeaveSummary }> {
  if (!payload.employee.employeeNo.trim()) {
    return {
      ok: false,
      mode: 'local',
      message: 'Employee number is required before syncing to Google Sheet.'
    };
  }

  try {
    const response = await requestApi<SaveResponse>('save', {
      method: 'POST',
      body: payload
    });

    return {
      ok: true,
      mode: 'api',
      leaveSummary: response.leaveSummary,
      message: response.message || `Saved ${response.rows || payload.rows.length} attendance rows to Google Sheet.`
    };
  } catch (error) {
    return {
      ok: false,
      mode: 'api',
      message: error instanceof Error ? error.message : 'Cannot save attendance to Google Sheet.'
    };
  }
}

export async function getLeaveSummary(employeeNo: string, year: number, month: number) {
  const response = await requestApi<LeaveSummaryResponse>('leaveSummary', {
    query: { employeeNo, year, month }
  });
  return response.leaveSummary;
}

export async function listEmployees() {
  const response = await requestApi<EmployeeListResponse>('listEmployees');
  return response.employees || [];
}

export async function getEmployeeFromSheet(employeeNo: string) {
  const response = await requestApi<EmployeeResponse>('getEmployee', {
    query: { employeeNo }
  });
  return response.employee;
}

export async function saveEmployee(employee: EmployeeProfile) {
  const response = await requestApi<EmployeeListResponse & { employee?: EmployeeProfile }>('saveEmployee', {
    method: 'POST',
    body: employee
  });
  return response;
}

export async function deleteEmployee(employeeNo: string) {
  const response = await requestApi<EmployeeListResponse>('deleteEmployee', {
    method: 'POST',
    body: { employeeNo }
  });
  return response;
}

export async function listUsers() {
  const response = await requestApi<UserListResponse>('listUsers');
  return response.users || [];
}

export async function saveUser(user: UserAccountInput) {
  const response = await requestApi<UserListResponse & { user?: UserAccount }>('saveUser', {
    method: 'POST',
    body: user
  });
  return response;
}

export async function deleteUser(username: string) {
  const response = await requestApi<UserListResponse>('deleteUser', {
    method: 'POST',
    body: { username }
  });
  return response;
}
