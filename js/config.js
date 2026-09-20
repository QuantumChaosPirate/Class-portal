/**
 * SITE CONFIG
 * -----------
 * The whole site's structure lives in NAV below. To add a new year,
 * class, or folder, edit NAV — no new HTML files needed.
 *
 * Node types:
 *   "hub"    - a page of buttons linking to child nodes (default if no type given)
 *   "files"  - a page listing files from a Drive folder (needs `folder`)
 *   "notice" - a page listing announcements for a class (needs `noticeClass`)
 */

const CONFIG = {
  DRIVE_API_KEY: "__DRIVE_API_KEY__", // replaced at deploy time by GitHub Actions
  SHEET_CSV_URL: "PASTE_PUBLISHED_SHEET_CSV_URL_HERE",

  FOLDERS: {
    year9_level123_lessons_level1: "FOLDER_ID_HERE",
    year9_level123_lessons_level2: "FOLDER_ID_HERE",
    year9_level123_lessons_level3: "FOLDER_ID_HERE",
    year9_level123_resources: "FOLDER_ID_HERE",
    year9_level123_studyboards: "FOLDER_ID_HERE",
    year9_ccp_lessons_level1: "FOLDER_ID_HERE",
    year9_ccp_lessons_level2: "FOLDER_ID_HERE",
    year9_ccp_resources: "FOLDER_ID_HERE",
    year9_ccp_studyboards: "FOLDER_ID_HERE",
    year10_level123_lessons_level1: "FOLDER_ID_HERE",
    year10_level123_resources: "FOLDER_ID_HERE",
    year10_level123_studyboards: "FOLDER_ID_HERE",
    year10_ccp_lessons_level1: "FOLDER_ID_HERE",
    year10_ccp_resources: "FOLDER_ID_HERE",
    year10_ccp_studyboards: "FOLDER_ID_HERE"
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
      title: "Lessons", crumb: "Year 9 &rsaquo; Levels 1-2-3 &rsaquo; Lessons",
      children: ["year9_level123_lessons_level1", "year9_level123_lessons_level2", "year9_level123_lessons_level3"]
    },
    year9_level123_lessons_level1: { title: "Level 1", type: "files", crumb: "Year 9 &rsaquo; Levels 1-2-3 &rsaquo; Lessons &rsaquo; Level 1", folder: "year9_level123_lessons_level1" },
    year9_level123_lessons_level2: { title: "Level 2", type: "files", crumb: "Year 9 &rsaquo; Levels 1-2-3 &rsaquo; Lessons &rsaquo; Level 2", folder: "year9_level123_lessons_level2" },
    year9_level123_lessons_level3: { title: "Level 3", type: "files", crumb: "Year 9 &rsaquo; Levels 1-2-3 &rsaquo; Lessons &rsaquo; Level 3", folder: "year9_level123_lessons_level3" },
    year9_level123_resources: { title: "Resources", type: "files", crumb: "Year 9 &rsaquo; Levels 1-2-3 &rsaquo; Resources", folder: "year9_level123_resources" },
    year9_level123_studyboards: { title: "Study Boards", type: "files", crumb: "Year 9 &rsaquo; Levels 1-2-3 &rsaquo; Study Boards", folder: "year9_level123_studyboards" },
    year9_level123_noticeboard: { title: "Noticeboard", type: "notice", crumb: "Year 9 &rsaquo; Levels 1-2-3 &rsaquo; Noticeboard", noticeClass: "year9l123" },

    year9_ccp: {
      title: "CCP", crumb: "Year 9 &rsaquo; CCP",
      children: ["year9_ccp_lessons", "year9_ccp_resources", "year9_ccp_noticeboard", "year9_ccp_studyboards"]
    },
    year9_ccp_lessons: {
      title: "Lessons", crumb: "Year 9 &rsaquo; CCP &rsaquo; Lessons",
      children: ["year9_ccp_lessons_level1", "year9_ccp_lessons_level2"]
    },
    year9_ccp_lessons_level1: { title: "Level 1", type: "files", crumb: "Year 9 &rsaquo; CCP &rsaquo; Lessons &rsaquo; Level 1", folder: "year9_ccp_lessons_level1" },
    year9_ccp_lessons_level2: { title: "Level 2", type: "files", crumb: "Year 9 &rsaquo; CCP &rsaquo; Lessons &rsaquo; Level 2", folder: "year9_ccp_lessons_level2" },
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
      title: "Lessons", crumb: "Year 10 &rsaquo; Levels 1-2-3 &rsaquo; Lessons",
      children: ["year10_level123_lessons_level1"]
    },
    year10_level123_lessons_level1: { title: "Level 1", type: "files", crumb: "Year 10 &rsaquo; Levels 1-2-3 &rsaquo; Lessons &rsaquo; Level 1", folder: "year10_level123_lessons_level1" },
    year10_level123_resources: { title: "Resources", type: "files", crumb: "Year 10 &rsaquo; Levels 1-2-3 &rsaquo; Resources", folder: "year10_level123_resources" },
    year10_level123_studyboards: { title: "Study Boards", type: "files", crumb: "Year 10 &rsaquo; Levels 1-2-3 &rsaquo; Study Boards", folder: "year10_level123_studyboards" },
    year10_level123_noticeboard: { title: "Noticeboard", type: "notice", crumb: "Year 10 &rsaquo; Levels 1-2-3 &rsaquo; Noticeboard", noticeClass: "year10l123" },

    year10_ccp: {
      title: "CCP", crumb: "Year 10 &rsaquo; CCP",
      children: ["year10_ccp_lessons", "year10_ccp_resources", "year10_ccp_noticeboard", "year10_ccp_studyboards"]
    },
    year10_ccp_lessons: {
      title: "Lessons", crumb: "Year 10 &rsaquo; CCP &rsaquo; Lessons",
      children: ["year10_ccp_lessons_level1"]
    },
    year10_ccp_lessons_level1: { title: "Level 1", type: "files", crumb: "Year 10 &rsaquo; CCP &rsaquo; Lessons &rsaquo; Level 1", folder: "year10_ccp_lessons_level1" },
    year10_ccp_resources: { title: "Resources", type: "files", crumb: "Year 10 &rsaquo; CCP &rsaquo; Resources", folder: "year10_ccp_resources" },
    year10_ccp_studyboards: { title: "Study Boards", type: "files", crumb: "Year 10 &rsaquo; CCP &rsaquo; Study Boards", folder: "year10_ccp_studyboards" },
    year10_ccp_noticeboard: { title: "Noticeboard", type: "notice", crumb: "Year 10 &rsaquo; CCP &rsaquo; Noticeboard", noticeClass: "year10ccp" }
  }
};
