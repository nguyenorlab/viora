import { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { languages, type Language } from '../data/i18n';
import { Container } from '../components/Layout';
import type { ThemeMode } from '../styles/theme';
import { attendanceTypes, defaultEmployee, defaultSettings, getAttendanceTypeLabel } from './attendanceDefaults';
import {
  buildMonthRows,
  calculateEntry,
  calculateRows,
  calculateSummary,
  formatDuration,
  getWeekendType,
  isTimeEditableAttendanceType,
  normalizeWeekdays
} from './attendanceLogic';
import { getAdminText } from './adminI18n';
import {
  clearSession,
  deleteEmployee,
  deleteUser,
  getEmployeeFromSheet,
  getStoredSession,
  isGoogleSheetConfigured,
  listEmployees,
  listUsers,
  loadAttendanceFromSheet,
  loginAdmin,
  saveAttendanceToSheet,
  saveEmployee,
  saveUser,
  testGoogleSheetConnection
} from './googleSheetClient';
import { downloadAttendanceXlsx } from './xlsxExporter';
import { loadAttendanceDraft, saveAttendanceDraft } from './localStorageStore';
import type {
  AttendanceEntry,
  AttendancePayload,
  AttendanceSettings,
  AuthSession,
  EmployeeProfile,
  LeaveSummary,
  SaveState,
  UserAccount,
  UserAccountInput,
  UserRole
} from './types';

type AdminAttendancePageProps = {
  mode: ThemeMode;
  language: Language;
  onModeChange: (mode: ThemeMode) => void;
  onLanguageChange: (language: Language) => void;
};

const appear = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const AdminShell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const AdminTopbar = styled.header`
  position: sticky;
  top: 0;
  z-index: 30;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => (theme.mode === 'light' ? 'rgba(246, 248, 252, 0.86)' : 'rgba(11, 16, 32, 0.86)')};
  backdrop-filter: blur(18px);
`;

const AdminTopbarInner = styled(Container)`
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  @media (max-width: 860px) {
    width: min(100% - 24px, ${({ theme }) => theme.layout.maxWidth});
    min-height: auto;
    padding: 12px 0;
    align-items: stretch;
    flex-direction: column;
  }

  @media (max-width: 520px) {
    width: min(100% - 18px, ${({ theme }) => theme.layout.maxWidth});
    gap: 12px;
  }
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 900;
  letter-spacing: -0.04em;
  font-size: 22px;
  min-width: 0;

  @media (max-width: 520px) {
    font-size: 19px;
  }
`;


const MarkWrap = styled.div`
  display: flex;
  justify-content: center;
`;


const Mark = styled.span`
  width: 38px;
  height: 38px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  box-shadow: 0 12px 34px ${({ theme }) => theme.colors.primarySoft};

  &::before {
    content: 'V';
    font-weight: 900;
  }

  @media (max-width: 520px) {
    width: 34px;
    height: 34px;
    border-radius: 12px;
  }
`;

const LoginHeader = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  font-size: 34px;
  letter-spacing: -0.06em;
  font-weight: 800;
`;


const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
  min-width: 0;
  max-width: 100%;

  > * {
    min-width: 0;
  }

  @media (max-width: 860px) {
    width: 100%;
    justify-content: flex-start;
  }

  @media (max-width: 620px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;

    > * {
      width: 100%;
      justify-content: center;
    }

    > *:first-child {
      grid-column: 1 / -1;
    }
  }
`;

const ToggleGroup = styled.div`
  display: flex;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  min-width: 0;

  @media (max-width: 620px) {
    > button {
      flex: 1;
    }
  }
`;

const ToggleButton = styled.button<{ $active?: boolean }>`
  border: 0;
  min-width: 38px;
  height: 32px;
  padding: 0 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.muted)};
  font-weight: 900;
  font-size: 12px;
  transition: transform ${({ theme }) => theme.motion.fast}, background ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-1px);
    color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.text)};
  }

  @media (max-width: 560px) {
    min-width: 34px;
    padding: 0 8px;
  }
`;

const LinkButton = styled.a`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 800;
  font-size: 13px;
  box-shadow: ${({ theme }) => theme.colors.shadow};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primarySoft};
  }
`;

const TopbarButton = styled.button`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 900;
  font-size: 13px;
  box-shadow: ${({ theme }) => theme.colors.shadow};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primarySoft};
  }
`;

const UserBadge = styled.div`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 13px;
  font-weight: 900;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  span {
    min-width: 0;
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 800;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const HeroArea = styled.section`
  padding: 54px 0 28px;
`;

const AdminTitleGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 28px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

const TitleBlock = styled.div`
  animation: ${appear} 420ms ease both;

  p {
    max-width: 760px;
    margin: 18px 0 0;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 17px;
  }
`;

const Kicker = styled.div`
  width: fit-content;
  margin-bottom: 14px;
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 900;
  font-size: 13px;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: clamp(38px, 6vw, 66px);
  line-height: 1;
  letter-spacing: -0.06em;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const StatusCard = styled.div`
  position: relative;
  padding: 26px;
  border-radius: 28px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
  animation: ${float} 7s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    right: -70px;
    bottom: -70px;
    width: 170px;
    height: 170px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.primarySoft};
  }

  strong, span, small {
    position: relative;
    z-index: 1;
  }

  strong {
    display: block;
    font-size: 18px;
  }

  span {
    display: block;
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.muted};
  }

  small {
    display: inline-flex;
    margin-top: 16px;
    padding: 7px 10px;
    border-radius: ${({ theme }) => theme.radius.full};
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 900;
  }
`;

const MainArea = styled(Container)`
  padding: 18px 0 80px;
  display: grid;
  gap: 22px;
  min-width: 0;

  @media (max-width: 640px) {
    padding-bottom: 56px;
  }
`;

const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  min-width: 0;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  min-width: 0;
  max-width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 28px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  animation: ${appear} 420ms ease both;

  @media (max-width: 640px) {
    border-radius: 22px;
    padding: 18px;
  }
`;

const PanelTitle = styled.h2`
  margin: 0 0 18px;
  font-size: 22px;
  letter-spacing: -0.04em;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 7px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  font-weight: 800;
`;

const Input = styled.input`
  width: 100%;
  min-height: 42px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 12px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primarySoft};
  }
`;

const SelectInput = styled.select`
  width: 100%;
  min-height: 42px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 12px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primarySoft};
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryItem = styled.div`
  padding: 16px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceLight};
  transition: transform ${({ theme }) => theme.motion.fast}, background ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-4px);
    background: ${({ theme }) => theme.colors.primarySoft};
  }

  span {
    display: block;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  strong {
    display: block;
    margin-top: 5px;
    font-size: 24px;
    letter-spacing: -0.04em;
  }
`;

const ActionBar = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 16px;

  @media (max-width: 760px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const ActionButton = styled.button<{ $primary?: boolean; $danger?: boolean }>`
  min-height: 44px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme, $primary, $danger }) => ($danger ? '#DC2626' : $primary ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $primary, $danger }) => ($danger ? '#DC2626' : $primary ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, $primary, $danger }) => ($primary || $danger ? theme.colors.white : theme.colors.text)};
  padding: 0 18px;
  font-weight: 900;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  transition: transform ${({ theme }) => theme.motion.fast}, background ${({ theme }) => theme.motion.fast};

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    background: ${({ theme, $primary, $danger }) => ($danger ? '#B91C1C' : $primary ? theme.colors.primary : theme.colors.primarySoft)};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  @media (max-width: 760px) {
    width: 100%;
  }
`;

const LoadingContent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 999px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  display: inline-block;
  animation: ${spin} 700ms linear infinite;
`;

const Message = styled.div<{ $state: SaveState }>`
  min-height: 46px;
  display: flex;
  align-items: center;
  margin-top: 12px;
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $state }) => ($state === 'error' ? 'rgba(239, 68, 68, 0.10)' : theme.colors.surfaceLight)};
  color: ${({ theme, $state }) => ($state === 'error' ? '#DC2626' : theme.colors.muted)};
  font-weight: 800;
