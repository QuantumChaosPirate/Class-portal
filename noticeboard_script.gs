/**
 * NOTICEBOARD EMAIL-TO-SHEET SCRIPT
 * ----------------------------------
 * Paste this into script.google.com (New project), attached to the
 * Gmail account your mother sends announcements FROM.
 *
 * SETUP STEPS:
 * 1. Create a Google Sheet called "Class Announcements" with a tab
 *    named exactly "Master" and these headers in row 1:
 *    Timestamp | ClassCode | Title | Message | DatePosted | ExpiryDate | Remove
 * 2. Copy the Sheet's ID from its URL (the long string between /d/ and /edit)
 *    and paste it below as SHEET_ID.
 * 3. Edit CLASS_CODES below to match the +tags you want to use.
 * 4. In Apps Script: Triggers (clock icon) > Add Trigger >
 *    Function: checkForAnnouncements, Event source: Time-driven,
 *    Type: Minutes timer, Every 10 minutes.
 * 5. Run checkForAnnouncements once manually the first time to grant
 *    Gmail + Sheets permissions.
 */

// ==== CONFIG ====
const SHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";
const MASTER_TAB = "Master";

// Map each +tag (lowercase, no spaces) to the class code used in the Sheet
const CLASS_CODES = {
  "year9l123": "year9l123",
  "year9ccp": "year9ccp",
  "year10l123": "year10l123",
  "year10ccp": "year10ccp"
};

// How many days after expiry (or after being ticked "Remove") a row
// stays in the Master sheet before it's permanently deleted.
const CLEANUP_GRACE_DAYS = 1;

// Default expiry: 1st July of the relevant school year.
// If today is after July 1, assume next year's July 1.
function getDefaultExpiry() {
  const now = new Date();
  let year = now.getFullYear();
  const july1ThisYear = new Date(year, 6, 1); // month is 0-indexed, 6 = July
  if (now > july1ThisYear) {
    year += 1;
  }
  return new Date(year, 6, 1);
}

// Allows overriding expiry via [expires:YYYY-MM-DD] anywhere in the subject
function extractExpiryOverride(subject) {
  const match = subject.match(/\[expires:(\d{4}-\d{2}-\d{2})\]/i);
  if (match) {
    const parts = match[1].split("-");
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }
  return null;
}

function checkForAnnouncements() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(MASTER_TAB);
  const threads = GmailApp.search("is:unread"); // scans unread inbox mail

  threads.forEach(thread => {
    const messages = thread.getMessages();
    messages.forEach(message => {
      if (!message.isUnread()) return;

      const toField = (message.getTo() || "").toLowerCase();

      // Find which class tag this was sent to, e.g. yourname+year9l123@gmail.com
      let matchedCode = null;
      for (const tag in CLASS_CODES) {
        if (toField.includes("+" + tag + "@")) {
          matchedCode = CLASS_CODES[tag];
          break;
        }
      }

      // If it LOOKS like a class-board attempt (has a "+something@") but the
      // tag doesn't match any known class code, it's likely a typo — alert
      // her instead of silently dropping the announcement.
      const looksLikeTaggedAttempt = /\+[^@]+@/.test(toField);
      if (!matchedCode && looksLikeTaggedAttempt) {
        const myEmail = Session.getActiveUser().getEmail();
        GmailApp.sendEmail(
          myEmail,
          "⚠️ Noticeboard: unrecognised class address",
          "An announcement email was sent to an address that doesn't match " +
          "any known class code, so it was NOT posted to any noticeboard.\n\n" +
          "To: " + message.getTo() + "\n" +
          "Subject: " + message.getSubject() + "\n\n" +
          "Known tags are: " + Object.keys(CLASS_CODES).join(", ") + "\n\n" +
          "Please check for a typo and resend if needed."
        );
        message.markRead();
        return; // skip logging this one
      }

      if (matchedCode) {
        let rawSubject = message.getSubject() || "(No title)";
        const expiryOverride = extractExpiryOverride(rawSubject);
        const title = rawSubject.replace(/\[expires:\d{4}-\d{2}-\d{2}\]/i, "").trim();
        const body = message.getPlainBody().trim();
        const expiry = expiryOverride || getDefaultExpiry();

        sheet.appendRow([
          new Date(),      // Timestamp
          matchedCode,     // ClassCode
          title,           // Title
          body,            // Message
          new Date(),      // DatePosted
          expiry,          // ExpiryDate
          false             // Remove (checkbox)
        ]);

        message.markRead();
      }
    });
  });
}

/**
 * Permanently deletes rows from the Master tab that are either:
 *  - ticked "Remove", or
 *  - past their ExpiryDate
 * ...for at least CLEANUP_GRACE_DAYS days, so the sheet doesn't grow forever.
 * Set up a second trigger for this: Time-driven > Day timer (e.g. run once a day).
 */
function cleanupOldRows() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(MASTER_TAB);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return; // nothing but the header row

  const data = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  const now = new Date();
  const graceMs = CLEANUP_GRACE_DAYS * 24 * 60 * 60 * 1000;

  // Walk bottom-to-top so deleting rows doesn't shift the indices we still need
  for (let i = data.length - 1; i >= 0; i--) {
    const row = data[i];
    const expiryDate = row[5];   // ExpiryDate column (F)
    const removeFlag = row[6];   // Remove column (G)

    const pastExpiryWithGrace = expiryDate instanceof Date &&
      (now.getTime() - expiryDate.getTime()) > graceMs;

    if (removeFlag === true || pastExpiryWithGrace) {
      sheet.deleteRow(i + 2); // +2 because data starts at row 2 and i is 0-indexed
    }
  }
}
