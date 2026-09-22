# Class Portal

A lightweight static site for hosting lesson materials and class announcements,
built to sync automatically with Google Drive, YouTube, and Google Sheets so
the site owner never has to touch code — only drop files into Drive folders,
paste video links, and send emails for announcements.

## Architecture

- **Static site** (HTML/CSS/vanilla JS), deployed via GitHub Pages, built
  with GitHub Actions.
- **File hosting**: Google Drive. The site reads folder contents live via a
  small Google Apps Script Web App (`folder_lister.gs`) — NOT the Drive API
  directly, since Drive's `files.list` requires OAuth and does not work with
  a bare API key, even for fully public folders. The Apps Script runs under
  the site owner's own Google account permissions instead, and returns plain
  JSON that the site fetches.
- **Dynamic folder discovery**: "Lessons" pages don't hardcode each Level —
  they ask the Apps Script what subfolders currently exist under a container
  folder ID, so creating a new "Level 4" folder in Drive makes it appear on
  the site automatically, no code change needed.
- **Video resources**: a Drive folder can contain a Google Doc whose entire
  content is a YouTube link (upload as "Unlisted", not "Private"). The Apps
  Script detects this pattern and the site renders it as a "▶️ Watch" entry
  that opens YouTube directly, instead of a file download. This keeps large
  video off the free 15GB Drive storage quota.
- **Announcements**: sent as emails to Gmail "+tag" addresses (e.g.
  `you+year9l123@gmail.com`), parsed by a second Apps Script
  (`noticeboard_script.gs`) into a Google Sheet, which the site reads live as
  a published CSV. Announcements auto-expire on 1st July by default, or a
  custom date via `[expires:YYYY-MM-DD]` in the email subject. Emails sent to
  an unrecognised class tag trigger a warning email back to the sender
  instead of silently failing.
- **Site structure**: defined once as a tree in `js/config.js` (`CONFIG.NAV`).
  Three generic page templates (`hub.html`, `page.html`, `noticeboard.html`)
  render any part of that tree — adding a new year, class, or folder only
  requires editing `config.js` or Drive itself, never adding new HTML files.
- **No API keys, no secrets, no billing account**: everything runs on Google
  Apps Script (owner-authenticated) and public GitHub Pages hosting, so there
  is nothing sensitive to protect in the repo and nothing to pay for.

## File overview

| File | Purpose |
|---|---|
| `index.html` | Homepage — year navigation, live general noticeboard, small Tetris game |
| `hub.html` | Generic navigation page; also handles dynamic Lessons-folder discovery (`?node=key`) |
| `page.html` | Generic file-listing page, including video-link detection (`?node=key` or `?folderId=`) |
| `noticeboard.html` | Generic announcements page, reads the Sheet live (`?node=key`) |
| `js/config.js` | Single source of truth: Apps Script URLs, folder IDs, full site map |
| `css/theme.css` | Site-wide theme (dark, dyslexia-friendly font, emerald accents) |
| `folder_lister.gs` | Apps Script Web App: lists a Drive folder's contents and detects video links |
| `noticeboard_script.gs` | Apps Script: turns tagged emails into Sheet rows with auto-expiry and typo alerts |
| `.github/workflows/deploy.yml` | CI/CD: builds and deploys the site to GitHub Pages on every push |

## Setup

1. Create the Drive folder structure (Year → Category → Lessons/Resources/Study
   Boards) and share the root folder as "Anyone with the link: Viewer" —
   this cascades to every subfolder.
2. Deploy `folder_lister.gs` as an Apps Script Web App (Execute as: Me,
   Access: Anyone) and paste its `/exec` URL into `CONFIG.DRIVE_LISTER_URL`
   in `js/config.js`.
3. Collect each container folder's ID (Lessons, Resources, Study Boards per
   class) from its Drive URL and paste them into `CONFIG.FOLDERS`.
4. Create a Google Sheet ("Class Announcements") with a `Master` tab and the
   headers `Timestamp | ClassCode | Title | Message | DatePosted | ExpiryDate | Remove`.
   Publish it to the web as CSV and paste that URL into `CONFIG.SHEET_CSV_URL`.
5. Deploy `noticeboard_script.gs` as a regular Apps Script project (no Web
   App needed), fill in `SHEET_ID`, and set up two time-driven triggers:
   `checkForAnnouncements` every 10 minutes, `cleanupOldRows` once daily.
6. To add a video: upload it to YouTube as "Unlisted", then create a Google
   Doc in the relevant Drive folder containing only that video's link.
7. Enable GitHub Pages (Settings → Pages → Source: GitHub Actions) and push
   to `main` — the site deploys automatically.

## Notes for future changes

- **Editing either `.gs` script**: after changing the code, you must create
  a **new version** of the existing deployment (Deploy → Manage deployments
  → pencil icon → Version: New version → Deploy) for the live URL to pick up
  the change. Creating a brand-new deployment instead generates a different
  URL and will silently break the site until `config.js` is updated to match.
- **Adding a new Year or top-level category**: this is a real structural
  change and needs a `NAV` edit in `config.js` — it's the one case dynamic
  discovery doesn't cover.
