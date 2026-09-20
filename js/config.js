/**
 * SITE CONFIG
 * -----------
 * The whole site's structure lives in NAV below. To add a new year,
 * class, or folder, edit NAV — no new HTML files needed.
 *
 * Folder contents are read via a Google Apps Script Web App (folder_lister.gs),
 * NOT the Drive API directly — Drive's files.list requires OAuth and doesn't
 * work with a bare API key, even for fully public folders. The Apps Script
 * runs under the site owner's own Google account permissions instead.
 *
 * Node types:
 *   "hub"    - a page of buttons linking to child nodes (default if no type given)
 *   "files"  - a page listing files from a Drive folder (needs `folder`)
 *   "notice" - a page listing announcements for a class (needs `noticeClass`)
 *   "dynamic"- a page that auto-discovers subfolders from Drive (needs `folder`)
 */

const CONFIG = {
  DRIVE_LISTER_URL: "https://script.google.com/macros/s/AKfycby8-Nbx5GS8mIPcw8DOak85f71YygeLmeaS9pyLfQX41JFKQ5RXoOdT4bIEqqaer0pP/exec",

  SHEET_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTKJyAT9ZP41j4vSSXPe7zVc609KLAVwBNsYYE3iJgQfjT8J1MA6WDvSTrWgYdZ8uyFY5GIyrUyaaUD/pub?gid=0&single=true&output=csv",

  FOLDERS: {
    year9_level123_lessons: "1iacUd-BK9WZfdH4yeygdMRHIBN9BaH97",
    year9_level123_resources: "1HbFZAm-MoBlU9uyChjbXXGa7mAxpVrHJ",
    year9_level123_studyboards: "1kvtBOwSGEq-OG0-9LV9GnkdY6uV1w_DQ",
    year9_ccp_lessons: "1jVT23yWS-549yWJIETA91k-DqN89as-V",
    year9_ccp_resources: "1bLkd0ujwjtZUF479TMPjKgjuCoajptuL",
    year9_ccp_studyboards: "1y_ikLKQ2Iv1khfQeMHLm2GU4ML3pmr-k",
    year10_level123_lessons: "1Rfz2U_dPyDAAaqvqC7dDXcwf4h5lQUX7",
    year10_level123_resources: "1KMLSDX5ODiEmK2_K7zTwslLCYL7notji",
    year10_level123_studyboards: "1rj7dAk9VhhmArYtrDNk7_H2Rd3Fp_hn8",
    year10_ccp_lessons: "14eoKOXjitWWAJl3LNQ08lcoieiukuCBR",
    year10_ccp_resources: "1nmPiYCvYMl5wUt-RRYzIjD1pgKbGX25i",
    year10_ccp_studyboards: "10ir5tSxUP5lftfZju8dQA_7fNYF6Zw8w"
  },

  NAV: {
    home: {
      title: "Ms Kylie Buhagiar", crumb: "",
      children: ["year9", "year10"]
    },

    year9: {
      title: "Year 9", crumb: "Year 9",
      children: ["year9_level123", "year9_ccp"]
    },
    year9_level123: {
      title: "Levels 1-2-3", crumb: "Year 9 &rsaquo; Levels 1-2-3",
      children: ["year9_level123_lessons", "year9_level123_resources", "year9_level123_noticeboard", "year9_level123_studyboards"]
    },
    year9_level123_lessons: {
      title: "Lessons", type: "dynamic", crumb: "Year 9 &rsaquo; Levels 1-2-3 &rsaquo; Lessons",
      folder: "year9_level123_lessons"
    },
    year9_level123_resources: { title: "Resources", type: "files", crumb: "Year 9 &rsaquo; Levels 1-2-3 &rsaquo; Resources", folder: "year9_level123_resources" },
    year9_level123_studyboards: { title: "Study Boards", type: "files", crumb: "Year 9 &rsaquo; Levels 1-2-3 &rsaquo; Study Boards", folder: "year9_level123_studyboards" },
    year9_level123_noticeboard: { title: "Noticeboard", type: "notice", crumb: "Year 9 &rsaquo; Levels 1-2-3 &rsaquo; Noticeboard", noticeClass: "year9l123" },

    year9_ccp: {
      title: "CCP", crumb: "Year 9 &rsaquo; CCP",
      children: ["year9_ccp_lessons", "year9_ccp_resources", "year9_ccp_noticeboard", "year9_ccp_studyboards"]
    },
    year9_ccp_lessons: {
      title: "Lessons", type: "dynamic", crumb: "Year 9 &rsaquo; CCP &rsaquo; Lessons",
      folder: "year9_ccp_lessons"
    },
    year9_ccp_resources: { title: "Resources", type: "files", crumb: "Year 9 &rsaquo; CCP &rsaquo; Resources", folder: "year9_ccp_resources" },
    year9_ccp_studyboards: { title: "Study Boards", type: "files", crumb: "Year 9 &rsaquo; CCP &rsaquo; Study Boards", folder: "year9_ccp_studyboards" },
    year9_ccp_noticeboard: { title: "Noticeboard", type: "notice", crumb: "Year 9 &rsaquo; CCP &rsaquo; Noticeboard", noticeClass: "year9ccp" },

    year10: {
      title: "Year 10", crumb: "Year 10",
      children: ["year10_level123", "year10_ccp"]
    },
    year10_level123: {
      title: "Levels 1-2-3", crumb: "Year 10 &rsaquo; Levels 1-2-3",
      children: ["year10_level123_lessons", "year10_level123_resources", "year10_level123_noticeboard", "year10_level123_studyboards"]
    },
    year10_level123_lessons: {
      title: "Lessons", type: "dynamic", crumb: "Year 10 &rsaquo; Levels 1-2-3 &rsaquo; Lessons",
      folder: "year10_level123_lessons"
    },
    year10_level123_resources: { title: "Resources", type: "files", crumb: "Year 10 &rsaquo; Levels 1-2-3 &rsaquo; Resources", folder: "year10_level123_resources" },
    year10_level123_studyboards: { title: "Study Boards", type: "files", crumb: "Year 10 &rsaquo; Levels 1-2-3 &rsaquo; Study Boards", folder: "year10_level123_studyboards" },
    year10_level123_noticeboard: { title: "Noticeboard", type: "notice", crumb: "Year 10 &rsaquo; Levels 1-2-3 &rsaquo; Noticeboard", noticeClass: "year10l123" },

    year10_ccp: {
      title: "CCP", crumb: "Year 10 &rsaquo; CCP",
      children: ["year10_ccp_lessons", "year10_ccp_resources", "year10_ccp_noticeboard", "year10_ccp_studyboards"]
    },
    year10_ccp_lessons: {
      title: "Lessons", type: "dynamic", crumb: "Year 10 &rsaquo; CCP &rsaquo; Lessons",
      folder: "year10_ccp_lessons"
    },
    year10_ccp_resources: { title: "Resources", type: "files", crumb: "Year 10 &rsaquo; CCP &rsaquo; Resources", folder: "year10_ccp_resources" },
    year10_ccp_studyboards: { title: "Study Boards", type: "files", crumb: "Year 10 &rsaquo; CCP &rsaquo; Study Boards", folder: "year10_ccp_studyboards" },
    year10_ccp_noticeboard: { title: "Noticeboard", type: "notice", crumb: "Year 10 &rsaquo; CCP &rsaquo; Noticeboard", noticeClass: "year10ccp" }
  }
};
