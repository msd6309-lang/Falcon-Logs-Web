# Falcon Logs (web app)

The same Falcon Logs app as the Android APK, running in a phone's browser. Installed to the home screen, it opens full screen, works with no signal, and exports the same gINT workbook.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app. Same file as `app/src/main/assets/index.html` in the Android project. |
| `manifest.webmanifest` | App name, icon and colors used when it's installed. |
| `sw.js` | Offline cache. Lets the app open with no signal after the first visit. |
| `icons/` | Falcon "FE" icons for home screens. |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are. |


## Install on a phone

- **iPhone / iPad:** open the link in **Safari**, tap **Share**, then **Add to Home Screen**.
- **Android:** open the link in **Chrome**, tap **Install app** on the home screen of Falcon Logs (or the browser menu › **Install app** / **Add to Home screen**).

Open it once with signal so it can save itself for offline use.

## Using it

- **GPS:** Boring info › **Use phone GPS**. Allow location when asked. If it was denied on iPhone: Settings › Privacy & Security › Location Services › Safari Websites › While Using.
- **Export to Excel:** on iPhone the share sheet opens; choose **Save to Files**, Mail, Teams, etc. On Android and desktop the file downloads.
- **Back up all data / Restore a backup:** same as the Android app. Data is stored on each device inside the browser, so deleting the home-screen app or clearing the site's data deletes it. Back up regularly.
- Each device has its own data. A backup file moves projects from one device to another (for example from the Android app to an iPhone).
