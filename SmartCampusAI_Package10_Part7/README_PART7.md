# SmartCampusAI Package 10 - Part 7

## What this part adds

1. Secure student resume upload/download
2. CSV placement-drive import for HOD/Admin
3. Automated application-deadline notifications
4. Automated interview reminders
5. Idempotent notification events
6. Worker execution history
7. Student resume UI
8. Admin placement-drive import UI

## Database

Run:

database/schema_part7.sql

## Backend integration

Add to your Express app:

```js
app.use(
  "/api/resume",
  require("./routes/resumeRoutes")
);

app.use(
  "/api/placement-import",
  require("./routes/placementImportRoutes")
);
```

## Worker

The worker is intentionally a separate process.

Run:

```bash
node backend/jobs/startPlacementWorker.js
```

It checks every 15 minutes by default.

Change the interval with:

```env
PLACEMENT_WORKER_INTERVAL_MS=900000
```

900000 ms = 15 minutes.

## Resume upload

POST:

`/api/resume/mine`

Form-data field:

`resume`

Accepted:
- PDF
- DOC
- DOCX

Default maximum size:
5 MB.

Configure:

```env
RESUME_UPLOAD_DIR=./storage/resumes
RESUME_MAX_BYTES=5242880
```

The API stores the file path in the placement profile.

## CSV import

POST:

`/api/placement-import/drives/csv`

Form-data:

`file`

Example:

```csv
company_name,role_title,package_lpa,application_deadline,drive_status
Example Technologies,Software Engineer,8.5,2026-09-10 23:59:00,Open
Example Cloud,Cloud Intern,5.0,2026-09-15 18:00:00,Open
```

Only HOD/Admin roles can import.

## Important integration note

The worker queries the Package 10 placement tables:

- placement_drive_applications
- placement_drives
- placement_companies
- placement_interviews

If your earlier Package 10 implementation uses different column/table
names, update the worker queries to match those exact schemas.

The worker uses an event key table so repeated executions do not
create duplicate notifications for the same reminder.

## Security

Resume downloads use the authenticated student's own user ID.
The server validates the stored path against the configured resume
directory before sending the file.

Do not expose the resume storage directory as a public static folder.

## UI

Student:

frontend/pages/student/resume.html

Admin:

frontend/pages/admin/placement-import.html

Next:
Package 10 Part 8 can add placement offer management, offer-letter
metadata, joining-status tracking, and final placement reports.
