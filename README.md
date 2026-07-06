# VIORA Website + Attendance Admin

Project được phát triển từ React + TypeScript + styled-components, backend nhẹ bằng Vercel Function và Google Sheets API.
Gồm Homepage và Admin

### Admin

Truy cập:

```txt
#/admin
```

Đã có:
- Phân quyền: `superAdmin`, `admin`, `viewer`
- Form chấm công theo mẫu `勤怠管理表`
- Đồng bộ Google Sheet qua `/api/attendance` và Google Sheets API
- Xuất Excel `.xlsx`
- Quản lý nhân viên
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
cp .env.example .env
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




