/**
 * VIORA Attendance Admin - Google Apps Script backend
 *
 * Deploy as Web App:
 * - Execute as: Me
 * - Who has access: Anyone with the link, or Anyone in your organization
 *
 * Script Properties:
 * - SPREADSHEET_ID: Google Sheet ID or full spreadsheet URL
 * - ADMIN_TOKEN: same value as VITE_ADMIN_ACCESS_TOKEN in React .env
 *
 * v8 keeps the chunked JSONP save flow, normalizes Google Sheets
 * Date/time cell values, and supports a frontend connection health check.
 */

const SHEET_NAMES = {
  employees: 'Employees',
  attendance: 'Attendance',
  settings: 'Settings',
  holidays: 'Holidays',
  auditLogs: 'AuditLogs'
};

const HEADERS = {
  employees: ['employeeNo', 'employeeName', 'department', 'updatedAt'],
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
  auditLogs: ['timestamp', 'action', 'employeeNo', 'year', 'month', 'message']
};

function doGet(e) {
  const params = (e && e.parameter) ? e.parameter : {};
  const action = String(params.action || 'health');
  const callback = params.callback || '';

  try {
    authorize_(params.token);

    // Health check must not touch Google Sheet.
    // This lets you verify the deployment URL and token even before sheet access is working.
    if (action === 'health') {
      return output_({
        ok: true,
        message: 'VIORA Attendance API is running',
        version: 'v8',
        timestamp: new Date().toISOString()
      }, callback);
    }

    if (action === 'debugWrite') {
      return output_(debugWrite_(params.message || 'Manual debug write'), callback);
    }

    if (action === 'testSaveSample') {
      const employeeNo = String(params.employeeNo || 'TEST001');
      const year = Number(params.year || new Date().getFullYear());
      const month = Number(params.month || (new Date().getMonth() + 1));
      ensureSheets_();
      return output_(saveAttendance_(buildSamplePayload_(employeeNo, year, month)), callback);
    }

    // Frontend save flow. It uploads the JSON payload in small JSONP chunks,
    // then commits the upload. This is more reliable than fetch(..., no-cors)
    // for Apps Script Web Apps and still requires no backend server.
    if (action === 'startSaveUpload') {
      return output_(startSaveUpload_(params.uploadId, Number(params.total || 0)), callback);
    }

    if (action === 'saveUploadChunk') {
      return output_(saveUploadChunk_(
        params.uploadId,
        Number(params.index || 0),
        Number(params.total || 0),
        String(params.chunk || '')
      ), callback);
    }

    if (action === 'commitSaveUpload') {
      return output_(commitSaveUpload_(params.uploadId, Number(params.total || 0)), callback);
    }

    ensureSheets_();

    if (action === 'getAttendance') {
      const employeeNo = String(params.employeeNo || '');
      const year = Number(params.year || 0);
      const month = Number(params.month || 0);
      return output_(getAttendance_(employeeNo, year, month), callback);
    }

    if (action === 'getEmployees') {
      return output_(getEmployees_(), callback);
    }

    return output_({ ok: false, message: 'Unknown action: ' + action }, callback);
  } catch (err) {
    return output_({ ok: false, message: String(err && err.message ? err.message : err) }, callback);
  }
}

function doPost(e) {
  try {
    const body = parsePostBody_(e);
    authorize_(body.token);
    ensureSheets_();

    if (body.action === 'saveAttendance') {
      const result = saveAttendance_(body.payload);
      return output_(result, '');
    }

    return output_({ ok: false, message: 'Unknown action: ' + body.action }, '');
  } catch (err) {
    return output_({ ok: false, message: String(err && err.message ? err.message : err) }, '');
  }
}

function parsePostBody_(e) {
  const parameters = (e && e.parameter) ? e.parameter : {};

  // Preferred browser request from the React app: application/x-www-form-urlencoded.
  // Apps Script exposes this in e.parameter.
  if (parameters.action || parameters.payload || parameters.token) {
    return {
      action: String(parameters.action || ''),
      token: String(parameters.token || ''),
      payload: parameters.payload ? JSON.parse(parameters.payload) : null
    };
  }

  const raw = String((e && e.postData && e.postData.contents) || '').trim();
  if (!raw) return {};

  // Backward compatibility with older frontend version using text/plain JSON.
  if (raw.charAt(0) === '{') {
    return JSON.parse(raw);
  }

  // Fallback for raw form data.
  const form = parseQueryString_(raw);
  return {
    action: String(form.action || ''),
    token: String(form.token || ''),
    payload: form.payload ? JSON.parse(form.payload) : null
  };
}

