async function loadArbs() {
  const container = document.getElementById('arbs-container');
  container.innerHTML = 'Loading...';

  try {
    const res = await fetch('https://arbiplay-api.onrender.com/api/arbs');
    const data = await res.json();

    container.innerHTML = '';
    if (data.length === 0) {
      container.innerHTML = '<p>No arbitrage opportunities found.</p>';
      return;
    }

    data.forEach((arb) => {
      const div = document.createElement('div');
      div.className = 'arb';
      div.innerHTML = `
        <strong>Sport:</strong> ${arb.sport}<br />
        <strong>Match:</strong> ${arb.match}<br />
        <strong>Market:</strong> ${arb.market}<br />
        <strong>Profit Margin:</strong> ${arb.margin}%<br />
        <strong>Bets:</strong><br />
        <ul>
          ${arb.bets.map(bet => `<li>${bet.outcome} @ ${bet.odds} (${bet.bookmaker})</li>`).join('')}
        </ul>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    container.innerHTML = 'Failed to load data. Try again later.';
  }
}

// Load automatically
window.onload = loadArbs;