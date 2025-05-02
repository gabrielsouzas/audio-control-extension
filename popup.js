document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const hostname = new URL(tab.url).hostname;

  chrome.storage.local.get([hostname], (result) => {
    const savedVolume = result[hostname] ?? 1;
    const slider = document.getElementById('volumeSlider');
    slider.value = savedVolume;
    updateLabel(savedVolume);
  });

  document.getElementById('volumeSlider').addEventListener('input', async (e) => {
    const volume = parseFloat(e.target.value);
    updateLabel(volume);
    document.getElementById('SoundIcon').style.display = 'block';
    document.getElementById('MuteIcon').style.display = 'none';
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const hostname = new URL(tab.url).hostname;

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (volume) => {
        document.querySelectorAll('video, audio').forEach((media) => {
          media.volume = volume;
        });
      },
      args: [volume],
    });

    chrome.storage.local.set({ [hostname]: volume });
  });

  function updateLabel(value) {
    document.getElementById('volumeValue').textContent = `${Math.round(value * 100)}%`;
  }

  document.getElementById('SoundIcon').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const hostname = new URL(tab.url).hostname;

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        document.querySelectorAll('video, audio').forEach((media) => {
          media.volume = 0;
        });
      },
    });

    chrome.storage.local.set({ [hostname]: 0 });

    const slider = document.getElementById('volumeSlider');
    slider.value = 0;
    updateLabel(0);
    document.getElementById('SoundIcon').style.display = 'none';
    document.getElementById('MuteIcon').style.display = 'block';
  });
});