function parseQueryString_(query) {
  const result = {};
  String(query || '').split('&').forEach(function (part) {
    if (!part) return;
    const pair = part.split('=');
    const key = decodeURIComponent(String(pair.shift() || '').replace(/\+/g, ' '));
    const value = decodeURIComponent(String(pair.join('=') || '').replace(/\+/g, ' '));
    result[key] = value;
  });
  return result;
}

function output_(data, callback) {
  const text = callback ? callback + '(' + JSON.stringify(data) + ');' : JSON.stringify(data);
  const mimeType = callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON;
  return ContentService.createTextOutput(text).setMimeType(mimeType);
}

function authorize_(token) {
  const requiredToken = PropertiesService.getScriptProperties().getProperty('ADMIN_TOKEN');
  if (!requiredToken) return true;
  if (String(token || '') !== requiredToken) {
    throw new Error('Unauthorized. Check ADMIN_TOKEN in Apps Script and VITE_ADMIN_ACCESS_TOKEN in .env.');
  }
  return true;
}

function getSpreadsheet_() {
  const rawSpreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');

  if (rawSpreadsheetId) {
    const spreadsheetId = extractSpreadsheetId_(rawSpreadsheetId);

    try {
      return SpreadsheetApp.openById(spreadsheetId);
    } catch (err) {
      throw new Error(
        'Cannot open Google Sheet. Check SPREADSHEET_ID and make sure the Google account running this Web App has access. ' +
        'Resolved spreadsheet ID: ' + spreadsheetId + '. Original error: ' +
        String(err && err.message ? err.message : err)
      );
    }
  }

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!activeSpreadsheet) {
    throw new Error('No active spreadsheet found. For standalone Apps Script, set Script Property SPREADSHEET_ID.');
  }

  return activeSpreadsheet;
}

function extractSpreadsheetId_(value) {
  const text = String(value || '').trim();
  const match = text.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) return match[1];
  return text;
}

function testSpreadsheetAccess() {
  const ss = getSpreadsheet_();
  const result = {
    ok: true,
    spreadsheetName: ss.getName(),
    spreadsheetId: ss.getId(),
    spreadsheetUrl: ss.getUrl()
  };
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}

