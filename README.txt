SCHOOLTIME 1.0 — ANDROID EDITOR WITH BACKUP

This update adds timetable backup and restore to the mobile editor.

NEW FEATURES
- Export all seven days to a downloadable JSON backup.
- Import a SchoolTime JSON backup.
- Import validates the file before replacing current data.
- The app asks for confirmation before replacing the current timetable.

HOW TO UPDATE GITHUB PAGES
1. Download and unzip this package.
2. Open your GitHub repository.
3. Replace the existing app files with the files in this folder (keep them in the repository's published root).
4. Commit the changes and wait for GitHub Pages to publish.
5. On your phone, reload the SchoolTime website. If the installed app still shows the old version, close it and reopen it; the updated service worker should refresh its cached files.

IMPORTANT
- Export a backup before importing another file. Import replaces all seven days.
- The timetable itself remains stored locally on this phone; it is not shared with the PC or cloud.
- Garmin sync is not implemented in this update.
- This is still the mobile editor, not the completed Garmin watch app.
