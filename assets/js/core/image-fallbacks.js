// Try to load data-src images (remote) and keep local src as fallback
document.addEventListener('DOMContentLoaded', () => {
  const imgs = document.querySelectorAll('img[data-src]');
  imgs.forEach(img => {
    const remote = img.getAttribute('data-src');
    if (!remote) return;
    const test = new Image();
    test.onload = function() {
      // only replace if remote loaded successfully
      try { img.src = remote; } catch (e) { /* noop */ }
    };
    test.onerror = function() {
      // keep local src as fallback
    };
    // start loading (do not block)
    test.src = remote;
  });
});
