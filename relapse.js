// Motivational quotes
const quotes = [
    "Be stronger than your strongest excuse.",
    "It always seems impossible until it’s done. – Nelson Mandela",
    "If we are facing in the right direction, all we have to do is keep on walking. – Zen Proverb",
    "Recovery is a process. It takes time. It takes patience. It takes everything you’ve got.",
    "No matter how dark the moment, love and hope are always possible. – George Chakiris",
    "Hardships often prepare ordinary people for an extraordinary destiny. – C.S. Lewis",
    "The best time to plant a tree was 20 years ago. The second best time is now. – Chinese Proverb",
    "You can come out of the furnace of trouble two ways: if you let it consume you, you come out a cinder; but there is a kind of metal which refuses to be consumed, and comes out a star. – Jean Church",
    "Whether you think you can or you think you can’t, you’re right. – Henry Ford",
    "It is often in the darkest skies that we see the brightest stars. – Richard Evans",
    "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
    "You are capable of amazing things.",
    "Don’t let yesterday take up too much of today. – Will Rogers",
    "Every day is a chance to get better."
  ];
  
  // DOM elements
  const timerEl = document.getElementById('timer');
  const relapseBtn = document.getElementById('relapseBtn');
  const daysEl = document.getElementById('days');
  const quoteEl = document.getElementById('quote');
  const newQuoteBtn = document.getElementById('newQuoteBtn');
  const historyList = document.getElementById('historyList');
  
  // Persistent storage
  let startTime = localStorage.getItem('relapseStartTime');
  let history = JSON.parse(localStorage.getItem('relapseHistory') || '[]');
  
  // Initialize timer
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem('relapseStartTime', startTime);
  }
  
  // Timer update function
  function updateTimer() {
    const now = Date.now();
    const diff = now - startTime;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
  
    daysEl.textContent = days;
    timerEl.textContent =
      `${String(days).padStart(2, '0')}:` +
      `${String(hours).padStart(2, '0')}:` +
      `${String(minutes).padStart(2, '0')}:` +
      `${String(seconds).padStart(2, '0')}`;
  }
  setInterval(updateTimer, 1000);
  updateTimer();
  
  // Relapse button functionality
  relapseBtn.addEventListener('click', () => {
    // Save relapse to history
    const now = new Date();
    const diff = Date.now() - startTime;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const relapseRecord = {
      date: now.toLocaleString(),
      streak: days
    };
    history.unshift(relapseRecord);
    if (history.length > 10) history.pop(); // Limit history length
    localStorage.setItem('relapseHistory', JSON.stringify(history));
  
    // Reset timer
    startTime = Date.now();
    localStorage.setItem('relapseStartTime', startTime);
    updateTimer();
    renderHistory();
  });
  
  // Render relapse history
  function renderHistory() {
    historyList.innerHTML = '';
    if (history.length === 0) {
      historyList.innerHTML = '<li>No relapses yet! Keep going! 💪</li>';
      return;
    }
    history.forEach(item => {
      historyList.innerHTML +=
        `<li><strong>${item.streak} day${item.streak !== 1 ? 's' : ''}</strong> streak ended<br><span style="color:#6ad6ff">${item.date}</span></li>`;
    });
  }
  renderHistory();
  
  // Motivation
  function newQuote() {
    const idx = Math.floor(Math.random() * quotes.length);
    quoteEl.textContent = quotes[idx];
  }
  newQuoteBtn.addEventListener('click', newQuote);
  newQuote();
  
  // Optional: Show a new quote every day
  const lastQuoteDay = localStorage.getItem('lastQuoteDay');
  const today = new Date().toDateString();
  if (lastQuoteDay !== today) {
    newQuote();
    localStorage.setItem('lastQuoteDay', today);
  }
  