`;



const Toast = styled.div<{ $state: SaveState }>`
  position: fixed;
  left: 24px;
  bottom: 24px;
  z-index: 80;
  width: min(460px, calc(100vw - 48px));
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid ${({ $state }) => ($state === 'error' ? 'rgba(220, 38, 38, 0.32)' : 'rgba(22, 163, 74, 0.32)')};
  background: ${({ theme, $state }) => (
    $state === 'error'
      ? (theme.mode === 'light' ? '#FEF2F2' : '#2A1111')
      : (theme.mode === 'light' ? '#ECFDF3' : '#0F2618')
  )};
  color: ${({ $state }) => ($state === 'error' ? '#DC2626' : '#15803D')};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  font-weight: 900;

  @media (max-width: 520px) {
    left: 12px;
    bottom: 12px;
    width: calc(100vw - 24px);
    padding: 12px 14px;
  }
`;

const ToastClose = styled.button`
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.08);
  color: inherit;
  font-weight: 900;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 70;
  display: grid;
  place-items: center;
  background: ${({ theme }) => (theme.mode === 'light' ? 'rgba(246, 248, 252, 0.72)' : 'rgba(11, 16, 32, 0.72)')};
  backdrop-filter: blur(6px);
`;

const LoadingCard = styled.div`
  width: min(420px, calc(100vw - 40px));
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 28px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  padding: 26px;
  text-align: center;

  ${Spinner} {
    width: 36px;
    height: 36px;
    border-width: 4px;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 auto 16px;
  }

  strong {
    display: block;
    font-size: 18px;
    letter-spacing: -0.03em;
  }

  span {
    display: block;
    margin-top: 6px;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 13px;
    font-weight: 800;
  }
`;

const TablePanel = styled(Panel)`
  padding: 0;
  overflow: hidden;
`;

const TableHeader = styled.div`
  padding: 22px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;

  h2 {
    margin: 0;
    font-size: 22px;
    letter-spacing: -0.04em;
  }
`;

const TableScroll = styled.div`
  max-width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

const Table = styled.table`
  width: 100%;
  min-width: 1120px;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 13px;

  @media (max-width: 640px) {
    min-width: 980px;
    font-size: 12px;
  }
`;

const CompactTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 780px;
  font-size: 13px;

  th, td {
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: 10px;
    text-align: left;
  }

  th {
    background: ${({ theme }) => theme.colors.primarySoft};
    font-weight: 900;
  }

  tr:hover td {
    background: ${({ theme }) => theme.colors.surfaceLight};
  }

  @media (max-width: 640px) {
    min-width: 640px;
    font-size: 12px;

    th, td {
      padding: 8px;
    }
  }
`;

const Th = styled.th<{ $total?: boolean }>`
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $total }) => ($total ? '#FEF9A7' : theme.mode === 'light' ? '#CBF7F6' : '#183A4A')};
  color: ${({ theme }) => theme.colors.text};
  padding: 9px 8px;
  text-align: center;
  font-weight: 900;
  white-space: nowrap;
`;

const BodyRow = styled.tr<{ $disabled?: boolean }>`
  transition: background ${({ theme }) => theme.motion.fast};

  ${({ $disabled }) =>
    $disabled
      ? `
    select, input {
      color: inherit;
    }
  `
      : ''}
`;

const Td = styled.td<{ $total?: boolean; $weekend?: 'sat' | 'sun' | 'weekday'; $disabled?: boolean }>`
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $total, $disabled }) => {
    if ($disabled) return theme.mode === 'light' ? '#EFEFEF' : '#253044';
    if ($total) return '#FEF9A7';
    return theme.colors.surface;
  }};
  color: ${({ theme, $disabled }) => ($disabled ? theme.colors.muted : theme.colors.text)};
  padding: 6px;
  text-align: center;
  white-space: nowrap;

  &:first-child {
    background: ${({ $weekend, $disabled, theme }) => {
    if ($disabled) return theme.mode === 'light' ? '#D9D9D9' : '#303A4D';
    if ($weekend === 'sat') return '#2D36FF';
    if ($weekend === 'sun') return '#FF1111';
    return theme.mode === 'light' ? '#FEF9A7' : '#33362A';
  }};
    color: ${({ $weekend, $disabled, theme }) => ($weekend === 'sat' || $weekend === 'sun' ? '#FFFFFF' : $disabled ? theme.colors.muted : theme.colors.text)};
    font-weight: 900;
  }
