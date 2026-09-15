function triggerPad(pad) {
  if (!pad) return;
 
  const clip = pad.querySelector('.clip');
  const display = document.getElementById('display');
 
  if (clip) {
    clip.currentTime = 0;
    clip.play();
  }
 
  if (display) {
    display.textContent = pad.dataset.name;
  }
 
  pad.classList.add('active');
  window.clearTimeout(pad._activeTimeout);
  pad._activeTimeout = window.setTimeout(() => {
    pad.classList.remove('active');
  }, 120);
}
 
document.addEventListener('DOMContentLoaded', () => {
  const pads = document.querySelectorAll('.drum-pad');
 
  pads.forEach((pad) => {
    pad.addEventListener('click', () => triggerPad(pad));
  });
 
  document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    const clip = document.getElementById(key);
    if (!clip || !clip.classList.contains('clip')) return;
    triggerPad(clip.closest('.drum-pad'));
  });
});
