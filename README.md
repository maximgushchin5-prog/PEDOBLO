# PEDOBLOX

A small Chrome extension (Manifest V3) that replaces the Roblox logo on roblox.com with a custom logo image.

> Not affiliated with, endorsed by or sponsored by Roblox Corporation. "Roblox" is a trademark of Roblox Corporation.

## Install (Chrome, Edge, Brave)

This extension isn't in the Chrome Web Store, so it's installed by hand:

1. Download it: either the zip from the **Releases** page, or the green **Code** button, then **Download ZIP**. Unzip it.
2. Open `chrome://extensions` (or `edge://extensions`) and turn on **Developer mode**.
3. Click **Load unpacked** and choose the folder that contains `manifest.json`.
4. Open or refresh roblox.com.

Chrome may show a "disable developer mode extensions" warning when it starts. That's normal for extensions installed this way.

**Update:** download the new version, replace the old files, then click the reload icon on the extension's card at `chrome://extensions`.

**Remove:** click **Remove** on its card at `chrome://extensions`. The normal Roblox logo comes back.

## What it does

- Runs only on `*.roblox.com`.
- Replaces the logo in the page header with the bundled `PEDOBLOX`, fitted inside the space Roblox already uses for its own logo, so the rest of the header stays where it was.
- Collects no data, makes no network requests of its own and asks for no browser permissions.

## Use a different image

Replace `logo.png` with your own picture and reload the extension. A PNG with a transparent background works best. Wide logos are fine, since the image is scaled to fit.

The extension's own icon is in the `icons` folder (16, 32, 48 and 128 px).

## If the logo stops changing

Roblox changes its site often. If the logo stops being replaced, the page probably uses a different element or class name now.

1. Right-click the Roblox logo and choose **Inspect** to see its element and class name.
2. Update the two selector lists at the top of `content.js`: `ICON_SELECTORS` (logo drawn as a CSS background) and `IMG_SELECTORS` (logo drawn as an `<img>`).
3. Reload the extension.

## Known limits

- The bundled logo has dark gray lettering, so it is hard to read on Roblox's dark theme.
- Only the header logo is replaced. The browser tab icon is left alone.

## Files

| File | Purpose |
|---|---|
| `manifest.json` | Extension definition |
| `content.js` | Swaps the logo on roblox.com pages |
| `logo.png` | The logo that is shown |
| `icons/` | The extension's own icon in four sizes |
