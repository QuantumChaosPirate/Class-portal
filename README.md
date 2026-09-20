# Class Portal

A lightweight static site for hosting lesson materials and class announcements,
built to sync automatically with Google Drive and Google Sheets so the site
owner never has to touch code — only drop files into Drive folders and send
emails for announcements.

## Architecture

- **Static site** (HTML/CSS/vanilla JS), deployed via GitHub Pages.
- **File hosting**: Google Drive. The site reads folder contents live via the
  Drive API — files added or removed in Drive appear on the site automatically,
  no rebuild needed.
- **Announcements**: sent as emails to Gmail "+tag" addresses, parsed by a
  Google Apps Script into a Google Sheet, which the site reads live as a
  published CSV. Announcements auto-expire on a configurable date.
- **Site structure**: defined once as a tree in `js/config.js` (`CONFIG.NAV`).
  Three generic page templates (`hub.html`, `page.html`, `noticeboard.html`)
  render any part of that tree — adding a new year, class, or folder only
  requires editing `config.js`, never adding new HTML files.
- **Secrets**: the Drive API key is injected at deploy time via GitHub Actions
  from an encrypted repo Secret — it never appears in the committed source.

## File overview

| File | Purpose |
|---|---|
| `index.html` | Homepage — year navigation, live general noticeboard, small Tetris game |
| `hub.html` | Generic navigation page, renders buttons for any NAV branch (`?node=key`) |
| `page.html` | Generic file-listing page, reads a Drive folder live (`?node=key`) |
| `noticeboard.html` | Generic announcements page, reads the Sheet live (`?node=key`) |
| `js/config.js` | Single source of truth: API key, folder IDs, full site map |
| `css/theme.css` | Site-wide theme (dark, dyslexia-friendly font, emerald accents) |
| `noticeboard_script.gs` | Apps Script: turns tagged emails into Sheet rows with auto-expiry |
| `.github/workflows/deploy.yml` | CI/CD: injects the API key secret and deploys to Pages |

## Setup

1. Create the Drive folder structure and note each folder's ID (from its URL).
2. Create a Google Cloud project, enable the Drive API, generate an API key,
   restrict it to the Drive API and this site's domain.
3. Add that key as a GitHub repo Secret named `DRIVE_API_KEY`.
4. Fill in the folder IDs and the published Sheet CSV URL in `js/config.js`
   (the API key field stays as the `__DRIVE_API_KEY__` placeholder — do not
   paste the real key here).
5. Set up the Sheet ("Master" tab, per `noticeboard_script.gs`'s header
   comment), publish it to the web as CSV, and paste that URL into `config.js`.
6. Paste `noticeboard_script.gs` into Apps Script on the sending Gmail
   account, fill in `SHEET_ID`, and set up the two time-driven triggers
   described in its header comment.
7. Enable GitHub Pages (Settings > Pages > Source: GitHub Actions).
8. Push to `main` — the site deploys automatically.
