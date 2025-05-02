// (function () {
//   const hostname = window.location.hostname;

//   chrome.storage.local.get([hostname], (result) => {
//     const savedVolume = result[hostname];
//     if (typeof savedVolume === 'number') {
//       applyVolume(savedVolume);
//     }
//   });

//   function applyVolume(volume) {
//     const apply = () => {
//       document.querySelectorAll('video, audio').forEach((media) => {
//         media.volume = volume;
//       });
//     };

//     // Aplica inicialmente
//     apply();

//     // Reaplica quando elementos são adicionados dinamicamente
//     const observer = new MutationObserver(apply);
//     observer.observe(document.body, { childList: true, subtree: true });
//   }
// })();

(function () {
  const hostname = window.location.hostname;

  chrome.storage.local.get([hostname], (result) => {
    const savedVolume = result[hostname];
    if (typeof savedVolume === 'number') {
      applyVolume(savedVolume);
      setupObserver(savedVolume);
    }
  });

  function applyVolume(volume) {
    const mediaElements = document.querySelectorAll('video, audio');
    mediaElements.forEach((el) => {
      el.volume = volume;
      console.log(`Volume set to ${volume} for ${el.tagName}`);
    });
  }

  function setupObserver(savedVolume) {
    const observer = new MutationObserver(() => {
      applyVolume(savedVolume);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Aplicar volume nos elementos já existentes
    applyVolume(savedVolume);
  }
})();
