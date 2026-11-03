# Falcon Logs (web app)

The same Falcon Logs app as the Android APK, running in a phone's browser. Installed to the home screen, it opens full screen, works with no signal, and exports the same gINT workbook.

Works on iPhone/iPad (Safari, iOS 16.4 or newer recommended), Android (Chrome), and desktop browsers.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app. Same file as `app/src/main/assets/index.html` in the Android project. |
| `manifest.webmanifest` | App name, icon and colors used when it's installed. |
| `sw.js` | Offline cache. Lets the app open with no signal after the first visit. |
| `icons/` | Falcon "FE" icons for home screens. |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are. |

## Put it online with GitHub Pages (free, about 5 minutes)

1. On github.com, click **New repository**. Name it `falcon-logs`, set it to **Public**, and create it.
   - Use a new repository, not the Android one. GitHub Pages is free only for public repositories, and the Android repository holds the app's signing key, which shouldn't be public. Nothing private is in these web files; your boring data never leaves each phone.
2. Click **uploading an existing file** and drag in everything from this folder, including the `icons` folder. Commit.
3. Open **Settings › Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, Branch to **main** and folder **/ (root)**. Save.
4. After a minute or two the page shows your address, like `https://YOUR-USERNAME.github.io/falcon-logs/`. Send that link to anyone who should use the app.

## Install on a phone

- **iPhone / iPad:** open the link in **Safari**, tap **Share**, then **Add to Home Screen**.
- **Android:** open the link in **Chrome**, tap **Install app** on the home screen of Falcon Logs (or the browser menu › **Install app** / **Add to Home screen**).

Open it once with signal so it can save itself for offline use.

## Using it

- **GPS:** Boring info › **Use phone GPS**. Allow location when asked. If it was denied on iPhone: Settings › Privacy & Security › Location Services › Safari Websites › While Using.
- **Export to Excel:** on iPhone the share sheet opens; choose **Save to Files**, Mail, Teams, etc. On Android and desktop the file downloads.
- **Back up all data / Restore a backup:** same as the Android app. Data is stored on each device inside the browser, so deleting the home-screen app or clearing the site's data deletes it. Back up regularly.
- Each device has its own data. A backup file moves projects from one device to another (for example from the Android app to an iPhone).

## Updating the app

1. Upload the new `index.html` to the repository (replacing the old one).
2. Open `sw.js` on GitHub, change the `VERSION` line (for example to today's date), and commit. This tells installed phones to fetch the new version.
3. Phones pick up the update the next time the app is opened with signal (sometimes it takes a second open).

Use the same `index.html` in the Android project (`app/src/main/assets/`) so both versions stay identical.
