# 🎚️ Tab Volume Control Chrome Extension

A simple and effective Chrome extension that lets you control the audio volume of each browser tab individually and remembers your preferences for each website.

## 🔧 Features

- 🎵 Adjust volume for the current tab directly from the popup.
- 💾 Saves volume level per domain automatically.
- 🔁 Automatically restores saved volume when revisiting a site.
- ⚙️ Works with all `<audio>` and `<video>` elements on the page.
- 🌐 Compatible with any website that uses standard media elements.

## 📁 Project Structure

```

audio-control-extension/
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── icons/
│   └── icon.png

```

## 🚀 Installation (for development)

1. Clone this repository:

   ```bash
   git clone https://github.com/gabrielsouzas/audio-control-extension.git
   ```

2. Open Chrome and go to `chrome://extensions/`.

3. Enable **Developer Mode** (top right corner).

4. Click **"Load unpacked"** and select the project folder.

5. The extension will now be available in your toolbar!

## 🧠 How It Works

- A content script (`content.js`) is injected into every tab and listens for media elements.
- The popup (`popup.html` + `popup.js`) provides a slider to adjust volume.
- The selected volume is saved using `chrome.storage.local` under the website's domain.
- When you revisit the same site, the content script automatically sets the volume to the previously saved value.

## ⚠️ Limitations

- This extension only affects `<audio>` and `<video>` elements. It cannot control audio from WebAssembly, WebAudio API, or elements rendered via canvas.
- Sites using complex embedded players (e.g., some livestreams) may not respond properly.

## 💡 Future Ideas

- Support for WebAudio API via script injection.
- Volume presets by time or schedule.
- UI improvements and better visual feedback.

---

### Made with ❤️ by Gabriel
