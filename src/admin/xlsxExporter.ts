import { getAttendanceTypeLabel } from './attendanceDefaults';
import { calculateSummary, formatDuration, isTimeEditableAttendanceType, pad } from './attendanceLogic';
import type { AttendanceEntry, AttendancePayload } from './types';

const STYLE = {
  base: 0,
  title: 1,
  label: 2,
  value: 3,
  settingsHeader: 4,
  settingsLabel: 5,
  settingsValue: 6,
  header: 7,
  headerYellow: 8,
  body: 9,
  day: 10,
  saturday: 11,
  sunday: 12,
  disabled: 13,
  disabledDay: 14,
  total: 15,
  totalLabel: 16,
  note: 17
} as const;

type CellValue = string | number;
type Cell = {
  value?: CellValue;
  style: number;
};

type ZipFileEntry = {
  name: string;
  data: Uint8Array;
};

const encoder = new TextEncoder();

function xml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function colName(index: number) {
  let name = '';
  let value = index;
  while (value > 0) {
    const remainder = (value - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    value = Math.floor((value - 1) / 26);
  }
  return name;
}

function cellRef(row: number, col: number) {
  return `${colName(col)}${row}`;
}

function timeOrDash(value?: string) {
  return value && /^\d{2}:\d{2}$/.test(value) ? value : '--:--';
}

function dayToJpWeekday(date: string) {
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const parsed = new Date(`${date}T00:00:00`);
  return weekdays[parsed.getDay()] || '';
}

function getWeekendStyle(entry?: AttendanceEntry) {
  if (!entry) return STYLE.disabledDay;
  if (!isTimeEditableAttendanceType(entry.attendanceType)) return STYLE.disabledDay;
  const day = new Date(`${entry.date}T00:00:00`).getDay();
  if (day === 0) return STYLE.sunday;
  if (day === 6) return STYLE.saturday;
  return STYLE.day;
}

function setCell(cells: Map<string, Cell>, row: number, col: number, value: CellValue | undefined, style: number) {
  cells.set(cellRef(row, col), { value, style });
}

function setStyleRange(cells: Map<string, Cell>, rowStart: number, rowEnd: number, colStart: number, colEnd: number, style: number) {
  for (let row = rowStart; row <= rowEnd; row += 1) {
    for (let col = colStart; col <= colEnd; col += 1) {
      const ref = cellRef(row, col);
      const existing = cells.get(ref);
      cells.set(ref, { value: existing?.value, style });
    }
  }
}

function setMergedCell(cells: Map<string, Cell>, rowStart: number, colStart: number, rowEnd: number, colEnd: number, value: CellValue | undefined, style: number) {
  setStyleRange(cells, rowStart, rowEnd, colStart, colEnd, style);
  setCell(cells, rowStart, colStart, value, style);
}

function renderCell(row: number, col: number, cell: Cell) {
  const ref = cellRef(row, col);
  const style = ` s="${cell.style}"`;
  if (typeof cell.value === 'undefined' || cell.value === '') {
    return `<c r="${ref}"${style}/>`;
  }
  if (typeof cell.value === 'number' && Number.isFinite(cell.value)) {
    return `<c r="${ref}"${style}><v>${cell.value}</v></c>`;
  }
  return `<c r="${ref}"${style} t="inlineStr"><is><t>${xml(cell.value)}</t></is></c>`;
}

function minutes(value: number) {
  return formatDuration(value || 0);
}

function buildSheetXml(payload: AttendancePayload) {
  const cells = new Map<string, Cell>();
  const merges: string[] = [];
  const maxCol = 40; // A:AN
  const maxDataRow = 43;
  const totalRow = 44;
  const summary = calculateSummary(payload.rows);
  const rowsByDay = new Map(payload.rows.map((entry) => [entry.day, entry]));

  const merge = (start: string, end: string) => merges.push(`${start}:${end}`);
  const mergeBy = (r1: number, c1: number, r2: number, c2: number, value: CellValue | undefined, style: number) => {
    setMergedCell(cells, r1, c1, r2, c2, value, style);
    merge(cellRef(r1, c1), cellRef(r2, c2));
  };

  for (let row = 1; row <= totalRow; row += 1) {
    for (let col = 1; col <= maxCol; col += 1) {
      setCell(cells, row, col, '', STYLE.body);
    }
  }

  // Top employee and summary area.
  mergeBy(1, 1, 1, 2, payload.year, STYLE.title);
  setCell(cells, 1, 3, '年', STYLE.title);
  mergeBy(1, 4, 1, 5, payload.month, STYLE.title);
  setCell(cells, 1, 6, '月度', STYLE.title);

  mergeBy(3, 1, 3, 3, '社員NO', STYLE.label);
  mergeBy(3, 4, 3, 7, payload.employee.employeeNo || '', STYLE.value);
  mergeBy(3, 8, 3, 10, '所属', STYLE.label);
  mergeBy(3, 11, 3, 22, payload.employee.department || '', STYLE.value);
  mergeBy(3, 23, 3, 25, '氏名', STYLE.label);
  mergeBy(3, 26, 3, 35, payload.employee.name || '', STYLE.value);

  mergeBy(5, 1, 5, 7, '出勤日数', STYLE.label);
  mergeBy(6, 1, 6, 7, summary.workDays, STYLE.value);
  mergeBy(5, 8, 5, 14, '欠勤日数', STYLE.label);
  mergeBy(6, 8, 6, 14, summary.absenceDays, STYLE.value);
  mergeBy(5, 15, 5, 21, '有休取得日数', STYLE.label);
  mergeBy(6, 15, 6, 21, summary.paidLeaveDays, STYLE.value);
  mergeBy(5, 22, 5, 28, '代休取得日数', STYLE.label);
  mergeBy(6, 22, 6, 28, summary.compensatoryLeaveDays, STYLE.value);

  mergeBy(7, 1, 7, 7, '総就業時間', STYLE.label);
  mergeBy(8, 1, 8, 7, minutes(summary.totalMinutes), STYLE.value);
  mergeBy(7, 8, 7, 14, '早出残業時間', STYLE.label);
  mergeBy(8, 8, 8, 14, minutes(summary.overtimeMinutes), STYLE.value);
  mergeBy(7, 15, 7, 21, '早朝深夜勤務時間', STYLE.label);
  mergeBy(8, 15, 8, 21, minutes(summary.nightMinutes), STYLE.value);

  // Settings block on AK:AN.
  mergeBy(1, 37, 1, 40, '時間設定', STYLE.settingsHeader);
  setCell(cells, 2, 37, '基本就業時間', STYLE.settingsLabel);
  setCell(cells, 2, 38, payload.settings.basicStart, STYLE.settingsValue);
  setCell(cells, 2, 39, '～', STYLE.settingsValue);
  setCell(cells, 2, 40, payload.settings.basicEnd, STYLE.settingsValue);
  setCell(cells, 3, 37, '早出時間', STYLE.settingsLabel);
  setCell(cells, 3, 38, payload.settings.earlyStart, STYLE.settingsValue);
  setCell(cells, 3, 39, '～', STYLE.settingsValue);
  setCell(cells, 3, 40, payload.settings.earlyEnd, STYLE.settingsValue);
  setCell(cells, 4, 37, '残業時間', STYLE.settingsLabel);
  setCell(cells, 4, 38, payload.settings.overtimeStart, STYLE.settingsValue);
  setCell(cells, 4, 39, '～', STYLE.settingsValue);
  setCell(cells, 4, 40, payload.settings.overtimeEnd, STYLE.settingsValue);
  setCell(cells, 5, 37, '早朝・深夜業時間', STYLE.settingsLabel);
  setCell(cells, 5, 38, payload.settings.nightStart, STYLE.settingsValue);
  setCell(cells, 5, 39, '～', STYLE.settingsValue);
  setCell(cells, 5, 40, payload.settings.nightEnd, STYLE.settingsValue);
  setCell(cells, 6, 37, '休憩時間', STYLE.settingsLabel);
  setCell(cells, 6, 38, `${payload.settings.breakMinutes}分`, STYLE.settingsValue);
  mergeBy(8, 37, 8, 40, '就業時刻', STYLE.settingsHeader);
  setCell(cells, 9, 37, '開始時刻切上単位', STYLE.settingsLabel);
  setCell(cells, 9, 38, payload.settings.startRoundMinutes, STYLE.settingsValue);
  setCell(cells, 10, 37, '終了時刻切捨単位', STYLE.settingsLabel);
  setCell(cells, 10, 38, payload.settings.endRoundMinutes, STYLE.settingsValue);
  setCell(cells, 11, 38, '※単位：分', STYLE.settingsValue);

  ['勤怠区分', '出勤', '欠勤', '有給休暇', '代休', '休日出勤', '祝日'].forEach((value, index) => {
    setCell(cells, 13 + index, 37, value, STYLE.settingsLabel);
  });

  // Main table header.
  mergeBy(10, 1, 12, 2, '日', STYLE.header);
  mergeBy(10, 3, 12, 4, '曜日', STYLE.header);
  mergeBy(10, 5, 12, 8, '勤怠区分', STYLE.header);
  mergeBy(10, 9, 10, 14, 'タイムカード時刻', STYLE.header);
  mergeBy(11, 9, 12, 11, '出社', STYLE.header);
  mergeBy(11, 12, 12, 14, '退社', STYLE.header);
  mergeBy(10, 15, 10, 20, '就業時刻', STYLE.header);
  mergeBy(11, 15, 12, 17, '開始時刻', STYLE.header);
  mergeBy(11, 18, 12, 20, '終了時刻', STYLE.header);
  mergeBy(10, 21, 10, 29, '就業時間', STYLE.headerYellow);
  mergeBy(11, 21, 12, 23, '基本', STYLE.headerYellow);
  mergeBy(11, 24, 11, 26, '早出', STYLE.headerYellow);
  mergeBy(12, 24, 12, 26, '残業', STYLE.headerYellow);
  mergeBy(11, 27, 11, 29, '早朝', STYLE.headerYellow);
  mergeBy(12, 27, 12, 29, '深夜', STYLE.headerYellow);
  mergeBy(10, 30, 12, 31, '合計', STYLE.headerYellow);
  mergeBy(10, 32, 12, 35, '備考', STYLE.header);

  for (let day = 1; day <= 31; day += 1) {
    const rowNumber = 12 + day;
    const entry = rowsByDay.get(day);
    const editable = entry ? isTimeEditableAttendanceType(entry.attendanceType) : false;
    const baseStyle = editable ? STYLE.body : STYLE.disabled;
    const durationStyle = editable ? STYLE.total : STYLE.disabled;
    const noteStyle = editable ? STYLE.note : STYLE.disabled;
    const dayStyle = getWeekendStyle(entry);
    const typeLabel = entry ? getAttendanceTypeLabel(entry.attendanceType, 'jp') : '';

    mergeBy(rowNumber, 1, rowNumber, 2, entry ? entry.day : '', dayStyle);
    mergeBy(rowNumber, 3, rowNumber, 4, entry ? dayToJpWeekday(entry.date) : '', baseStyle);
    mergeBy(rowNumber, 5, rowNumber, 8, typeLabel, baseStyle);
    mergeBy(rowNumber, 9, rowNumber, 11, editable ? timeOrDash(entry?.timecardIn) : '--:--', baseStyle);
    mergeBy(rowNumber, 12, rowNumber, 14, editable ? timeOrDash(entry?.timecardOut) : '--:--', baseStyle);
    mergeBy(rowNumber, 15, rowNumber, 17, editable ? timeOrDash(entry?.workStart) : '--:--', baseStyle);
    mergeBy(rowNumber, 18, rowNumber, 20, editable ? timeOrDash(entry?.workEnd) : '--:--', baseStyle);
    mergeBy(rowNumber, 21, rowNumber, 23, entry ? minutes(entry.basicMinutes) : '', durationStyle);
    mergeBy(rowNumber, 24, rowNumber, 26, entry ? minutes(entry.overtimeMinutes) : '', durationStyle);
    mergeBy(rowNumber, 27, rowNumber, 29, entry ? minutes(entry.nightMinutes) : '', durationStyle);
    mergeBy(rowNumber, 30, rowNumber, 31, entry ? minutes(entry.totalMinutes) : '', durationStyle);
    mergeBy(rowNumber, 32, rowNumber, 35, entry?.note || '', noteStyle);
  }

  mergeBy(totalRow, 1, totalRow, 20, '合計', STYLE.totalLabel);
  mergeBy(totalRow, 21, totalRow, 23, minutes(summary.basicMinutes), STYLE.total);
  mergeBy(totalRow, 24, totalRow, 26, minutes(summary.overtimeMinutes), STYLE.total);
  mergeBy(totalRow, 27, totalRow, 29, minutes(summary.nightMinutes), STYLE.total);
  mergeBy(totalRow, 30, totalRow, 31, minutes(summary.totalMinutes), STYLE.total);
  mergeBy(totalRow, 32, totalRow, 35, '', STYLE.note);

  const rowHeights = new Map<number, number>([
    [1, 26],
    [3, 22],
    [5, 22],
    [6, 22],
    [7, 22],
    [8, 22],
    [10, 26],
    [11, 24],
    [12, 24],
    [44, 24]
  ]);
  for (let row = 13; row <= 43; row += 1) rowHeights.set(row, 22);

  const cols = [
    [1, 2, 4.2], [3, 4, 4.6], [5, 8, 7.6], [9, 20, 7.4], [21, 31, 6.8], [32, 35, 12.2],
    [36, 36, 2.2], [37, 37, 18], [38, 38, 9], [39, 39, 4], [40, 40, 9]
  ];

  const sheetRows: string[] = [];
  for (let row = 1; row <= totalRow; row += 1) {
    const height = rowHeights.get(row);
    const attrs = height ? ` r="${row}" ht="${height}" customHeight="1"` : ` r="${row}"`;
    const rowCells: string[] = [];
    for (let col = 1; col <= maxCol; col += 1) {
      const cell = cells.get(cellRef(row, col));
      if (cell) rowCells.push(renderCell(row, col, cell));
    }
    sheetRows.push(`<row${attrs}>${rowCells.join('')}</row>`);
  }

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetViews><sheetView workbookViewId="0"><pane ySplit="12" topLeftCell="A13" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>${cols.map(([min, max, width]) => `<col min="${min}" max="${max}" width="${width}" customWidth="1"/>`).join('')}</cols>
  <sheetData>${sheetRows.join('')}</sheetData>
  <mergeCells count="${merges.length}">${merges.map((ref) => `<mergeCell ref="${ref}"/>`).join('')}</mergeCells>
  <dataValidations count="1"><dataValidation type="list" allowBlank="1" showErrorMessage="1" sqref="E13:H43"><formula1>$AK$14:$AK$19</formula1></dataValidation></dataValidations>
  <pageMargins left="0.3" right="0.3" top="0.5" bottom="0.5" header="0.3" footer="0.3"/>
</worksheet>`;
}

function buildStylesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="5">
    <font><sz val="10"/><name val="Arial"/><family val="2"/></font>
    <font><b/><sz val="10"/><name val="Arial"/><family val="2"/></font>
    <font><b/><sz val="16"/><name val="Arial"/><family val="2"/></font>
    <font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Arial"/><family val="2"/></font>
    <font><sz val="10"/><color rgb="FF666666"/><name val="Arial"/><family val="2"/></font>
  </fonts>
  <fills count="9">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFFFFF"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFCCFFFF"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFFF99"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFE7E7E7"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFEAF2FF"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF293DFF"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFF2222"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border><left style="thin"><color rgb="FFB7C9C9"/></left><right style="thin"><color rgb="FFB7C9C9"/></right><top style="thin"><color rgb="FFB7C9C9"/></top><bottom style="thin"><color rgb="FFB7C9C9"/></bottom><diagonal/></border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="18">
    <xf numFmtId="0" fontId="0" fillId="2" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="2" borderId="0" xfId="0" applyFont="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="2" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="6" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="left" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="2" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="1" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="2" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="7" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="8" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="4" fillId="5" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="5" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="2" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment horizontal="left" vertical="center"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
}

function buildWorkbookXml(sheetName: string) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="${xml(sheetName)}" sheetId="1" r:id="rId1"/></sheets>
</workbook>`;
}

function buildWorkbookRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
}

function buildRootRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
}

function buildContentTypesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;
}

function buildCorePropsXml() {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:creator>VIORA Admin</dc:creator>
  <cp:lastModifiedBy>VIORA Admin</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified>
</cp:coreProperties>`;
}

function buildAppPropsXml(sheetName: string) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>VIORA Admin</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant></vt:vector></HeadingPairs>
  <TitlesOfParts><vt:vector size="1" baseType="lpstr"><vt:lpstr>${xml(sheetName)}</vt:lpstr></vt:vector></TitlesOfParts>
</Properties>`;
}

function stringToBytes(value: string) {
  return encoder.encode(value);
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(data: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of data) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date = new Date()) {
  const year = Math.max(1980, date.getFullYear());
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { dosTime, dosDate };
}

function writeUint16(target: Uint8Array, offset: number, value: number) {
  target[offset] = value & 0xff;
  target[offset + 1] = (value >>> 8) & 0xff;
}

function writeUint32(target: Uint8Array, offset: number, value: number) {
  target[offset] = value & 0xff;
  target[offset + 1] = (value >>> 8) & 0xff;
  target[offset + 2] = (value >>> 16) & 0xff;
  target[offset + 3] = (value >>> 24) & 0xff;
}

function createZip(entries: ZipFileEntry[]) {
  const now = dosDateTime();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;

  entries.forEach((entry) => {
    const nameBytes = stringToBytes(entry.name);
    const crc = crc32(entry.data);
    const local = new Uint8Array(30 + nameBytes.length);
    writeUint32(local, 0, 0x04034b50);
    writeUint16(local, 4, 20);
    writeUint16(local, 6, 0x0800);
    writeUint16(local, 8, 0);
    writeUint16(local, 10, now.dosTime);
    writeUint16(local, 12, now.dosDate);
    writeUint32(local, 14, crc);
    writeUint32(local, 18, entry.data.length);
    writeUint32(local, 22, entry.data.length);
    writeUint16(local, 26, nameBytes.length);
    writeUint16(local, 28, 0);
    local.set(nameBytes, 30);
    localParts.push(local, entry.data);

    const central = new Uint8Array(46 + nameBytes.length);
    writeUint32(central, 0, 0x02014b50);
    writeUint16(central, 4, 20);
    writeUint16(central, 6, 20);
    writeUint16(central, 8, 0x0800);
    writeUint16(central, 10, 0);
    writeUint16(central, 12, now.dosTime);
    writeUint16(central, 14, now.dosDate);
    writeUint32(central, 16, crc);
    writeUint32(central, 20, entry.data.length);
    writeUint32(central, 24, entry.data.length);
    writeUint16(central, 28, nameBytes.length);
    writeUint16(central, 30, 0);
    writeUint16(central, 32, 0);
    writeUint16(central, 34, 0);
    writeUint16(central, 36, 0);
    writeUint32(central, 38, 0);
    writeUint32(central, 42, offset);
    central.set(nameBytes, 46);
    centralParts.push(central);

    offset += local.length + entry.data.length;
  });

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const end = new Uint8Array(22);
  writeUint32(end, 0, 0x06054b50);
  writeUint16(end, 4, 0);
  writeUint16(end, 6, 0);
  writeUint16(end, 8, entries.length);
  writeUint16(end, 10, entries.length);
  writeUint32(end, 12, centralSize);
  writeUint32(end, 16, offset);
  writeUint16(end, 20, 0);

  const totalSize = offset + centralSize + end.length;
  const zip = new Uint8Array(totalSize);
  let cursor = 0;
  [...localParts, ...centralParts, end].forEach((part) => {
    zip.set(part, cursor);
    cursor += part.length;
  });
  return zip;
}

