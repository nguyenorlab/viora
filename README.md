# VIORA Website + Attendance Admin v10

Project được phát triển từ `viora-landing-page-v2`, dùng React + TypeScript + styled-components, backend nhẹ bằng Vercel Function và Google Sheets API.

## Chức năng chính

### Landing page

- Light mode / dark mode
- Chọn ngôn ngữ VI / EN / JP
- Không dùng Tailwind CSS
- Không dùng màu gradient

### Admin

Truy cập:

```txt
/admin
```

Đã có:

- Đăng nhập admin
- Super admin bootstrap qua biến môi trường
- Phân quyền: `superAdmin`, `admin`, `viewer`
- Form chấm công theo mẫu `勤怠管理表`
- Đồng bộ Google Sheet qua `/api/attendance` và Google Sheets API
- Xuất Excel `.xlsx`
- Quản lý nhân viên: thêm / sửa / xoá
- Nhân viên có trường `Ngày vào công ty` để tính phép
- Quản lý ngày phép:
  - Số ngày phép còn lại
  - Số ngày phép đã sử dụng
  - Số ngày phép sắp hết hạn
  - Ngày hết hạn gần nhất
  - Bảng grant phép theo từng năm
- Quản lý tài khoản bởi super admin

## Cách tính phép

- Nhân viên mới vào công ty có 12 ngày phép.
- Mỗi năm sau ngày vào công ty được cộng thêm 2 ngày.
- Số ngày phép cấp mỗi năm không vượt quá 20 ngày.
- Mỗi đợt phép có hạn sử dụng 2 năm tính từ ngày cấp, deadline là ngày trước cùng kỳ sau 2 năm.
- Ngày đã sử dụng được tính từ các dòng chấm công có `attendanceType = paidLeave`.
- Hệ thống phân bổ ngày nghỉ phép theo nguyên tắc FIFO: dùng phần phép sắp hết hạn trước.

## Cài đặt local

```bash
npm install
cp .env.example .env.local
```

Điền `.env.local`, sau đó chạy bằng Vercel CLI để có cả frontend và API:

```bash
npm install -g vercel
vercel login
vercel dev
```

Mở:

```txt
http://localhost:3000/admin
```

## Biến môi trường quan trọng

```txt
VITE_ATTENDANCE_API_BASE_URL=/api/attendance
GOOGLE_SPREADSHEET_ID=your-google-sheet-id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
SESSION_SECRET=change-this-long-random-session-secret
SUPER_ADMIN_USERNAME=superadmin
SUPER_ADMIN_PASSWORD=change-this-super-admin-password
ADMIN_ALLOWED_ORIGIN=http://localhost:3000
```

Super admin đầu tiên đăng nhập bằng:

```txt
SUPER_ADMIN_USERNAME
SUPER_ADMIN_PASSWORD
```

Sau đó tạo thêm tài khoản trong mục **Phân quyền tài khoản**.

## Google Sheet database

Kiến trúc:

```txt
React Admin -> Vercel Function /api/attendance -> Google Sheets API -> Google Sheet
```

Các sheet sẽ được tạo / chuẩn hoá header tự động:

```txt
Employees
Attendance
Settings
Holidays
Users
AuditLogs
```

Cần share Google Sheet cho service account email với quyền **Editor**.

## Build production

```bash
npm run build
```

Khi deploy lên Vercel, thêm các env variables ở Project Settings rồi redeploy.

## v11 updates

- Admin giao diện mới có sidebar menu để chuyển nhanh giữa Tổng quan, Chấm công, Ngày phép, Nhân viên và Tài khoản.
- Các bảng danh sách dài đã có phân trang: ngày phép, nhân viên và tài khoản.
- Quản lý ngày phép được lưu xuống Google Sheet mới `LeaveBalances`. Backend sẽ tự tạo sheet này và cập nhật khi tải/tính ngày phép, lưu chấm công hoặc lưu nhân viên.
- `LeaveBalances` lưu theo từng nhân viên với các trường: grant date, granted days, used days, remaining days, expiry date, status, summary remaining/used/expiring và calculatedAt.

Sau khi cập nhật, chạy lại backend API bằng Vercel Function. Khi API nhận request lần đầu, nó sẽ tự tạo sheet `LeaveBalances` nếu chưa tồn tại.

## v12 updates

- Reduced Google Sheets API read pressure with schema caching, short-lived record caching, and batched read requests.
- The backend no longer persists leave-balance rows during every read/load operation; leave balances are persisted when attendance or employee data is saved.
- Added loading indicators for connection check, load from Google Sheets, and sync to Google Sheets.
- Added employee selector in the employee information panel. Selecting a name from Employees fills employee number, department, join date, email, and status automatically.

Optional backend env vars for quota tuning:

```txt
SHEETS_SCHEMA_CACHE_MS=300000
SHEETS_READ_CACHE_MS=20000
```

If Google Sheets API still returns quota errors under heavier usage, increase `SHEETS_READ_CACHE_MS` slightly, or move frequently-read data such as Employees to a dedicated database later.

## v13 updates

- Trang admin không tự load dữ liệu nhân viên mặc định khi mở trang.
- Năm/tháng mặc định lấy theo thời điểm hiện tại; Select nhân viên mặc định là `-- Select Employees --`.
- Chỉ khi chọn nhân viên mới tải hồ sơ nhân viên từ sheet `Employees` để fill thông tin nhân viên.
- Chỉ khi bấm `Load from Sheet` mới tải dữ liệu chấm công, tổng hợp tháng và ngày phép.
- Thêm loading overlay toàn trang cho thao tác kiểm tra kết nối, chọn nhân viên, tải dữ liệu và đồng bộ dữ liệu.
- Message chuyển sang toast góc dưới bên trái: màu xanh khi thành công, màu đỏ khi lỗi; success tự ẩn sau 3 giây, error giữ lại cho đến khi đóng.
- Thêm endpoint backend `getEmployee` để lấy thông tin một nhân viên theo `employeeNo`.
