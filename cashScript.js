// Variable declarations
let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

let returnedAmount = 0;

// DOM element references
const displayChangeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceScreen = document.getElementById('price-screen');
const cashDrawerDisplay = document.getElementById('cash-drawer-display');

// Changing Price textContent
priceScreen.innerHTML = `<p>Total: <br>$${price}</p>`;

// Helping function
const formatResults = (status, change) => {
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
  
  change.map(
    money => (displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
  );
  return;
};

// Checking cash register
const checkCashRegister = () => {
  const cashValue = Number(cash.value);
  if (cashValue < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }
  
  if (cashValue === price) {
    displayChangeDue.innerHTML = '<p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }

  let totalCID = parseFloat(
    cid.map(total => total[1])
       .reduce((prev, curr) => prev + curr)
       .toFixed(2)
  );

  let changeDue = cashValue - price;
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = { status: 'OPEN', change: [] };
  let reversedCid = [...cid].reverse();
  
  if (totalCID < changeDue) {
    return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  }
  
  if (totalCID === changeDue) {
    result.status = "CLOSED";
  }

  for (let i = 0; i < reversedCid.length; i++) {
    let denominationValue = denominations[i];
    let amountInDrawer = reversedCid[i][1];
    let count = 0;

    while (changeDue >= denominationValue && amountInDrawer > 0) {
      changeDue = parseFloat((changeDue - denominationValue).toFixed(2));
      amountInDrawer = parseFloat((amountInDrawer - denominationValue).toFixed(2));
      count++;
    }
    
    if (count > 0) {
      result.change.push([reversedCid[i][0], count * denominationValue]);
    }
  }

  if (changeDue > 0) {
    return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  }

  formatResults(result.status, result.change);

  updateUI(result.change);
}

const checkResults = () => {
  if (!cash.value) {
    return;
  }
  checkCashRegister();
};

const updateUI = change => {
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };

  if (change) {
    change.forEach(changeArr => {
      const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
    });
  }

  cash.value = '';
  priceScreen.textContent = `Total: $${price}`;
  cashDrawerDisplay.innerHTML = `<p><span>Change in drawer:</span></p>
    ${cid
      .map(money => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`)
      .join('')}  
  `;
};

purchaseBtn.addEventListener("click", checkResults);
cash.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults();
  }
});

updateUI();
