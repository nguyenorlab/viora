export type AttendanceType =
  | ''
  | 'work'
  | 'absence'
  | 'paidLeave'
  | 'compensatoryLeave'
  | 'holidayWork'
  | 'publicHoliday';

export type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export type EmployeeStatus = 'active' | 'inactive';

export type EmployeeProfile = {
  employeeNo: string;
  department: string;
  name: string;
  joinDate?: string;
  email?: string;
  status?: EmployeeStatus;
};

export type UserRole = 'superAdmin' | 'admin' | 'viewer';
export type AccountStatus = 'active' | 'inactive';

export type AuthUser = {
  username: string;
  displayName: string;
  role: UserRole;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
  expiresAt?: string;
};

export type UserAccount = {
  username: string;
  displayName: string;
  role: UserRole;
  status: AccountStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type UserAccountInput = UserAccount & {
  password?: string;
};

export type AttendanceSettings = {
  basicStart: string;
  basicEnd: string;
  earlyStart: string;
  earlyEnd: string;
  overtimeStart: string;
  overtimeEnd: string;
  nightStart: string;
  nightEnd: string;
  breakMinutes: number;
  startRoundMinutes: number;
  endRoundMinutes: number;
};

export type AttendanceEntry = {
  id: string;
  date: string;
  day: number;
  weekday: string;
  attendanceType: AttendanceType;
  timecardIn: string;
  timecardOut: string;
  workStart: string;
  workEnd: string;
  basicMinutes: number;
  overtimeMinutes: number;
  nightMinutes: number;
  totalMinutes: number;
  note: string;
};

export type AttendanceSummary = {
  workDays: number;
  absenceDays: number;
  paidLeaveDays: number;
  compensatoryLeaveDays: number;
  holidayWorkDays: number;
  publicHolidayDays: number;
  totalMinutes: number;
  basicMinutes: number;
  overtimeMinutes: number;
  nightMinutes: number;
};

export type AttendancePayload = {
  employee: EmployeeProfile;
  year: number;
  month: number;
  settings: AttendanceSettings;
  rows: AttendanceEntry[];
  summary: AttendanceSummary;
  updatedAt: string;
};

export type LeaveGrant = {
  grantDate: string;
  grantedDays: number;
  usedDays: number;
  remainingDays: number;
  expiresAt: string;
  isExpired: boolean;
  status?: 'active' | 'expired' | 'used' | string;
};

export type LeaveSummary = {
  employeeNo: string;
  asOfDate: string;
  joinDate: string;
  remainingDays: number;
  usedDays: number;
  expiringDays: number;
  expiringDate: string;
  calculatedAt?: string;
  grants: LeaveGrant[];
};

export type ApiResult = {
  ok: boolean;
  message: string;
  mode?: 'google-sheet' | 'local' | 'api';
};
