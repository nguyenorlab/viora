# Google Sheets API Backend Setup

This version replaces the browser -> Google Apps Script flow with:

```txt
React Admin -> Vercel Function /api/attendance -> Google Sheets API -> Google Sheet
```

## Required Google setup

1. Create or select a Google Cloud Project.
2. Enable **Google Sheets API**.
3. Create a Service Account.
4. Create a JSON key for that Service Account.
5. Copy the service account email, for example:

```txt
viora-attendance-api@your-project.iam.gserviceaccount.com
```

6. Open the attendance Google Sheet and share it with that service account email as **Editor**.

## Environment variables

Create `.env.local` for local Vercel dev:

```txt
VITE_ATTENDANCE_API_BASE_URL=/api/attendance
VITE_ADMIN_ACCESS_TOKEN=change-this-admin-token
GOOGLE_SPREADSHEET_ID=your-google-sheet-id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----\n"
ADMIN_API_TOKEN=change-this-admin-token
ADMIN_ALLOWED_ORIGIN=http://localhost:3000
```

`VITE_ADMIN_ACCESS_TOKEN` must match `ADMIN_API_TOKEN`.

Do not commit `.env.local` or the Google JSON key to Git.

## Local dev

Install Vercel CLI if needed:

```bash
npm install -g vercel
vercel login
```

Run:

```bash
npm install
vercel dev
```

Then test:

```txt
http://localhost:3000/api/attendance?action=health&token=change-this-admin-token
```

Expected response:

```json
{
  "ok": true,
  "service": "VIORA Attendance API",
  "version": "sheets-api-v1"
}
```

## Production deploy on Vercel

Set the same environment variables in Vercel Project Settings -> Environment Variables.

For production, set:

```txt
ADMIN_ALLOWED_ORIGIN=https://your-domain.com
```

Then redeploy.

## Data lookup key

Loading attendance data uses this key:

```txt
employeeNo + year + month
```

The employee name and department are not used for lookup; they are loaded back from the Sheet if data is found.

## v11 note: LeaveBalances sheet

Version v11 adds a generated `LeaveBalances` sheet. You do not need to create it manually. The backend will create and normalize it automatically when `/api/attendance` runs. It stores the calculated paid-leave grants for each employee, including granted days, used days, remaining days, expiry date, status, and summary fields.
