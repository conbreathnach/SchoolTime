SCHOOLTIME 1.0 — ANDROID WEB APP EDITION

This package contains the mobile-friendly SchoolTime editor and the files needed to install it as a home-screen web app (PWA).

WHAT IT DOES
- Seven separate days, shown one day at a time
- Add, edit and delete classes, breaks, lunch, study, free periods and other items
- Set name, type, room/location, start/end times, colour and notes
- Sorts items by start time
- Copy one day's timetable to another day
- Saves automatically in the browser on THIS device
- Includes offline caching after the app has been loaded once

IMPORTANT LIMITATIONS
- This is the Android editor prototype, not the Garmin watch app.
- The timetable is stored locally on the device. It does not sync with the PC or cloud.
- The Garmin sync feature is not connected yet.
- Installing a PWA requires the files to be hosted on an HTTPS website. Opening index.html directly from a ZIP/file manager will let you preview it, but will not enable installation/offline PWA features.

HOW TO PUT IT ON YOUR ANDROID HOME SCREEN
1. The files need to be published to a secure HTTPS website first. A simple option is GitHub Pages.
2. On your Android phone, open the published website in Chrome.
3. Open Chrome's menu (three dots) and choose "Install app" or "Add to Home screen" (the wording can vary).
4. Open SchoolTime from its new home-screen icon.

DATA
SchoolTime stores timetable data in the browser's local storage on the phone. Do not clear Chrome's site data if you want to keep the timetable. This version does not yet include export/import backup, so keep that in mind before entering a large timetable.

PROJECT FILES
index.html          App layout
styles.css          Dark, responsive phone design
app.js              Timetable editor and local saving
manifest.webmanifest PWA install information
service-worker.js   Offline app shell cache
icon.svg            Home-screen icon

The PC development copy and Android timetable remain separate by design.