function testHealth() {
  const hasSpreadsheetId = Boolean(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'));
  const hasAdminToken = Boolean(PropertiesService.getScriptProperties().getProperty('ADMIN_TOKEN'));
  return { ok: true, hasSpreadsheetId: hasSpreadsheetId, hasAdminToken: hasAdminToken };
}

function testSaveSampleAttendance() {
  const result = saveAttendance_(buildSamplePayload_('TEST001', new Date().getFullYear(), new Date().getMonth() + 1));
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}

function debugWrite_(message) {
  ensureSheets_();
  const ss = getSpreadsheet_();
  const logsSheet = ss.getSheetByName(SHEET_NAMES.auditLogs);
  const now = new Date().toISOString();
  logsSheet.appendRow([now, 'debugWrite', '', '', '', String(message || 'debug')]);
  return {
    ok: true,
    message: 'Debug row written to AuditLogs',
    spreadsheetName: ss.getName(),
    spreadsheetId: ss.getId(),
    timestamp: now
  };
}


function getUploadCache_() {
  return CacheService.getScriptCache();
}

function getUploadCacheKey_(uploadId, suffix) {
  return 'viora_attendance_upload_' + String(uploadId || '') + '_' + String(suffix || '');
}

function validateUploadId_(uploadId) {
  const text = String(uploadId || '').trim();
  if (!text) throw new Error('uploadId is required');
  if (!/^[a-zA-Z0-9_-]+$/.test(text)) throw new Error('Invalid uploadId');
  return text;
}

function startSaveUpload_(uploadId, total) {
  const id = validateUploadId_(uploadId);
  const chunkTotal = Number(total || 0);
  if (!chunkTotal || chunkTotal < 1 || chunkTotal > 200) {
    throw new Error('Invalid upload chunk total: ' + total);
  }

  getUploadCache_().put(
    getUploadCacheKey_(id, 'meta'),
    JSON.stringify({ createdAt: new Date().toISOString(), total: chunkTotal }),
    600
  );

  return {
    ok: true,
    message: 'Upload started',
    uploadId: id,
    total: chunkTotal
  };
}

function saveUploadChunk_(uploadId, index, total, chunk) {
  const id = validateUploadId_(uploadId);
  const chunkIndex = Number(index);
  const chunkTotal = Number(total || 0);

  if (chunkIndex < 0 || chunkIndex >= chunkTotal) {
    throw new Error('Invalid upload chunk index: ' + index);
  }

  if (!chunkTotal || chunkTotal < 1 || chunkTotal > 200) {
    throw new Error('Invalid upload chunk total: ' + total);
  }

  getUploadCache_().put(getUploadCacheKey_(id, 'chunk_' + chunkIndex), String(chunk || ''), 600);

  return {
    ok: true,
    message: 'Upload chunk received',
    uploadId: id,
    index: chunkIndex,
    total: chunkTotal
  };
}

function commitSaveUpload_(uploadId, total) {
  const id = validateUploadId_(uploadId);
  const chunkTotal = Number(total || 0);

  if (!chunkTotal || chunkTotal < 1 || chunkTotal > 200) {
    throw new Error('Invalid upload chunk total: ' + total);
  }

  const cache = getUploadCache_();
  const keys = [];
  for (let index = 0; index < chunkTotal; index += 1) {
    keys.push(getUploadCacheKey_(id, 'chunk_' + index));
  }

  const values = cache.getAll(keys);
  const missing = [];
  const parts = [];

  keys.forEach(function (key, index) {
    if (typeof values[key] === 'undefined') {
      missing.push(index);
    } else {
      parts.push(values[key]);
    }
  });

  if (missing.length) {
    throw new Error('Missing upload chunks: ' + missing.join(', '));
  }

  const payloadText = parts.join('');
  const payload = JSON.parse(payloadText);

  ensureSheets_();
  const result = saveAttendance_(payload);
  result.uploadId = id;
  result.totalChunks = chunkTotal;
  return result;
}

function ensureSheets_() {
  const ss = getSpreadsheet_();
  Object.keys(SHEET_NAMES).forEach(function (key) {
    const name = SHEET_NAMES[key];
    let sheet = ss.getSheetByName(name);
    if (!sheet) sheet = ss.insertSheet(name);
    const headers = HEADERS[key];
    if (headers && sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#CBF7F6');
      sheet.setFrozenRows(1);
    }
    applySheetFormats_(key, sheet);
  });
}

function applySheetFormats_(key, sheet) {
  if (key === 'attendance') {
    ['G:G', 'K:K', 'L:L', 'M:M', 'N:N', 'U:U'].forEach(function (range) {
      sheet.getRange(range).setNumberFormat('@');
    });
  }

  if (key === 'settings') {
    ['E:E', 'F:F', 'G:G', 'H:H', 'I:I', 'J:J', 'K:K', 'L:L', 'P:P'].forEach(function (range) {
      sheet.getRange(range).setNumberFormat('@');
    });
  }
}

function getSpreadsheetTimeZone_() {
  try {
    return getSpreadsheet_().getSpreadsheetTimeZone() || Session.getScriptTimeZone() || 'Etc/UTC';
  } catch (err) {
    return Session.getScriptTimeZone() || 'Etc/UTC';
  }
}

function isDateValue_(value) {
  return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime());
}

function pad2_(value) {
  return String(value).padStart(2, '0');
}

function timeCellToText_(value, fallback) {
  if (value === null || typeof value === 'undefined' || value === '') return fallback || '';

  if (isDateValue_(value)) {
    return Utilities.formatDate(value, getSpreadsheetTimeZone_(), 'HH:mm');
  }

  if (typeof value === 'number' && isFinite(value) && value >= 0 && value < 1) {
    const totalMinutes = Math.round(value * 24 * 60);
    return pad2_(Math.floor(totalMinutes / 60) % 24) + ':' + pad2_(totalMinutes % 60);
  }

  const text = String(value).trim();
  const direct = text.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (direct) return pad2_(Number(direct[1])) + ':' + direct[2];

  const embedded = text.match(/(?:^|\s|T)(\d{1,2}):(\d{2})(?::\d{2})?/);
  if (embedded) return pad2_(Number(embedded[1])) + ':' + embedded[2];

  return fallback || text;
}

