// --- 1. Clock Logic ---
function initClock() {
  const clockEl = document.getElementById('clock-widget');

  function update() {
    const date = new Date();
    clockEl.textContent = date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  update();
  setInterval(update, 1000);
}
initClock();

// --- 2. Window Visibility Toggle ---
function toggleWin(windowId) {
  const win = document.getElementById(windowId);
  if (!win) return;

  if (win.style.display === 'none') {
    win.style.display = 'flex';
    // Move opened window to top stack
    bringToFront(win);
  } else {
    win.style.display = 'none';
  }
}

// --- 3. Dynamic Theme Changer ---
function applyTheme(themeName) {
  // Clear existing theme classes
  document.body.classList.remove('bg-dark', 'bg-sunset', 'bg-cyber');
  // Add new theme
  document.body.classList.add(`bg-${themeName}`);
}

// --- 4. Drag and Drop & Layering Mechanics ---
let maxZ = 100;

function bringToFront(element) {
  maxZ++;
  element.style.zIndex = maxZ;
}

document.querySelectorAll('.window').forEach(win => {
  const header = win.querySelector('.window-header');
  let dragging = false;
  let startX = 0, startY = 0;

  // Bring to front on click anywhere inside window
  win.addEventListener('mousedown', () => bringToFront(win));

  header.addEventListener('mousedown', (e) => {
    dragging = true;
    startX = e.clientX - win.offsetLeft;
    startY = e.clientY - win.offsetTop;
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;

    // Reposition window within boundaries
    win.style.left = `${e.clientX - startX}px`;
    win.style.top = `${e.clientY - startY}px`;
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
  });
});