`;

const TableInput = styled.input`
  width: 100%;
  min-width: 82px;
  height: 32px;
  border: 1px solid transparent;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  border-radius: 10px;
  outline: none;

  &:focus {
    background: ${({ theme }) => theme.colors.surfaceLight};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 1;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const Select = styled.select`
  width: 100%;
  min-width: 150px;
  height: 32px;
  border: 1px solid transparent;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  outline: none;

  &:focus {
    background: ${({ theme }) => theme.colors.surfaceLight};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const NoteInput = styled.input`
  width: 100%;
  min-width: 210px;
  height: 32px;
  border: 1px solid transparent;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  padding: 0 8px;
  outline: none;

  &:focus {
    background: ${({ theme }) => theme.colors.surfaceLight};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const LoginWrap = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
`;

const LoginCard = styled.form`
  width: min(100%, 460px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  border-radius: 30px;
  padding: 32px;
  display: grid;
  gap: 16px;

  h1 {
    margin: 0;
    font-size: 34px;
    letter-spacing: -0.06em;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.muted};
  }

  @media (max-width: 520px) {
    border-radius: 24px;
    padding: 24px 18px;

    h1 {
      font-size: 30px;
    }
  }
`;


const Workspace = styled.div`
  width: min(100% - 32px, 1440px);
  margin: 24px auto 80px;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 22px;
  min-width: 0;

  @media (max-width: 1180px) {
    grid-template-columns: 230px minmax(0, 1fr);
  }

  @media (max-width: 980px) {
    width: min(100% - 24px, 1440px);
    margin: 16px auto 64px;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (max-width: 640px) {
    width: min(100% - 18px, 1440px);
    margin: 12px auto 52px;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 96px;
  align-self: start;
  min-width: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  border-radius: 28px;
  padding: 16px;

  @media (max-width: 980px) {
    position: static;
    border-radius: 24px;
    padding: 12px;
    overflow: hidden;
  }

  @media (max-width: 640px) {
    border-radius: 20px;
    padding: 10px;
  }
`;

const SidebarTitle = styled.div`
  padding: 10px 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 12px;

  strong {
    display: block;
    font-size: 15px;
    letter-spacing: -0.02em;
  }

  span {
    display: block;
    margin-top: 3px;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 12px;
    font-weight: 800;
  }

  @media (max-width: 980px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 6px 6px 10px;

    span {
      text-align: right;
    }
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const SidebarNav = styled.nav`
  display: grid;
  gap: 8px;
  min-width: 0;

  @media (max-width: 980px) {
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 2px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const SidebarButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  min-height: 44px;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  border-radius: 16px;
  background: ${({ theme, $active }) => ($active ? theme.colors.primarySoft : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-weight: 900;
  text-align: left;
  transition: transform ${({ theme }) => theme.motion.fast}, background ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateX(3px);
    background: ${({ theme }) => theme.colors.primarySoft};
  }

  span {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 12px;
  }

  @media (max-width: 980px) {
    width: auto;
    flex: 0 0 auto;
    min-width: max-content;
    padding: 0 16px;
    white-space: nowrap;

    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: 640px) {
    min-height: 40px;
    border-radius: 14px;
    padding: 0 14px;
    font-size: 14px;

    span {
      display: none;
    }
  }
`;

const ContentArea = styled.main`
  min-width: 0;
  max-width: 100%;
  display: grid;
  gap: 18px;

  @media (max-width: 640px) {
    gap: 14px;
  }
`;

const ContentHeader = styled.div`
  min-width: 0;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  border-radius: 28px;
  padding: 22px 24px;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  flex-wrap: wrap;

  h1 {
    margin: 0;
    font-size: clamp(26px, 4vw, 42px);
    letter-spacing: -0.055em;
    line-height: 1.05;
  }

  p {
    margin: 8px 0 0;
    color: ${({ theme }) => theme.colors.muted};
    /* max-width: 760px; */
  }

  @media (max-width: 640px) {
    border-radius: 22px;
    padding: 18px;
    align-items: flex-start;

    h1 {
      font-size: 28px;
    }

    p {
      font-size: 14px;
    }
  }
`;

const HeaderBadge = styled.div`
  max-width: 100%;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 640px) {
    width: 100%;
    text-align: center;
  }
`;

const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  font-weight: 800;
`;

const PaginationActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  @media (max-width: 520px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const PageButton = styled.button`
  min-height: 34px;
  min-width: 34px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 900;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primarySoft};
  }
`;

// const MutedText = styled.p`
//   margin: 10px 0 0;
//   color: ${({ theme }) => theme.colors.muted};
//   font-size: 13px;
// `;

const DISABLED_TIME_PLACEHOLDER = '--:--';

function displayTime(value: string) {
  return value || DISABLED_TIME_PLACEHOLDER;
}

function displayValue(value: string | undefined) {
  const text = String(value || '').trim();
  return text || '-';
}

function emptyLeaveSummary(employeeNo = ''): LeaveSummary {
  return {
    employeeNo,
    asOfDate: '',
    joinDate: '',
    remainingDays: 0,
    usedDays: 0,
    expiringDays: 0,
    expiringDate: '',
    grants: []
  };
}

function newEmployee(): EmployeeProfile {
  return {
    employeeNo: '',
    department: '',
    name: '',
    joinDate: '',
    email: '',
    status: 'active'
  };
}

function newUser(): UserAccountInput {
  return {
    username: '',
    displayName: '',
    role: 'viewer',
    status: 'active',
    password: ''
  };
}

function canManageEmployees(role: UserRole) {
  return role === 'superAdmin' || role === 'admin';
}

function canWriteAttendance(role: UserRole) {
  return role === 'superAdmin' || role === 'admin';
}


type AdminView = 'overview' | 'attendance' | 'leave' | 'employees' | 'users';

type BusyAction = 'none' | 'testing' | 'loading' | 'loadingEmployee' | 'syncing' | 'savingEmployee' | 'savingUser';

type PageSlice<T> = {
  items: T[];
  totalPages: number;
  start: number;
  end: number;
};

function paginate<T>(items: T[], page: number, pageSize: number): PageSlice<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const pageItems = items.slice(startIndex, startIndex + pageSize);

  return {
    items: pageItems,
    totalPages,
    start: items.length ? startIndex + 1 : 0,
    end: Math.min(items.length, startIndex + pageItems.length)
  };
}

function PaginationControls({
  total,
  page,
  totalPages,
  start,
  end,
  onPageChange
}: {
  total: number;
  page: number;
  totalPages: number;
  start: number;
  end: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <PaginationBar>
      <span>{total ? `${start}-${end} / ${total}` : '0 record'}</span>
      <PaginationActions>
        <PageButton type="button" onClick={() => onPageChange(1)} disabled={page <= 1}>«</PageButton>
        <PageButton type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>‹</PageButton>
        <span>Page {Math.min(page, totalPages)} / {totalPages}</span>
        <PageButton type="button" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>›</PageButton>
        <PageButton type="button" onClick={() => onPageChange(totalPages)} disabled={page >= totalPages}>»</PageButton>
      </PaginationActions>
    </PaginationBar>
  );
}

function LoadingLabel({ label }: { label: string }) {
  return (
    <LoadingContent>
      <Spinner aria-hidden="true" />
      {label}
    </LoadingContent>
  );
}

function getBusyMessage(action: BusyAction) {
  switch (action) {
    case 'testing':
      return 'Testing Google Sheets connection...';
    case 'loadingEmployee':
      return 'Loading employee information...';
    case 'loading':
      return 'Loading data from Google Sheets...';
    case 'syncing':
      return 'Syncing data with Google Sheets...';
    case 'savingEmployee':
      return 'Saving employee information...';
    case 'savingUser':
      return 'Saving user information...';
    default:
      return '';
  }
}

function LoginScreen({ onLogin }: { onLogin: (session: AuthSession) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<SaveState>('idle');
  const [message, setMessage] = useState('');
  const t = getAdminText('en');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setState('saving');
    setMessage('');

    try {
      const session = await loginAdmin(username, password);
      setState('saved');
      onLogin(session);
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Login failed.');
    }
  }

  return (
    <AdminShell>
      <LoginWrap>
        <LoginCard onSubmit={handleSubmit}>
          <MarkWrap><Mark /></MarkWrap>
          <LoginHeader>VIORA ADMIN</LoginHeader>
          <p>{t.loginDescription}</p>
          <Field>
            Username
            <Input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" />
          </Field>
          <Field>
            Password
            <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
          </Field>
          <ActionButton $primary type="submit" disabled={state === 'saving'}>{state === 'saving' ? 'Signing in...' : 'Login'}</ActionButton>
          {message && <Message $state={state}>{message}</Message>}
        </LoginCard>
      </LoginWrap>
    </AdminShell>
  );
}

export function AdminAttendancePage({ mode, language, onModeChange, onLanguageChange }: AdminAttendancePageProps) {
  const t = getAdminText(language);
  const weekdayLanguage = language === 'jp' ? 'jp' : language === 'en' ? 'en' : 'vi';
  const now = useMemo(() => new Date(), []);
  const [session, setSession] = useState<AuthSession | null>(() => getStoredSession());
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [employee, setEmployee] = useState<EmployeeProfile>(defaultEmployee);
  const [settings, setSettings] = useState<AttendanceSettings>(defaultSettings);
  const [rows, setRows] = useState<AttendanceEntry[]>(() => buildMonthRows(now.getFullYear(), now.getMonth() + 1, weekdayLanguage));
  const [message, setMessage] = useState('');
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [busyAction, setBusyAction] = useState<BusyAction>('none');
  const [employees, setEmployees] = useState<EmployeeProfile[]>([]);
  const [employeeForm, setEmployeeForm] = useState<EmployeeProfile>(newEmployee());
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [userForm, setUserForm] = useState<UserAccountInput>(newUser());
  const [leaveSummary, setLeaveSummary] = useState<LeaveSummary>(() => emptyLeaveSummary());
  const [activeView, setActiveView] = useState<AdminView>('overview');
  const [employeePage, setEmployeePage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [leavePage, setLeavePage] = useState(1);

  const configured = isGoogleSheetConfigured();
  const summary = useMemo(() => calculateSummary(rows), [rows]);
  const role = session?.user.role || 'viewer';
  const writeAllowed = canWriteAttendance(role);
  const employeeManageAllowed = canManageEmployees(role);
  const userManageAllowed = role === 'superAdmin';
  const employeePageData = useMemo(() => paginate(employees, employeePage, 8), [employees, employeePage]);
  const userPageData = useMemo(() => paginate(users, userPage, 8), [users, userPage]);
  const leavePageData = useMemo(() => paginate(leaveSummary.grants || [], leavePage, 8), [leaveSummary.grants, leavePage]);
  const selectedEmployeeExists = useMemo(
    () => Boolean(employee.employeeNo) && employees.some((item) => item.employeeNo === employee.employeeNo),
    [employees, employee.employeeNo]
  );
  const hasSelectedEmployee = selectedEmployeeExists;
  const busyMessage = getBusyMessage(busyAction);
  const viewMeta = {
    overview: { title: `${t.overviewTimekeeping}`, description: `${t.overviewTimekeepingDescription}` },
    attendance: { title: `${t.openTimeSheet}`, description: `${t.openTimeSheetDescription}` },
    leave: { title: `${t.paidLeaveDayTitle}`, description: `${t.paidLeaveDayTitleDescription}` },
    employees: { title: `${t.employees}`, description: `${t.employeesDescription}` },
    users: { title: `${t.users}`, description: `${t.usersDescription}` }
  }[activeView];

  useEffect(() => {
    setRows((current) => normalizeWeekdays(current, weekdayLanguage));
  }, [weekdayLanguage]);

  useEffect(() => {
    setSettings(defaultSettings);
    setRows(buildMonthRows(year, month, weekdayLanguage));
    setLeaveSummary(emptyLeaveSummary(employee.employeeNo));
  }, [year, month]);

  useEffect(() => {
    if (!session) return;
    refreshEmployees();
    if (userManageAllowed) refreshUsers();
  }, [session?.token]);

  useEffect(() => {
    if (activeView === 'users' && !userManageAllowed) setActiveView('overview');
    if (activeView === 'employees' && !employeeManageAllowed) setActiveView('overview');
  }, [activeView, userManageAllowed, employeeManageAllowed]);

  useEffect(() => { setEmployeePage(1); }, [employees.length]);
  useEffect(() => { setUserPage(1); }, [users.length]);
  useEffect(() => { setLeavePage(1); }, [leaveSummary.grants.length]);

  useEffect(() => {
    if (!message || saveState !== 'saved') return;
    const timer = window.setTimeout(() => setMessage(''), 3000);
    return () => window.clearTimeout(timer);
  }, [message, saveState]);


  if (!session) {
    return <LoginScreen onLogin={setSession} />;
  }

  function createPayload(): AttendancePayload {
    return {
      employee,
      year,
      month,
      settings,
      rows,
      summary,
      updatedAt: new Date().toISOString()
    };
  }

  function updateEmployee<K extends keyof EmployeeProfile>(field: K, value: EmployeeProfile[K]) {
    setEmployee((current) => ({ ...current, [field]: value }));
  }

  function applyEmployeeProfile(profile: EmployeeProfile) {
    setEmployee({
      employeeNo: profile.employeeNo,
      name: profile.name,
      department: profile.department,
      joinDate: profile.joinDate || '',
      email: profile.email || '',
      status: profile.status || 'active'
    });
    setEmployeeForm(profile);
  }

  async function handleSelectEmployee(employeeNo: string) {
    if (!employeeNo) {
      setEmployee(newEmployee());
      setEmployeeForm(newEmployee());
      setSettings(defaultSettings);
      setRows(buildMonthRows(year, month, weekdayLanguage));
      setLeaveSummary(emptyLeaveSummary());
      setMessage('');
      setSaveState('idle');
      return;
    }

    setBusyAction('loadingEmployee');
    setMessage('');

    try {
      const selected = await getEmployeeFromSheet(employeeNo);
      applyEmployeeProfile(selected);
      setSettings(defaultSettings);
      setRows(buildMonthRows(year, month, weekdayLanguage));
      setLeaveSummary(emptyLeaveSummary(selected.employeeNo));
      setSaveState('saved');
      setMessage(t.selectedEmployee);
    } catch (error) {
      const fallback = employees.find((item) => item.employeeNo === employeeNo);
      if (fallback) {
        applyEmployeeProfile(fallback);
        setSettings(defaultSettings);
        setRows(buildMonthRows(year, month, weekdayLanguage));
        setLeaveSummary(emptyLeaveSummary(fallback.employeeNo));
        setSaveState('saved');
        setMessage(t.selectedDraft);
      } else {
        setSaveState('error');
        setMessage(error instanceof Error ? error.message : t.error);
      }
    } finally {
      setBusyAction('none');
    }
  }

  function updateEmployeeForm<K extends keyof EmployeeProfile>(field: K, value: EmployeeProfile[K]) {
    setEmployeeForm((current) => ({ ...current, [field]: value }));
  }

  function updateUserForm<K extends keyof UserAccountInput>(field: K, value: UserAccountInput[K]) {
    setUserForm((current) => ({ ...current, [field]: value }));
  }

  function updateSettings<K extends keyof AttendanceSettings>(field: K, value: AttendanceSettings[K]) {
    setSettings((current) => {
      const next = { ...current, [field]: value };
      setRows((currentRows) => calculateRows(currentRows, next));
      return next;
    });
  }

  function updateRow<K extends keyof AttendanceEntry>(id: string, field: K, value: AttendanceEntry[K]) {
    if (!writeAllowed) return;

    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row;

        if ((field === 'timecardIn' || field === 'timecardOut') && !isTimeEditableAttendanceType(row.attendanceType)) {
          return calculateEntry(row, settings);
        }

        const nextRow = { ...row, [field]: value };

        if (field === 'attendanceType') {
          const nextType = value as AttendanceEntry['attendanceType'];
          if (isTimeEditableAttendanceType(nextType)) {
            nextRow.timecardIn = row.timecardIn || settings.basicStart;
            nextRow.timecardOut = row.timecardOut || settings.basicEnd;
          } else {
            nextRow.timecardIn = '';
            nextRow.timecardOut = '';
            nextRow.workStart = '';
            nextRow.workEnd = '';
          }
        }

        return calculateEntry(nextRow, settings);
      })
    );
  }

  async function refreshEmployees() {
    try {
      const list = await listEmployees();
      setEmployees(list);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t.error);
      setSaveState('error');
    }
  }

  async function refreshUsers() {
    try {
      const list = await listUsers();
      setUsers(list);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t.error);
      setSaveState('error');
    }
  }

  function handleSaveDraft() {
    saveAttendanceDraft(createPayload());
    setMessage(t.savedDraft);
    setSaveState('saved');
  }

  async function handleTestSheetConnection() {
    setSaveState('saving');
    setBusyAction('testing');
    setMessage('');

    try {
      const result = await testGoogleSheetConnection();
      setSaveState(result.ok ? 'saved' : 'error');
      setMessage(result.message);
    } catch (error) {
      setSaveState('error');
      setMessage(error instanceof Error ? error.message : t.error);
    } finally {
      setBusyAction('none');
    }
  }

  async function handleSyncSheet() {
    if (!writeAllowed) {
      setSaveState('error');
      setMessage('This account does not have permission to save attendance.');
      return;
    }

    if (!hasSelectedEmployee) {
      setSaveState('error');
      setMessage(t.pleaseSelectEmployee);
      return;
    }

    const payload = createPayload();
    saveAttendanceDraft(payload);
    setSaveState('saving');
    setBusyAction('syncing');
    setMessage('');

    try {
      const result = await saveAttendanceToSheet(payload);
      setSaveState(result.ok ? 'saved' : 'error');
      if (result.leaveSummary) setLeaveSummary(result.leaveSummary);
      setMessage(result.ok ? result.message || t.savedSheet : result.message);
      refreshEmployees();
    } catch (error) {
      setSaveState('error');
      setMessage(error instanceof Error ? error.message : t.error);
    } finally {
      setBusyAction('none');
    }
  }

  async function handleLoadSheet() {
    setSaveState('saving');
    setBusyAction('loading');
    setMessage('');

    try {
      if (!hasSelectedEmployee) {
        setMessage(t.pleaseSelectEmployee);
        setSaveState('error');
        return;
      }

      if (!configured) {
        const draft = loadAttendanceDraft(employee.employeeNo, year, month);
        if (draft) {
          setEmployee(draft.employee);
          setSettings(draft.settings);
          setRows(normalizeWeekdays(calculateRows(draft.rows, draft.settings), weekdayLanguage));
          setMessage(t.loaded);
          setSaveState('saved');
        } else {
          setMessage(t.notConfigured);
          setSaveState('error');
        }
        return;
      }

      const result = await loadAttendanceFromSheet(employee.employeeNo, year, month);
      if (!result.payload) {
        if (result.employee) setEmployee((current) => ({ ...current, ...result.employee }));
        if (result.leaveSummary) setLeaveSummary(result.leaveSummary);
        setMessage('No attendance data found for this employee and month. Employee and leave data were loaded if available.');
        setSaveState('saved');
        return;
      }

      setEmployee(result.payload.employee);
      setSettings(result.payload.settings);
      setRows(normalizeWeekdays(calculateRows(result.payload.rows, result.payload.settings), weekdayLanguage));
      if (result.leaveSummary) setLeaveSummary(result.leaveSummary);
      saveAttendanceDraft(result.payload);
      setMessage(t.loaded);
      setSaveState('saved');
    } catch (error) {
      setSaveState('error');
      setMessage(error instanceof Error ? error.message : t.error);
    } finally {
      setBusyAction('none');
    }
  }

  function handleResetMonth() {
    if (!writeAllowed) return;
    setRows(buildMonthRows(year, month, weekdayLanguage));
    setMessage(t.resetDone);
    setSaveState('saved');
  }

  async function handleSaveEmployee() {
    if (!employeeManageAllowed) return;
    setSaveState('saving');
    setBusyAction('savingEmployee');
    setMessage('');
    try {
      const result = await saveEmployee(employeeForm);
      setEmployees(result.employees || []);
      if (result.employee) {
        setEmployee(result.employee);
        setEmployeeForm(result.employee);
        setSettings(defaultSettings);
        setRows(buildMonthRows(year, month, weekdayLanguage));
        setLeaveSummary(emptyLeaveSummary(result.employee.employeeNo));
      }
      setSaveState('saved');
      setMessage(result.message || 'Employee saved.');
    } catch (error) {
      setSaveState('error');
      setMessage(error instanceof Error ? error.message : t.error);
    } finally {
      setBusyAction('none');
    }
  }

  async function handleDeleteEmployee() {
    if (!employeeManageAllowed || !employeeForm.employeeNo) return;
    if (!window.confirm(`Delete employee ${employeeForm.employeeNo}?`)) return;
    setSaveState('saving');
    setBusyAction('savingEmployee');
    setMessage('');
    try {
      const deletedEmployeeNo = employeeForm.employeeNo;
      const result = await deleteEmployee(deletedEmployeeNo);
      setEmployees(result.employees || []);
      setEmployeeForm(newEmployee());
      if (employee.employeeNo === deletedEmployeeNo) {
        setEmployee(newEmployee());
        setSettings(defaultSettings);
        setRows(buildMonthRows(year, month, weekdayLanguage));
        setLeaveSummary(emptyLeaveSummary());
      }
      setSaveState('saved');
      setMessage(result.message || 'Employee deleted.');
    } catch (error) {
      setSaveState('error');
      setMessage(error instanceof Error ? error.message : t.error);
    } finally {
      setBusyAction('none');
    }
  }

  async function handleSaveUser() {
    if (!userManageAllowed) return;
    setSaveState('saving');
    setBusyAction('savingUser');
    setMessage('');
    try {
      const result = await saveUser(userForm);
      setUsers(result.users || []);
      setUserForm(newUser());
      setSaveState('saved');
      setMessage(result.message || 'User saved.');
    } catch (error) {
      setSaveState('error');
      setMessage(error instanceof Error ? error.message : t.error);
    } finally {
      setBusyAction('none');
    }
  }

  async function handleDeleteUser() {
    if (!userManageAllowed || !userForm.username) return;
    if (!window.confirm(`Delete user ${userForm.username}?`)) return;
    setSaveState('saving');
    setBusyAction('savingUser');
    setMessage('');
    try {
      const result = await deleteUser(userForm.username);
      setUsers(result.users || []);
      setUserForm(newUser());
      setSaveState('saved');
      setMessage(result.message || 'User deleted.');
    } catch (error) {
      setSaveState('error');
      setMessage(error instanceof Error ? error.message : t.error);
    } finally {
      setBusyAction('none');
    }
  }

  function handleLogout() {
    clearSession();
    setSession(null);
  }

  return (
    <AdminShell>
      <AdminTopbar>
        <AdminTopbarInner>
          <Brand href="/admin" aria-label="VIORA ADMIN">
            <Mark />
            VIORA ADMIN
          </Brand>

          <NavActions>
            <UserBadge>{session.user.displayName}<span>{session.user.role}</span></UserBadge>
            {/* <LinkButton href="/">{t.landing}</LinkButton> */}
            <ToggleGroup aria-label="Theme mode">
              <ToggleButton $active={mode === 'light'} onClick={() => onModeChange('light')}>☀</ToggleButton>
              <ToggleButton $active={mode === 'dark'} onClick={() => onModeChange('dark')}>☾</ToggleButton>
            </ToggleGroup>
            <ToggleGroup aria-label="Language">
              {languages.map((item) => (
                <ToggleButton key={item.code} $active={language === item.code} onClick={() => onLanguageChange(item.code)}>
                  {item.label}
                </ToggleButton>
              ))}
            </ToggleGroup>
            <ActionButton onClick={handleLogout}>Logout</ActionButton>
          </NavActions>
        </AdminTopbarInner>
      </AdminTopbar>

      <Workspace>
        <Sidebar>
          <SidebarTitle>
            <strong>{t.adminMenu}</strong>
            <span>{session.user.role} · {configured ? 'API ready' : 'Not configured'}</span>
          </SidebarTitle>
          <SidebarNav>
            <SidebarButton type="button" $active={activeView === 'overview'} onClick={() => setActiveView('overview')}>
              {t.overview} <span>{year}/{String(month).padStart(2, '0')}</span>
            </SidebarButton>
            <SidebarButton type="button" $active={activeView === 'attendance'} onClick={() => setActiveView('attendance')}>
              {t.attendance} <span>{rows.length}</span>
            </SidebarButton>
            <SidebarButton type="button" $active={activeView === 'leave'} onClick={() => setActiveView('leave')}>
              {t.paidLeaveDayTitle} <span>{leaveSummary.remainingDays}d</span>
            </SidebarButton>
            {employeeManageAllowed && (
              <SidebarButton type="button" $active={activeView === 'employees'} onClick={() => setActiveView('employees')}>
                {t.employees} <span>{employees.length}</span>
              </SidebarButton>
            )}
            {userManageAllowed && (
              <SidebarButton type="button" $active={activeView === 'users'} onClick={() => setActiveView('users')}>
                {t.users} <span>{users.length}</span>
              </SidebarButton>
            )}
          </SidebarNav>
        </Sidebar>

        <ContentArea>
          <ContentHeader>
            <div>
              <Kicker>{t.admin} · Google Sheets API</Kicker>
              <h1>{viewMeta.title}</h1>
              <p>{viewMeta.description}</p>
            </div>
            <HeaderBadge>{employee.employeeNo || 'No employee selected'}</HeaderBadge>
          </ContentHeader>

          {activeView === 'overview' && (
            <>
              <PanelGrid>
                <Panel>
                  <PanelTitle>{t.employee}</PanelTitle>
                  <FieldGrid>
                    <Field>
                      {t.year}
                      <Input type="number" min={2020} max={2100} value={year} onChange={(event) => setYear(Number(event.target.value))} />
                    </Field>
                    <Field>
                      {t.month}
                      <Input type="number" min={1} max={12} value={month} onChange={(event) => setMonth(Number(event.target.value))} />
                    </Field>
                    <Field>
                      {t.selectEmployee}
                      <SelectInput value={hasSelectedEmployee ? employee.employeeNo : ''} onChange={(event) => void handleSelectEmployee(event.target.value)} disabled={busyAction !== 'none'}>
                        <option value="">{t.selectEmployeesOption}</option>
                        {employees.map((item) => (
                          <option key={item.employeeNo} value={item.employeeNo}>
                            {item.name}
                          </option>
                        ))}
                      </SelectInput>
                    </Field>
                    <Field>
                      {t.employeeNo}
                      <Input value={displayValue(employee.employeeNo)} disabled />
                    </Field>
                    <Field>
                      {t.department}
                      <Input value={displayValue(employee.department)} disabled />
                    </Field>
                    {/* <Field>
                      {t.employeeName}
                      <Input value={displayValue(employee.name)} disabled />
                    </Field> */}
                    <Field>
                      {t.joinDate}
                      <Input value={displayValue(employee.joinDate)} disabled />
                    </Field>
                    <Field>
                      {t.email}
                      <Input value={displayValue(employee.email)} disabled />
                    </Field>
                  </FieldGrid>
                </Panel>

                <Panel>
                  <PanelTitle>{t.paidLeaveDayTitle}</PanelTitle>
                  <Field>
                    <SummaryItem><span>{t.RemainingVacationDays}</span><strong>{leaveSummary.remainingDays}</strong></SummaryItem>
                    <SummaryItem><span>{t.UsedVacationDays}</span><strong>{leaveSummary.usedDays}</strong></SummaryItem>
                    <SummaryItem><span>{t.ExpiringVacationDays}</span><strong>{leaveSummary.expiringDays}</strong></SummaryItem>
                    <SummaryItem><span>{t.ExpirationDate}</span><strong>{leaveSummary.expiringDate || '-'}</strong></SummaryItem>
                  </Field>
                </Panel>
              </PanelGrid>

              <Panel>
                <PanelTitle>{t.summary}</PanelTitle>
                <SummaryGrid>
                  <SummaryItem><span>{t.workDays}</span><strong>{summary.workDays}</strong></SummaryItem>
                  <SummaryItem><span>{t.absenceDays}</span><strong>{summary.absenceDays}</strong></SummaryItem>
                  <SummaryItem><span>{t.paidLeaveDays}</span><strong>{summary.paidLeaveDays}</strong></SummaryItem>
                  <SummaryItem><span>{t.compLeaveDays}</span><strong>{summary.compensatoryLeaveDays}</strong></SummaryItem>
                  <SummaryItem><span>{t.holidayWorkDays}</span><strong>{summary.holidayWorkDays}</strong></SummaryItem>
                  <SummaryItem><span>{t.publicHolidayDays}</span><strong>{summary.publicHolidayDays}</strong></SummaryItem>
                  <SummaryItem><span>{t.totalHours}</span><strong>{formatDuration(summary.totalMinutes)}</strong></SummaryItem>
                  <SummaryItem><span>{t.overtimeHours}</span><strong>{formatDuration(summary.overtimeMinutes)}</strong></SummaryItem>
                  <SummaryItem><span>{t.nightHours}</span><strong>{formatDuration(summary.nightMinutes)}</strong></SummaryItem>
                </SummaryGrid>
              </Panel>

              <Panel>
                <PanelTitle>{t.actions}</PanelTitle>
                <ActionBar>
                  <ActionButton onClick={handleSaveDraft}>{t.saveDraft}</ActionButton>
                  <ActionButton onClick={handleTestSheetConnection} disabled={busyAction !== 'none'}>{busyAction === 'testing' ? <LoadingLabel label={t.checking} /> : t.testSheet}</ActionButton>
                  <ActionButton $primary onClick={handleSyncSheet} disabled={busyAction !== 'none' || !writeAllowed || !hasSelectedEmployee}>{busyAction === 'syncing' ? <LoadingLabel label={t.syncing} /> : t.syncSheet}</ActionButton>
                  <ActionButton onClick={handleLoadSheet} disabled={busyAction !== 'none' || !hasSelectedEmployee}>{busyAction === 'loading' ? <LoadingLabel label={t.loading} /> : t.loadSheet}</ActionButton>
                  <ActionButton onClick={() => downloadAttendanceXlsx(createPayload())} disabled={!hasSelectedEmployee}>{t.exportXlsx}</ActionButton>
                  <ActionButton onClick={() => setActiveView('attendance')}>{t.openTimeSheet}</ActionButton>
                </ActionBar>
              </Panel>
            </>
          )}

          {activeView === 'attendance' && (
            <>
              <Panel>
                <PanelTitle>{t.settings}</PanelTitle>
                <FieldGrid>
                  <Field>{t.basicTime}<Input type="time" value={settings.basicStart} onChange={(event) => updateSettings('basicStart', event.target.value)} disabled={!writeAllowed} /></Field>
                  <Field>&nbsp;<Input type="time" value={settings.basicEnd} onChange={(event) => updateSettings('basicEnd', event.target.value)} disabled={!writeAllowed} /></Field>
                  <Field>{t.earlyTime}<Input type="time" value={settings.earlyStart} onChange={(event) => updateSettings('earlyStart', event.target.value)} disabled={!writeAllowed} /></Field>
                  <Field>&nbsp;<Input type="time" value={settings.earlyEnd} onChange={(event) => updateSettings('earlyEnd', event.target.value)} disabled={!writeAllowed} /></Field>
                  <Field>{t.overtime}<Input type="time" value={settings.overtimeStart} onChange={(event) => updateSettings('overtimeStart', event.target.value)} disabled={!writeAllowed} /></Field>
                  <Field>&nbsp;<Input type="time" value={settings.overtimeEnd} onChange={(event) => updateSettings('overtimeEnd', event.target.value)} disabled={!writeAllowed} /></Field>
                  <Field>{t.nightTime}<Input type="time" value={settings.nightStart} onChange={(event) => updateSettings('nightStart', event.target.value)} disabled={!writeAllowed} /></Field>
                  <Field>&nbsp;<Input type="time" value={settings.nightEnd} onChange={(event) => updateSettings('nightEnd', event.target.value)} disabled={!writeAllowed} /></Field>
                  <Field>{t.breakMinutes} ({t.minutes})<Input type="number" min={0} value={settings.breakMinutes} onChange={(event) => updateSettings('breakMinutes', Number(event.target.value))} disabled={!writeAllowed} /></Field>
                  <Field>{t.startRound} ({t.minutes})<Input type="number" min={0} value={settings.startRoundMinutes} onChange={(event) => updateSettings('startRoundMinutes', Number(event.target.value))} disabled={!writeAllowed} /></Field>
                  <Field>{t.endRound} ({t.minutes})<Input type="number" min={0} value={settings.endRoundMinutes} onChange={(event) => updateSettings('endRoundMinutes', Number(event.target.value))} disabled={!writeAllowed} /></Field>
                </FieldGrid>
                <ActionBar>
                  <ActionButton onClick={handleSaveDraft}>{t.saveDraft}</ActionButton>
                  <ActionButton onClick={handleTestSheetConnection} disabled={busyAction !== 'none'}>{busyAction === 'testing' ? <LoadingLabel label={t.checking} /> : t.testSheet}</ActionButton>
                  <ActionButton $primary onClick={handleSyncSheet} disabled={busyAction !== 'none' || !writeAllowed || !hasSelectedEmployee}>{busyAction === 'syncing' ? <LoadingLabel label={t.syncing} /> : t.syncSheet}</ActionButton>
                  <ActionButton onClick={handleLoadSheet} disabled={busyAction !== 'none' || !hasSelectedEmployee}>{busyAction === 'loading' ? <LoadingLabel label={t.loading} /> : t.loadSheet}</ActionButton>
                  <ActionButton onClick={handleResetMonth} disabled={!writeAllowed}>{t.resetMonth}</ActionButton>
                  <ActionButton onClick={() => downloadAttendanceXlsx(createPayload())} disabled={!hasSelectedEmployee}>{t.exportXlsx}</ActionButton>
                </ActionBar>
              </Panel>

              <TablePanel>
                <TableHeader>
                  <h2>{year}/{String(month).padStart(2, '0')} - {t.attendanceManagementSheet}</h2>
                  <span>{employee.employeeNo} · {employee.name}</span>
                </TableHeader>
                <TableScroll>
                  <Table>
                    <thead>
                      <tr>
                        <Th rowSpan={2}>{t.cols.day}</Th>
                        <Th rowSpan={2}>{t.cols.weekday}</Th>
                        <Th rowSpan={2}>{t.cols.type}</Th>
                        <Th colSpan={2}>{t.cols.timecard}</Th>
                        <Th colSpan={2}>{t.cols.workTime}</Th>
                        <Th colSpan={4} $total>{t.cols.working}</Th>
                        <Th rowSpan={2}>{t.cols.note}</Th>
                      </tr>
                      <tr>
                        <Th>{t.cols.in}</Th>
                        <Th>{t.cols.out}</Th>
                        <Th>{t.cols.start}</Th>
                        <Th>{t.cols.end}</Th>
                        <Th $total>{t.cols.basic}</Th>
                        <Th $total>{t.cols.over}</Th>
                        <Th $total>{t.cols.night}</Th>
                        <Th $total>{t.cols.total}</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => {
                        const weekend = getWeekendType(row.date);
                        const timeEditable = isTimeEditableAttendanceType(row.attendanceType);
                        return (
                          <BodyRow key={row.id} $disabled={!timeEditable}>
                            <Td $weekend={weekend} $disabled={!timeEditable}>{row.day}</Td>
                            <Td $disabled={!timeEditable}>{row.weekday}</Td>
                            <Td $disabled={!timeEditable}>
                              <Select value={row.attendanceType} onChange={(event) => updateRow(row.id, 'attendanceType', event.target.value as AttendanceEntry['attendanceType'])} disabled={!writeAllowed}>
                                {attendanceTypes.map((item) => (
                                  <option key={item.value || 'none'} value={item.value}>{getAttendanceTypeLabel(item.value, language)}</option>
                                ))}
                              </Select>
                            </Td>
                            <Td $disabled={!timeEditable}>
                              {timeEditable ? (
                                <TableInput type="time" value={row.timecardIn} onChange={(event) => updateRow(row.id, 'timecardIn', event.target.value)} disabled={!writeAllowed} />
                              ) : (
                                <TableInput type="text" value={DISABLED_TIME_PLACEHOLDER} disabled readOnly />
                              )}
                            </Td>
                            <Td $disabled={!timeEditable}>
                              {timeEditable ? (
                                <TableInput type="time" value={row.timecardOut} onChange={(event) => updateRow(row.id, 'timecardOut', event.target.value)} disabled={!writeAllowed} />
                              ) : (
                                <TableInput type="text" value={DISABLED_TIME_PLACEHOLDER} disabled readOnly />
                              )}
                            </Td>
                            <Td $disabled={!timeEditable}>{displayTime(row.workStart)}</Td>
                            <Td $disabled={!timeEditable}>{displayTime(row.workEnd)}</Td>
                            <Td $total $disabled={!timeEditable}>{formatDuration(row.basicMinutes)}</Td>
                            <Td $total $disabled={!timeEditable}>{formatDuration(row.overtimeMinutes)}</Td>
                            <Td $total $disabled={!timeEditable}>{formatDuration(row.nightMinutes)}</Td>
                            <Td $total $disabled={!timeEditable}>{formatDuration(row.totalMinutes)}</Td>
                            <Td $disabled={!timeEditable}><NoteInput value={row.note} onChange={(event) => updateRow(row.id, 'note', event.target.value)} disabled={!writeAllowed} /></Td>
                          </BodyRow>
                        );
                      })}
                      <tr>
                        <Td $weekend="weekday" colSpan={7}>{t.total}</Td>
                        <Td $total><strong>{formatDuration(summary.basicMinutes)}</strong></Td>
                        <Td $total><strong>{formatDuration(summary.overtimeMinutes)}</strong></Td>
                        <Td $total><strong>{formatDuration(summary.nightMinutes)}</strong></Td>
                        <Td $total><strong>{formatDuration(summary.totalMinutes)}</strong></Td>
                        <Td />
                      </tr>
                    </tbody>
                  </Table>
                </TableScroll>
              </TablePanel>
            </>
          )}

          {activeView === 'leave' && (
            <Panel>
              <PanelTitle>{t.paidLeaveDayManagement}</PanelTitle>
              <SummaryGrid style={{ marginTop: 16 }}>
                <SummaryItem><span>{t.RemainingVacationDays}</span><strong>{leaveSummary.remainingDays}</strong></SummaryItem>
                <SummaryItem><span>{t.UsedVacationDays}</span><strong>{leaveSummary.usedDays}</strong></SummaryItem>
                <SummaryItem><span>{t.ExpiringVacationDays}</span><strong>{leaveSummary.expiringDays}</strong></SummaryItem>
                <SummaryItem><span>{t.ExpirationDate}</span><strong>{leaveSummary.expiringDate || '-'}</strong></SummaryItem>
              </SummaryGrid>
              <TableScroll style={{ marginTop: 16 }}>
                <CompactTable>
                  <thead>
                    <tr>
                      <th>{t.grantDate}</th>
                      <th>{t.grantedDays}</th>
                      <th>{t.usedDays}</th>
                      <th>{t.remainingDays}</th>
                      <th>{t.expirationDate}</th>
                      <th>{t.status}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leavePageData.items.map((grant) => (
                      <tr key={grant.grantDate}>
                        <td>{grant.grantDate}</td>
                        <td>{grant.grantedDays}日</td>
                        <td>{grant.usedDays}日</td>
                        <td>{grant.remainingDays}日</td>
                        <td>{grant.expiresAt}</td>
                        <td>{grant.status || (grant.isExpired ? 'expired' : 'active')}</td>
                      </tr>
                    ))}
                    {!leaveSummary.grants.length && <tr><td colSpan={6}>{t.noDataPaidLeave}</td></tr>}
                  </tbody>
                </CompactTable>
              </TableScroll>
              <PaginationControls total={leaveSummary.grants.length} page={leavePage} totalPages={leavePageData.totalPages} start={leavePageData.start} end={leavePageData.end} onPageChange={setLeavePage} />
            </Panel>
          )}

          {activeView === 'employees' && employeeManageAllowed && (
            <Panel>
              <PanelTitle>{t.addEmployee}</PanelTitle>
              <FieldGrid>
                <Field>{t.employeeNo}<Input value={employeeForm.employeeNo} onChange={(event) => updateEmployeeForm('employeeNo', event.target.value)} /></Field>
                <Field>{t.employeeName}<Input value={employeeForm.name} onChange={(event) => updateEmployeeForm('name', event.target.value)} /></Field>
                <Field>{t.department}<Input value={employeeForm.department} onChange={(event) => updateEmployeeForm('department', event.target.value)} /></Field>
                <Field>{t.joinDate}<Input type="date" value={employeeForm.joinDate || ''} onChange={(event) => updateEmployeeForm('joinDate', event.target.value)} /></Field>
                <Field>{t.email}<Input value={employeeForm.email || ''} onChange={(event) => updateEmployeeForm('email', event.target.value)} /></Field>
                <Field>
                  {t.status}
                  <SelectInput value={employeeForm.status || 'active'} onChange={(event) => updateEmployeeForm('status', event.target.value as EmployeeProfile['status'])}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </SelectInput>
                </Field>
              </FieldGrid>
              <ActionBar>
                <ActionButton onClick={() => setEmployeeForm(newEmployee())}>{t.newEmployee}</ActionButton>
                <ActionButton $primary onClick={handleSaveEmployee} disabled={saveState === 'saving'}>{t.saveEmployee}</ActionButton>
                <ActionButton $danger onClick={handleDeleteEmployee} disabled={saveState === 'saving' || !employeeForm.employeeNo}>{t.deleteEmployee}</ActionButton>
                <ActionButton onClick={() => applyEmployeeProfile(employeeForm)} disabled={!employeeForm.employeeNo}>{t.applyEmployeeProfile}</ActionButton>
                <ActionButton onClick={refreshEmployees}>{t.refreshEmployees}</ActionButton>
              </ActionBar>
              <TableScroll style={{ marginTop: 16 }}>
                <CompactTable>
                  <thead>
                    <tr><th>{t.employeeNo}</th><th>{t.employeeName}</th><th>{t.department}</th><th>{t.joinDate}</th><th>{t.email}</th><th>{t.status}</th></tr>
                  </thead>
                  <tbody>
                    {employeePageData.items.map((item) => (
                      <tr key={item.employeeNo} onClick={() => setEmployeeForm(item)}>
                        <td>{item.employeeNo}</td>
                        <td>{item.name}</td>
                        <td>{item.department}</td>
                        <td>{item.joinDate || '-'}</td>
                        <td>{item.email || '-'}</td>
                        <td>{item.status || 'active'}</td>
                      </tr>
                    ))}
                    {!employees.length && <tr><td colSpan={6}>{t.noEmployees}</td></tr>}
                  </tbody>
                </CompactTable>
              </TableScroll>
              <PaginationControls total={employees.length} page={employeePage} totalPages={employeePageData.totalPages} start={employeePageData.start} end={employeePageData.end} onPageChange={setEmployeePage} />
            </Panel>
          )}

          {activeView === 'users' && userManageAllowed && (
            <Panel>
              <PanelTitle>{t.permission}</PanelTitle>
              <FieldGrid style={{ marginTop: 16 }}>
                <Field>{t.username}<Input value={userForm.username} onChange={(event) => updateUserForm('username', event.target.value)} /></Field>
                <Field>{t.displayName}<Input value={userForm.displayName} onChange={(event) => updateUserForm('displayName', event.target.value)} /></Field>
                <Field>
                  {t.role}
                  <SelectInput value={userForm.role} onChange={(event) => updateUserForm('role', event.target.value as UserRole)}>
                    <option value="superAdmin">superAdmin</option>
                    <option value="admin">admin</option>
                    <option value="viewer">viewer</option>
                  </SelectInput>
                </Field>
                <Field>
                  {t.status}
                  <SelectInput value={userForm.status} onChange={(event) => updateUserForm('status', event.target.value as UserAccountInput['status'])}>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </SelectInput>
                </Field>
                <Field>{t.password}<Input type="password" value={userForm.password || ''} onChange={(event) => updateUserForm('password', event.target.value)} /></Field>
              </FieldGrid>
              <ActionBar>
                <ActionButton onClick={() => setUserForm(newUser())}>{t.newUser}</ActionButton>
                <ActionButton $primary onClick={handleSaveUser} disabled={saveState === 'saving'}>{t.saveUser}</ActionButton>
                <ActionButton $danger onClick={handleDeleteUser} disabled={saveState === 'saving' || !userForm.username}>{t.deleteUser}</ActionButton>
                <ActionButton onClick={refreshUsers}>{t.refreshUsers}</ActionButton>
              </ActionBar>
              <TableScroll style={{ marginTop: 16 }}>
                <CompactTable>
                  <thead>
                    <tr><th>{t.username}</th><th>{t.displayName}</th><th>{t.role}</th><th>{t.status}</th><th>{t.updatedAt}</th></tr>
                  </thead>
                  <tbody>
                    {userPageData.items.map((item) => (
                      <tr key={item.username} onClick={() => setUserForm({ ...item, password: '' })}>
                        <td>{item.username}</td>
                        <td>{item.displayName}</td>
                        <td>{item.role}</td>
                        <td>{item.status}</td>
                        <td>{item.updatedAt || '-'}</td>
                      </tr>
                    ))}
                    {!users.length && <tr><td colSpan={5}>{t.noUsers}</td></tr>}
                  </tbody>
                </CompactTable>
              </TableScroll>
              <PaginationControls total={users.length} page={userPage} totalPages={userPageData.totalPages} start={userPageData.start} end={userPageData.end} onPageChange={setUserPage} />
            </Panel>
          )}
        </ContentArea>
      </Workspace>

      {busyAction !== 'none' && (
        <LoadingOverlay role="status" aria-live="polite" aria-label={busyMessage || 'Loading'}>
          <LoadingCard>
            <Spinner aria-hidden="true" />
            <strong>{busyMessage || t.processing}</strong>
            <span>{t.wait}</span>
          </LoadingCard>
        </LoadingOverlay>
      )}

      {message && saveState !== 'saving' && (
        <Toast $state={saveState === 'error' ? 'error' : 'saved'} role="status" aria-live="polite">
          <span>{message}</span>
          <ToastClose type="button" aria-label="Close message" onClick={() => setMessage('')}>×</ToastClose>
        </Toast>
      )}
    </AdminShell>
  );

}
