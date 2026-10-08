/**
 * SITE CONFIG
 * -----------
 * The whole site's structure lives in NAV below. To add a new year,
 * class, or folder, edit NAV — no new HTML files needed.
 *
 * Folder contents are read via a Google Apps Script Web App (folder_lister.gs),
 * NOT the Drive API directly — Drive's files.list requires OAuth and doesn't
 * work with a bare API key, even for fully public folders.
 *
 * Node types:
 *   "hub"    - a page of buttons linking to child nodes (default if no type given)
 *   "files"  - a page listing files from a Drive folder (needs `folder`)
 *   "notice" - a page listing announcements for a class (needs `noticeClass`)
 *   "dynamic"- a page that auto-discovers subfolders from Drive (needs `folder`)
 */

const CONFIG = {
  DRIVE_LISTER_URL: "https://script.google.com/macros/s/AKfycbyximrPRpH-X9k2NSGsOoWM0VEXWjl_lIvHo7kiDq6mZGTsH8h8aG9qYkrCRZhDu3Bi/exec",

  SHEET_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTKJyAT9ZP41j4vSSXPe7zVc609KLAVwBNsYYE3iJgQfjT8J1MA6WDvSTrWgYdZ8uyFY5GIyrUyaaUD/pub?gid=0&single=true&output=csv",

  FOLDERS: {
    year9_lessons: "1iacUd-BK9WZfdH4yeygdMRHIBN9BaH97",
    year9_resources: "1HbFZAm-MoBlU9uyChjbXXGa7mAxpVrHJ",
    year9_studyboards: "1kvtBOwSGEq-OG0-9LV9GnkdY6uV1w_DQ",
    year10_lessons: "1Rfz2U_dPyDAAaqvqC7dDXcwf4h5lQUX7",
    year10_resources: "1KMLSDX5ODiEmK2_K7zTwslLCYL7notji",
    year10_studyboards: "1rj7dAk9VhhmArYtrDNk7_H2Rd3Fp_hn8"
  },

  NAV: {
    home: {
      title: "Ms Kylie Buhagiar", crumb: "",
      children: ["year9", "year10"]
    },

    year9: {
      title: "Year 9 Social Studies - General", crumb: "Year 9 Social Studies - General",
      children: ["year9_lessons", "year9_resources", "year9_noticeboard", "year9_studyboards"]
    },
    year9_lessons: {
      title: "Lessons", type: "dynamic", crumb: "Year 9 Social Studies - General &rsaquo; Lessons",
      folder: "year9_lessons"
    },
    year9_resources: { title: "Resources", type: "files", crumb: "Year 9 Social Studies - General &rsaquo; Resources", folder: "year9_resources" },
    year9_noticeboard: { title: "Noticeboard", type: "notice", crumb: "Year 9 Social Studies - General &rsaquo; Noticeboard", noticeClass: "year9l123" },
    year9_studyboards: { title: "Study Boards", type: "files", crumb: "Year 9 Social Studies - General &rsaquo; Study Boards", folder: "year9_studyboards" },

    year10: {
      title: "Year 10 Social Studies - General", crumb: "Year 10 Social Studies - General",
      children: ["year10_lessons", "year10_resources", "year10_noticeboard", "year10_studyboards"]
    },
    year10_lessons: {
      title: "Lessons", type: "dynamic", crumb: "Year 10 Social Studies - General &rsaquo; Lessons",
      folder: "year10_lessons"
    },
    year10_resources: { title: "Resources", type: "files", crumb: "Year 10 Social Studies - General &rsaquo; Resources", folder: "year10_resources" },
    year10_noticeboard: { title: "Noticeboard", type: "notice", crumb: "Year 10 Social Studies - General &rsaquo; Noticeboard", noticeClass: "year10l123" },
    year10_studyboards: { title: "Study Boards", type: "files", crumb: "Year 10 Social Studies - General &rsaquo; Study Boards", folder: "year10_studyboards" }
  }
};