function dateCellToText_(value, fallback) {
  if (value === null || typeof value === 'undefined' || value === '') return fallback || '';

  if (isDateValue_(value)) {
    return Utilities.formatDate(value, getSpreadsheetTimeZone_(), 'yyyy-MM-dd');
  }

  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;

  return fallback || text;
}

function saveAttendance_(payload) {
  if (!payload || !payload.employee || !payload.rows) {
    throw new Error('Invalid payload');
  }

  const ss = getSpreadsheet_();
  const attendanceSheet = ss.getSheetByName(SHEET_NAMES.attendance);
  const employeesSheet = ss.getSheetByName(SHEET_NAMES.employees);
  const settingsSheet = ss.getSheetByName(SHEET_NAMES.settings);
  const logsSheet = ss.getSheetByName(SHEET_NAMES.auditLogs);
  const now = new Date().toISOString();
  const employee = payload.employee;
  const year = Number(payload.year);
  const month = Number(payload.month);

  if (!employee.employeeNo) {
    throw new Error('employee.employeeNo is required');
  }

  upsertRowsByKey_(employeesSheet, 1, [[
    employee.employeeNo,
    employee.name,
    employee.department,
    now
  ]]);

  const settings = payload.settings || {};
  const settingKey = [employee.employeeNo, year, String(month).padStart(2, '0')].join('|');
  upsertRowsByKey_(settingsSheet, 1, [[
    settingKey,
    employee.employeeNo,
    year,
    month,
    settings.basicStart || '',
    settings.basicEnd || '',
    settings.earlyStart || '',
    settings.earlyEnd || '',
    settings.overtimeStart || '',
    settings.overtimeEnd || '',
    settings.nightStart || '',
    settings.nightEnd || '',
    Number(settings.breakMinutes || 0),
    Number(settings.startRoundMinutes || 0),
    Number(settings.endRoundMinutes || 0),
    now
  ]]);

  const rows = payload.rows.map(function (row) {
    const recordKey = [employee.employeeNo, row.date].join('|');
    return [
      recordKey,
      employee.employeeNo,
      employee.name,
      employee.department,
      year,
      month,
      row.date,
      row.day,
      row.weekday,
      row.attendanceType,
      row.timecardIn,
      row.timecardOut,
      row.workStart,
      row.workEnd,
      Number(settings.breakMinutes || 0),
      Number(row.basicMinutes || 0),
      Number(row.overtimeMinutes || 0),
      Number(row.nightMinutes || 0),
      Number(row.totalMinutes || 0),
      row.note || '',
      now
    ];
  });

  upsertRowsByKey_(attendanceSheet, 1, rows);

  logsSheet.appendRow([
    now,
    'saveAttendance',
    employee.employeeNo,
    year,
    month,
    'Saved ' + rows.length + ' attendance rows'
  ]);

  return { ok: true, message: 'Attendance saved', rows: rows.length, updatedAt: now };
}

