---
sidebar_position: 310
original: https://github.com/originator-profile/docs.originator-profile.org/blob/2de6950/docs/inspector.md
---

# OP Inspector

![](./assets/inspector.ja.png)

OP Inspector is a browser extension that allows you to view and verify Originator Profiles and Content Attestation within your web browser.

By accessing supported websites, you can check content originator information and its verification results.

## Download

:::tip
If you are using Google Chrome, you can get it from the "[Chrome Web Store](https://chromewebstore.google.com/detail/op-inspector/namnjenlimojacngjhddjdjpakfaepeb)". See "[Installing from the Chrome Web Store](#chrome-web-store)" for instructions.
:::

If you want to try the development version or are using Firefox, download the latest OP Inspector ZIP file from [GitHub Releases](https://github.com/originator-profile/originator-profile/releases/latest).

| Browser         | File name                             |
| --------------- | ------------------------------------- |
| Google Chrome   | `op_inspector-chromium-v*.zip`        |
| Mozilla Firefox | `op_inspector-firefox-desktop-v*.zip` |

## Install

### Google Chrome

#### Install from the Chrome Web Store (Recommended) {#chrome-web-store}

You can obtain OP Inspector from the official "[Chrome Web Store](https://chromewebstore.google.com/detail/op-inspector/namnjenlimojacngjhddjdjpakfaepeb)".

1. Go to the [OP Inspector page](https://chromewebstore.google.com/detail/op-inspector/namnjenlimojacngjhddjdjpakfaepeb) on the Chrome Web Store.
2. Click "Add to Chrome".
3. Click "Add extension" in the confirmation dialog.

If you install from the Chrome Web Store, you do not need to manually replace the ZIP file.

#### Install in Developer Mode

If you want to try the latest development version, you can also manually install using the ZIP file downloaded from GitHub Releases.

1. Extract the downloaded ZIP file.
2. Enter `chrome://extensions` in your browser's address bar to open the extensions management screen.

- Alternatively, you can access it from the three-dot menu button in the upper right corner > "Extensions" > "Manage extensions".

3. Enable "Developer mode" in the upper right corner of the screen.
4. Click the "Load unpacked extension" button in the upper left corner of the screen.
5. Select the directory where you extracted the ZIP file (the folder containing `manifest.json`).

Reference: [Loading unpacked extensions (Chrome for Developers)](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=en#load-unpacked)

### Firefox

1. Type `about:debugging` in the address bar.
2. Select "This Firefox" > "Load temporary add-ons...".
3. Select the downloaded ZIP file.

:::warning
Add-ons temporarily installed in Firefox will be disabled when Firefox is restarted.
:::

### Pinning to the Toolbar

It's convenient to pin OP Inspector to the toolbar for quick access.

**Google Chrome**

![](./assets/chrome-toolbar.ja.png)

1. Click the "Extensions" button (🧩 puzzle piece icon) in the upper right corner of your browser.
2. Click the "Pin" button (📌 pin icon) next to the OP Inspector.

Reference: [Pinning extensions (Chrome for Developers)](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=en#pin_the_extension)

**Firefox**

![](./assets/firefox-toolbar.ja.png)

1. Click the "Extensions" button (🧩 puzzle piece icon) in the upper right corner of your browser.
2. Click the "Settings" button (⚙ gear icon) next to OP Inspector.
3. Select "Pin to toolbar".

## Verification method

### Basic Usage

1. With OP Inspector installed, access a website that supports Originator Profile.

- Example: [Originator Profile Technology Research Association (OP-CIP) Official Website](https://originator-profile.org/)

2. Click the OP Inspector icon in the toolbar.
3. Content source information and verification results will be displayed.

:::note
OP Inspector will not work in tabs that were loaded before installation. Please open a new tab or reload the page after installation.
:::

### How to interpret verification results

If verification is successful, the sender's information (name, image, etc.) will be displayed.

If verification fails, you can view detailed verification results by clicking the OP Inspector icon and selecting "More Information" from the kebab menu (︙ vertical three-dot icon).

:::note[Screen displayed when sender information cannot be obtained]
On websites that do not support Originator Profile, the following screen will be displayed.

This screen may also be displayed due to other reasons, so please check the error message.

![Screen displayed when sender information cannot be obtained](./assets/unsupported.png)

Even if this screen is displayed, you can view detailed verification results by selecting "More Information" from the kebab menu (︙ vertical three-dot icon).

The method of checking is the same as when verification fails.

:::

#### Detailed information screen

![](./assets/details.webp)

#### Verification results

![Example of a verification result tree](./assets/error-details-tree.webp)

If a verification error occurs, you can expand the "Validation Results" tree to see the error code and message.

- Click "▶" to expand the tree.

- **Code**: The error code is displayed. See [Error Reference](/error-reference/) for the meaning of the error code.

- **payload**: The verification result data is displayed in JSON format.

The tree has a nested structure; expanding it will show more detailed error information.

#### Detailed Information

The "Detailed Information" tree displays the raw data used for verification.

- **Site Profile**: Originator information about the website
- **Originator Profile Set**: A collection of originator profiles
- **Content Attestation Set**: Content attestation data

#### Copying JSON Data

JSON data displayed in the tree can be copied by clicking the clipboard icon (📋) that appears when you mouse over a node.

- Clicking the root node's icon copies the entire JSON.
- Clicking a specific node's icon copies only the JSON under that node.

The copied data is useful for detailed verification by pasting it into [Debugger](/debugger/) or attaching it when reporting problems.

## Updating OP Inspector

When a new version is released, you can update your OP Inspector by following these steps:

### Google Chrome

If you installed from the Chrome Web Store, updates will be performed automatically. No manual intervention is required.

If you installed in Developer mode, follow these steps to update.

1. Download the latest version from [GitHub Releases](https://github.com/originator-profile/originator-profile/releases/latest) and extract it.
2. Replace the location of the previous ZIP file with the latest version.
3. Open `chrome://extensions` and click the refresh icon (to the left of the on/off toggle button) for the OP Inspector.

Reference: [Reload extensions (Chrome for Developers)](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=en#reload)

### Firefox

1. Download the latest version from [GitHub Releases](https://github.com/originator-profile/originator-profile/releases/latest).
2. Go to `about:debugging`.
3. Select "This Firefox" > "Load temporary add-on..." and specify the latest ZIP file.

After updating, if the target page is already open, please reload the page or open a new tab.

## Displaying images

### Image for Content Attestation

Images included in Content Attestation are displayed within a 120px wide x 80px high display area while maintaining their aspect ratio.

- Images smaller than the display area are centered at their original size.
- Images larger than the display area are scaled down while maintaining their aspect ratio.
- If no image is specified, a placeholder image is displayed.

In the left-hand icon area (44px wide x 44px high), images are resized to cover the entire display area while maintaining their aspect ratio, and any excess is cropped.

### Website Profile Image

Website profile images are displayed within a 240px wide x 44px high display area, maintaining their aspect ratio.

![Example of Website Profile Image Display](./assets/website-profile-image.ja.webp)

### If the image does not display:

To display the image correctly, you need to allow external access to the image. For more information, see "[Image not displaying](/troubleshooting/image-access-error/)".

## Known Limitations

- OP Inspector will not work in tabs that were loaded before installation. Please open a new tab or reload the page after installation.
- Images must be displayed on the image server, which must allow CORS (`Access-Control-Allow-Origin: *`).
- In Firefox, temporarily installed add-ons will be disabled when the browser is restarted.

## Related

- [Debugger](/debugger/) - Debugging tool for Originator Profile
- [Content Attestation Server Playground](/playground/) - Content Attestation publishing and verification test environment
- [Troubleshooting](/troubleshooting/image-access-error/) - How to deal with images not displaying
- [Error Reference](/error-reference/) - Details of error codes