export function buildAttendanceXlsxBytes(payload: AttendancePayload) {
  const sheetName = `${payload.year}${pad(payload.month)}勤怠管理`;
  const files: ZipFileEntry[] = [
    { name: '[Content_Types].xml', data: stringToBytes(buildContentTypesXml()) },
    { name: '_rels/.rels', data: stringToBytes(buildRootRelsXml()) },
    { name: 'docProps/core.xml', data: stringToBytes(buildCorePropsXml()) },
    { name: 'docProps/app.xml', data: stringToBytes(buildAppPropsXml(sheetName)) },
    { name: 'xl/workbook.xml', data: stringToBytes(buildWorkbookXml(sheetName)) },
    { name: 'xl/_rels/workbook.xml.rels', data: stringToBytes(buildWorkbookRelsXml()) },
    { name: 'xl/styles.xml', data: stringToBytes(buildStylesXml()) },
    { name: 'xl/worksheets/sheet1.xml', data: stringToBytes(buildSheetXml(payload)) }
  ];
  return createZip(files);
}

export function downloadAttendanceXlsx(payload: AttendancePayload) {
  const workbook = buildAttendanceXlsxBytes(payload);
  const blob = new Blob([workbook], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const employeeNo = payload.employee.employeeNo || 'employee';
  anchor.href = url;
  anchor.download = `${employeeNo}_${payload.year}${pad(payload.month)}_勤怠管理表.xlsx`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
