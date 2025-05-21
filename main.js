// Data for the random withdrawals
const cryptoCoins = [
  { name: 'BTC', fullName: 'Bitcoin', icon: 'images/btc.png' },
  { name: 'ETH', fullName: 'Ethereum', icon: 'images/eth.png' },
  { name: 'USDT-ERC20', fullName: 'Tether ERC20', icon: 'images/usdt.png' },
  { name: 'USDC-ERC20', fullName: 'USD Coin ERC20', icon: 'images/usdt.png' },
  { name: 'DOGE', fullName: 'Dogecoin', icon: 'images/doge.png' },
  { name: 'LTC', fullName: 'Litecoin', icon: 'images/ltc.png' }
];

const domains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'protonmail.com', 'icloud.com', 'mail.ru', 'aol.com'];

// Function to generate a random email
function generateRandomEmail() {
  const username = Math.random().toString(36).substring(2, 10);
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const visiblePart = username.substring(0, 3);
  const hiddenPart = '*'.repeat(username.length - 3);
  
  return `${visiblePart}${hiddenPart}@${domain}`;
}

// Function to generate a random amount
function generateRandomAmount() {
  const min = 100;
  const max = 10000;
  const amount = Math.random() * (max - min) + min;
  return `$ ${amount.toFixed(2)}`;
}

// Function to create a withdrawal row
function createWithdrawalRow() {
  const coin = cryptoCoins[Math.floor(Math.random() * cryptoCoins.length)];
  const email = generateRandomEmail();
  const amount = generateRandomAmount();
  
  const row = document.createElement('tr');
  row.classList.add('new-row');
  
  row.innerHTML = `
    <td>${email}</td>
    <td>
      <img src="${coin.icon}" alt="${coin.name}" class="coin-icon" data-coin="${coin.name}">
      ${coin.name}
    </td>
    <td class="amount">${amount}</td>
    <td><span class="status-badge">Succès</span></td>
  `;
  
  return row;
}

// Function to add a new withdrawal row and remove old ones
function addWithdrawalRow() {
  const tbody = document.getElementById('withdraws-data');
  const newRow = createWithdrawalRow();
  
  // Insert at the top
  if (tbody.firstChild) {
    tbody.insertBefore(newRow, tbody.firstChild);
  } else {
    tbody.appendChild(newRow);
  }
  
  // Remove row if more than 10 to keep the list manageable
  if (tbody.children.length > 10) {
    tbody.removeChild(tbody.lastChild);
  }
  
  // Remove the 'new-row' class after animation completes
  setTimeout(() => {
    newRow.classList.remove('new-row');
  }, 500);
}

// Initialize the table with some initial rows
function initializeWithdrawals() {
  const tbody = document.getElementById('withdraws-data');
  
  // Add 5 initial rows
  for (let i = 0; i < 5; i++) {
    const row = createWithdrawalRow();
    row.classList.remove('new-row'); // No animation for initial rows
    tbody.appendChild(row);
  }
  
  // Start adding new rows periodically
  setInterval(addWithdrawalRow, 3000); // Add a new row every 3 seconds
}

// Initialize when the page loads
window.addEventListener('DOMContentLoaded', initializeWithdrawals);

