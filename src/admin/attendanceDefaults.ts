import type { AttendanceSettings, AttendanceType, EmployeeProfile } from './types';
import type { Language } from '../data/i18n';

export const defaultEmployee: EmployeeProfile = {
  employeeNo: '',
  department: '',
  name: '',
  joinDate: '',
  email: '',
  status: 'active'
};

export const defaultSettings: AttendanceSettings = {
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

export const attendanceTypes: {
  value: AttendanceType;
  jp: string;
  vi: string;
  en: string;
}[] = [
  { value: '', jp: '', vi: '-', en: '-' },
  { value: 'work', jp: '出勤', vi: 'Đi làm', en: 'Work' },
  { value: 'absence', jp: '欠勤', vi: 'Vắng mặt', en: 'Absence' },
  { value: 'paidLeave', jp: '有給休暇', vi: 'Nghỉ phép', en: 'Paid leave' },
  { value: 'compensatoryLeave', jp: '代休', vi: 'Nghỉ bù', en: 'Comp. leave' },
  { value: 'holidayWork', jp: '休日出勤', vi: 'Làm ngày nghỉ', en: 'Holiday work' },
  { value: 'publicHoliday', jp: '祝日', vi: 'Ngày lễ', en: 'Public holiday' }
];

export function getAttendanceTypeLabel(type: AttendanceType, language: Language) {
  const item = attendanceTypes.find((option) => option.value === type);
  if (!item) return '';
  if (language === 'en') return item.en;
  if (language === 'jp') return item.jp || item.en;
  return item.jp ? `${item.jp} / ${item.vi}` : item.vi;
}