function getAttendance_(employeeNo, year, month) {
  const ss = getSpreadsheet_();
  const attendanceSheet = ss.getSheetByName(SHEET_NAMES.attendance);
  const settingsSheet = ss.getSheetByName(SHEET_NAMES.settings);
  const allAttendance = readObjects_(attendanceSheet);
  const rows = allAttendance.filter(function (row) {
    return String(row.employeeNo) === String(employeeNo) && Number(row.year) === Number(year) && Number(row.month) === Number(month);
  });

  if (!rows.length) {
    return { ok: true, payload: null, message: 'No attendance data found' };
  }

  const settingsKey = [employeeNo, year, String(month).padStart(2, '0')].join('|');
  const settingsRows = readObjects_(settingsSheet);
  const savedSettings = settingsRows.find(function (row) {
    return String(row.settingKey) === settingsKey;
  }) || {};

  const first = rows[0];
  const payload = {
    employee: {
      employeeNo: String(first.employeeNo || ''),
      name: String(first.employeeName || ''),
      department: String(first.department || '')
    },
    year: Number(year),
    month: Number(month),
    settings: {
      basicStart: timeCellToText_(savedSettings.basicStart, '09:00'),
      basicEnd: timeCellToText_(savedSettings.basicEnd, '18:00'),
      earlyStart: timeCellToText_(savedSettings.earlyStart, '05:00'),
      earlyEnd: timeCellToText_(savedSettings.earlyEnd, '10:00'),
      overtimeStart: timeCellToText_(savedSettings.overtimeStart, '19:00'),
      overtimeEnd: timeCellToText_(savedSettings.overtimeEnd, '22:00'),
      nightStart: timeCellToText_(savedSettings.nightStart, '22:00'),
      nightEnd: timeCellToText_(savedSettings.nightEnd, '05:00'),
      breakMinutes: Number(savedSettings.breakMinutes || 60),
      startRoundMinutes: Number(savedSettings.startRoundMinutes || 30),
      endRoundMinutes: Number(savedSettings.endRoundMinutes || 10)
    },
    rows: rows
      .sort(function (a, b) { return Number(a.day) - Number(b.day); })
      .map(function (row) {
        return {
          id: dateCellToText_(row.date, ''),
          date: dateCellToText_(row.date, ''),
          day: Number(row.day),
          weekday: String(row.weekday || ''),
          attendanceType: String(row.attendanceType || ''),
          timecardIn: timeCellToText_(row.timecardIn, ''),
          timecardOut: timeCellToText_(row.timecardOut, ''),
          workStart: timeCellToText_(row.workStart, ''),
          workEnd: timeCellToText_(row.workEnd, ''),
          basicMinutes: Number(row.basicMinutes || 0),
          overtimeMinutes: Number(row.overtimeMinutes || 0),
          nightMinutes: Number(row.nightMinutes || 0),
          totalMinutes: Number(row.totalMinutes || 0),
          note: String(row.note || '')
        };
      }),
    summary: {},
    updatedAt: String(first.updatedAt || '')
  };

  return { ok: true, payload: payload };
}

function getEmployees_() {
  const ss = getSpreadsheet_();
  const employeesSheet = ss.getSheetByName(SHEET_NAMES.employees);
  return { ok: true, employees: readObjects_(employeesSheet) };
}

function upsertRowsByKey_(sheet, keyColumn, rows) {
  if (!rows.length) return;
  const lastRow = sheet.getLastRow();
  const lastColumn = Math.max(sheet.getLastColumn(), rows[0].length);
  const existingKeys = {};

  if (lastRow >= 2) {
    const keys = sheet.getRange(2, keyColumn, lastRow - 1, 1).getValues();
    keys.forEach(function (row, index) {
      existingKeys[String(row[0])] = index + 2;
    });
  }

  rows.forEach(function (row) {
    const key = String(row[keyColumn - 1]);
    const targetRow = existingKeys[key];
    if (targetRow) {
      sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }
  });

  sheet.autoResizeColumns(1, lastColumn);
}

function readObjects_(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  const headers = values[0].map(function (item) { return String(item); });
  return values.slice(1).map(function (row) {
    const object = {};
    headers.forEach(function (header, index) {
      object[header] = row[index];
    });
    return object;
  });
}

function setupVioraAttendanceSheets() {
  ensureSheets_();
  const ss = getSpreadsheet_();
  const result = {
    ok: true,
    message: 'VIORA attendance sheets are ready',
    spreadsheetName: ss.getName(),
    spreadsheetId: ss.getId(),
    spreadsheetUrl: ss.getUrl()
  };
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}

function buildSamplePayload_(employeeNo, year, month) {
  const ym = String(year) + '-' + String(month).padStart(2, '0');
  return {
    employee: {
      employeeNo: employeeNo,
      name: 'Test Employee',
      department: 'Development'
    },
    year: year,
    month: month,
    settings: {
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
    },
    rows: [
      {
        id: ym + '-01',
        date: ym + '-01',
        day: 1,
        weekday: 'Mon',
        attendanceType: 'work',
        timecardIn: '09:00',
        timecardOut: '18:00',
        workStart: '09:00',
        workEnd: '18:00',
        basicMinutes: 480,
        overtimeMinutes: 0,
        nightMinutes: 0,
        totalMinutes: 480,
        note: 'Sample row from Apps Script'
      }
    ],
    summary: {},
    updatedAt: new Date().toISOString()
  };
}
