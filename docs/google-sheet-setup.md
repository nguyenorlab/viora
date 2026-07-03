# Google Sheet setup for VIORA Attendance Admin

Frontend không ghi trực tiếp vào Google Sheet. Luồng đúng là:

```txt
React Admin -> Google Apps Script Web App -> Google Sheet
```

## 1. Tạo Google Sheet

Tạo một Google Sheet mới. Bạn có thể đổi tên thành `VIORA Attendance Database`.

Copy Spreadsheet ID từ URL của Google Sheet:

```txt
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

## 2. Tạo Apps Script

### Cách A: tạo script gắn với Google Sheet

Trong Google Sheet, vào:

```txt
Extensions -> Apps Script
```

Nếu mở được, paste toàn bộ nội dung trong:

```txt
google-apps-script/Code.gs
```

### Cách B: nếu Extensions -> Apps Script bị lỗi

Tạo Apps Script độc lập từ trang Apps Script dashboard, sau đó paste toàn bộ nội dung trong:

```txt
google-apps-script/Code.gs
```

Với cách này, bắt buộc cấu hình `SPREADSHEET_ID` theo bước 3 bên dưới.

## 3. Cấu hình Script Properties

Trong Apps Script editor, vào:

```txt
Project Settings -> Script Properties -> Add script property
```

Thêm:

```txt
SPREADSHEET_ID=<ID Google Sheet của bạn>
ADMIN_TOKEN=<một chuỗi bí mật tự đặt, ví dụ viora-admin-2026>
```

`ADMIN_TOKEN` là tùy chọn nhưng nên dùng. Giá trị này phải trùng với `VITE_ADMIN_ACCESS_TOKEN` trong frontend.

## 4. Khởi tạo sheet dữ liệu

Trong Apps Script editor, chọn function:

```txt
setupVioraAttendanceSheets
```

Bấm `Run` và cấp quyền truy cập Google Sheet.

Script sẽ tự tạo các sheet:

```txt
Employees
Attendance
Settings
Holidays
AuditLogs
```

## 5. Deploy Apps Script thành Web App

Trong Apps Script editor:

```txt
Deploy -> New deployment -> Select type: Web app
```

Cấu hình:

```txt
Execute as: Me
Who has access: Anyone with the link
```

Sau đó copy Web App URL.

## 6. Cấu hình frontend

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Điền:

```txt
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/xxx/exec
VITE_ADMIN_ACCESS_TOKEN=<ADMIN_TOKEN đã đặt ở Apps Script>
```

Chạy lại frontend:

```bash
npm run dev
```

## 7. Kiểm tra API

Mở URL Web App trên trình duyệt với tham số health:

```txt
<Web App URL>?action=health&token=<ADMIN_TOKEN>
```

Nếu đúng, bạn sẽ thấy JSON có `ok: true`.


## Troubleshooting Web App URL

If `?action=health&token=...` does not return JSON, check these points:

1. Use the Copy button next to the Web App URL. Do not manually copy the shortened text shown in the dialog.
2. Run `testHealth` in Apps Script. It should return `{ ok: true }`.
3. Run `testSpreadsheetAccess` in Apps Script. It should return the spreadsheet name and ID.
4. If you edit `Code.gs`, update the deployment with `Manage deployments -> Edit -> Version -> New version -> Deploy`.
5. Script Properties do not require a new deployment, but code changes do.

## Troubleshooting: Health OK but data is not saved

If this URL works:

```txt
<Web App URL>?action=health&token=<ADMIN_TOKEN>
```

but attendance rows are not written to Google Sheet, test sheet write access directly from the browser:

```txt
<Web App URL>?action=debugWrite&token=<ADMIN_TOKEN>&message=browser-test
```

Expected response:

```json
{
  "ok": true,
  "message": "Debug row written to AuditLogs"
}
```

Then check the `AuditLogs` sheet. If no row appears, the problem is in `SPREADSHEET_ID`, sheet permission, Apps Script authorization, or deployment version.

Next test a sample attendance save:

```txt
<Web App URL>?action=testSaveSample&token=<ADMIN_TOKEN>&employeeNo=TEST001&year=2026&month=6
```

Expected response:

```json
{
  "ok": true,
  "message": "Attendance saved"
}
```

Then check these sheets:

```txt
Employees
Attendance
Settings
AuditLogs
```

After changing `Code.gs`, always update the Web App deployment:

```txt
Deploy → Manage deployments → Edit → Version: New version → Deploy
```

If `.env` is changed in the React project, restart the dev server:

```bash
npm run dev
```

The frontend uses POST in `no-cors` mode and then verifies the save by loading data back through JSONP. This avoids browser CORS/preflight issues with Google Apps Script.

## v5: frontend sync troubleshooting

If these URLs work:

```txt
?action=health&token=<ADMIN_TOKEN>
?action=debugWrite&token=<ADMIN_TOKEN>&message=browser-test
?action=testSaveSample&token=<ADMIN_TOKEN>&employeeNo=TEST001&year=2026&month=6
```

but the React admin page cannot sync, use v5 or later. v5 saves attendance through chunked JSONP requests instead of `fetch(..., no-cors)`. After copying the new `Code.gs`, go to:

```txt
Deploy -> Manage deployments -> Edit -> Version -> New version -> Deploy
```

Then restart the Vite dev server so `.env` is reloaded:

```bash
npm run dev
```

## v8: ổn định khi deploy frontend

Bản v8 thêm nút `Kiểm tra kết nối Sheet` trong trang `/admin`. Nút này gọi `?action=health` bằng cùng cấu hình mà nút `Load from Sheet` đang dùng, nên có thể dùng để xác định lỗi nằm ở frontend config hay ở Apps Script deployment.

Các điểm cần lưu ý khi deploy:

1. Luôn dùng Web App URL kết thúc bằng `/exec`. Không dùng URL test deployment kết thúc bằng `/dev` cho production.
2. Sau khi sửa `Code.gs`, phải vào `Deploy -> Manage deployments -> Edit -> Version -> New version -> Deploy`.
3. Sau khi sửa `.env`, phải restart dev server. Khi deploy lên Vercel/Cloudflare Pages, phải cấu hình environment variables trên dashboard hosting và redeploy.
4. Nếu trình duyệt thường bị lỗi nhưng Incognito chạy được, nguyên nhân thường là session Google nhiều tài khoản, extension/ad blocker, hoặc deployment access chưa mở đủ. Nên cấu hình Web App là `Execute as: Me` và `Who has access: Anyone` hoặc `Anyone with the link` nếu tài khoản cho phép.
5. Không xóa deployment đang dùng. Nếu tạo deployment mới, Web App URL có thể thay đổi và cần cập nhật lại `VITE_GOOGLE_SCRIPT_URL`.

Bản v8 cũng retry JSONP request, thêm cache-busting parameter và báo lỗi chi tiết hơn khi không tải được script từ `script.google.com`.
