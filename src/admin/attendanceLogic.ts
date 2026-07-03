import { defaultSettings } from './attendanceDefaults';
import type { AttendanceEntry, AttendanceSettings, AttendanceSummary, AttendanceType } from './types';

const WEEKDAYS = {
  vi: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  jp: ['日', '月', '火', '水', '木', '金', '土']
};

type WeekdayLanguage = keyof typeof WEEKDAYS;

export function pad(value: number) {
  return String(value).padStart(2, '0');
}

export function dateToIso(year: number, month: number, day: number) {
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function toMinutes(time: string) {
  if (!time || !/^\d{2}:\d{2}$/.test(time)) return null;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function fromMinutes(total: number) {
  const normalized = ((Math.round(total) % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${pad(hours)}:${pad(minutes)}`;
}

export function formatDuration(minutes: number) {
  const safe = Math.max(0, Math.round(minutes));
  const hours = Math.floor(safe / 60);
  const rest = safe % 60;
  return `${hours}:${pad(rest)}`;
}

function roundUp(value: number, unit: number) {
  if (!unit) return value;
  return Math.ceil(value / unit) * unit;
}

function roundDown(value: number, unit: number) {
  if (!unit) return value;
  return Math.floor(value / unit) * unit;
}

function scheduledBasicMinutes(settings: AttendanceSettings) {
  const start = toMinutes(settings.basicStart) ?? toMinutes(defaultSettings.basicStart)!;
  const end = toMinutes(settings.basicEnd) ?? toMinutes(defaultSettings.basicEnd)!;
  return Math.max(0, end - start - settings.breakMinutes);
}

function overlap(start: number, end: number, rangeStart: number, rangeEnd: number) {
  const from = Math.max(start, rangeStart);
  const to = Math.min(end, rangeEnd);
  return Math.max(0, to - from);
}

function calculateNightMinutes(start: number, end: number, settings: AttendanceSettings) {
  const nightStart = toMinutes(settings.nightStart) ?? 22 * 60;
  const nightEnd = toMinutes(settings.nightEnd) ?? 5 * 60;
  let total = 0;
  let cursorStart = start;
  let cursorEnd = end;

  if (cursorEnd <= cursorStart) cursorEnd += 1440;

  for (let dayOffset = 0; dayOffset <= Math.ceil(cursorEnd / 1440); dayOffset += 1) {
    const base = dayOffset * 1440;
    if (nightStart > nightEnd) {
      total += overlap(cursorStart, cursorEnd, base + nightStart, base + 1440);
      total += overlap(cursorStart, cursorEnd, base, base + nightEnd);
    } else {
      total += overlap(cursorStart, cursorEnd, base + nightStart, base + nightEnd);
    }
  }

  return total;
}

export function isWeekend(date: string) {
  const d = new Date(`${date}T00:00:00`);
  return d.getDay() === 0 || d.getDay() === 6;
}

export function getWeekendType(date: string) {
  const d = new Date(`${date}T00:00:00`);
  if (d.getDay() === 0) return 'sun';
  if (d.getDay() === 6) return 'sat';
  return 'weekday';
}

export function isTimeEditableAttendanceType(type: AttendanceType) {
  return type === 'work' || type === 'holidayWork';
}

export function buildMonthRows(year: number, month: number, language: WeekdayLanguage = 'jp'): AttendanceEntry[] {
  const totalDays = new Date(year, month, 0).getDate();

  return Array.from({ length: totalDays }, (_, index) => {
    const day = index + 1;
    const date = dateToIso(year, month, day);
    const jsDate = new Date(year, month - 1, day);
    const weekend = jsDate.getDay() === 0 || jsDate.getDay() === 6;
    const attendanceType: AttendanceType = weekend ? '' : 'work';
    const base: AttendanceEntry = {
      id: date,
      date,
      day,
      weekday: WEEKDAYS[language][jsDate.getDay()],
      attendanceType,
      timecardIn: weekend ? '' : '09:00',
      timecardOut: weekend ? '' : '18:00',
      workStart: '',
      workEnd: '',
      basicMinutes: 0,
      overtimeMinutes: 0,
      nightMinutes: 0,
      totalMinutes: 0,
      note: ''
    };
    return calculateEntry(base, defaultSettings);
  });
}

export function normalizeWeekdays(rows: AttendanceEntry[], language: WeekdayLanguage) {
  return rows.map((row) => {
    const d = new Date(`${row.date}T00:00:00`);
    return { ...row, weekday: WEEKDAYS[language][d.getDay()] };
  });
}

export function calculateEntry(entry: AttendanceEntry, settings: AttendanceSettings): AttendanceEntry {
  const paidBasic = scheduledBasicMinutes(settings);

  if (entry.attendanceType === 'paidLeave') {
    return {
      ...entry,
      timecardIn: '',
      timecardOut: '',
      workStart: '',
      workEnd: '',
      basicMinutes: paidBasic,
      overtimeMinutes: 0,
      nightMinutes: 0,
      totalMinutes: paidBasic
    };
  }

  if (!isTimeEditableAttendanceType(entry.attendanceType)) {
    return {
      ...entry,
      timecardIn: '',
      timecardOut: '',
      workStart: '',
      workEnd: '',
      basicMinutes: 0,
      overtimeMinutes: 0,
      nightMinutes: 0,
      totalMinutes: 0
    };
  }

  const startRaw = toMinutes(entry.timecardIn);
  const endRaw = toMinutes(entry.timecardOut);

  if (startRaw === null || endRaw === null) {
    return {
      ...entry,
      workStart: '',
      workEnd: '',
      basicMinutes: 0,
      overtimeMinutes: 0,
      nightMinutes: 0,
      totalMinutes: 0
    };
  }

  let start = roundUp(startRaw, settings.startRoundMinutes);
  let end = roundDown(endRaw, settings.endRoundMinutes);
  if (end <= start) end += 1440;

  const spanMinutes = Math.max(0, end - start);
  const totalMinutes = Math.max(0, spanMinutes - settings.breakMinutes);
  const nightMinutes = calculateNightMinutes(start, end, settings);

  if (entry.attendanceType === 'holidayWork') {
    return {
      ...entry,
      workStart: fromMinutes(start),
      workEnd: fromMinutes(end),
      basicMinutes: 0,
      overtimeMinutes: totalMinutes,
      nightMinutes,
      totalMinutes
    };
  }

  const basicMinutes = Math.min(totalMinutes, paidBasic);
  const overtimeMinutes = Math.max(0, totalMinutes - basicMinutes);

  return {
    ...entry,
    workStart: fromMinutes(start),
    workEnd: fromMinutes(end),
    basicMinutes,
    overtimeMinutes,
    nightMinutes,
    totalMinutes
  };
}

export function calculateRows(rows: AttendanceEntry[], settings: AttendanceSettings) {
  return rows.map((row) => calculateEntry(row, settings));
}

export function calculateSummary(rows: AttendanceEntry[]): AttendanceSummary {
  return rows.reduce<AttendanceSummary>(
    (summary, row) => {
      if (row.attendanceType === 'work') summary.workDays += 1;
      if (row.attendanceType === 'absence') summary.absenceDays += 1;
      if (row.attendanceType === 'paidLeave') summary.paidLeaveDays += 1;
      if (row.attendanceType === 'compensatoryLeave') summary.compensatoryLeaveDays += 1;
      if (row.attendanceType === 'holidayWork') summary.holidayWorkDays += 1;
      if (row.attendanceType === 'publicHoliday') summary.publicHolidayDays += 1;
      summary.totalMinutes += row.totalMinutes;
      summary.basicMinutes += row.basicMinutes;
      summary.overtimeMinutes += row.overtimeMinutes;
      summary.nightMinutes += row.nightMinutes;
      return summary;
    },
    {
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
    }
  );
}
