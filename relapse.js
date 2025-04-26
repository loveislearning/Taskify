const timerElement = document.getElementById('timer');
const relapseBtn = document.getElementById('relapseBtn');

// Persistent timer using localStorage
let startTime = localStorage.getItem('startTime') || Date.now();
localStorage.setItem('startTime', startTime);

function updateTimer() {
    const now = Date.now();
    const elapsed = now - startTime;

    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);

    timerElement.textContent = 
        `${String(hours).padStart(2, '0')}:` +
        `${String(minutes).padStart(2, '0')}:` +
        `${String(seconds).padStart(2, '0')}`;
}

// Update every second
setInterval(updateTimer, 1000);

// Reset functionality
relapseBtn.addEventListener('click', () => {
    startTime = Date.now();
    localStorage.setItem('startTime', startTime);
    updateTimer();
});

// Initial update
updateTimer();
