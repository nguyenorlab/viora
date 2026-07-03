import type { AttendancePayload } from './types';

function storageKey(employeeNo: string, year: number, month: number) {
  return `viora-attendance:${employeeNo || 'unknown'}:${year}-${String(month).padStart(2, '0')}`;
}

export function saveAttendanceDraft(payload: AttendancePayload) {
  localStorage.setItem(storageKey(payload.employee.employeeNo, payload.year, payload.month), JSON.stringify(payload));
}

export function loadAttendanceDraft(employeeNo: string, year: number, month: number) {
  const raw = localStorage.getItem(storageKey(employeeNo, year, month));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AttendancePayload;
  } catch {
    return null;
  }
}

export function removeAttendanceDraft(employeeNo: string, year: number, month: number) {
  localStorage.removeItem(storageKey(employeeNo, year, month));
}
