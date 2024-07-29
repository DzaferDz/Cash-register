//Variable declarations//
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
const returnedValues = [];
let returnedAmount = 0;

//DOM element references//
const displayChangeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceScreen = document.getElementById('price-screen');
const cashDrawerDisplay = document.getElementById('cash-drawer-display');

//Changing Price textContent//
priceScreen.innerHTML = `<p>Total: <br>$${price}</p>`;

//Helping function//
const formatResults = (status, change) => {
    displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
    
    change.map(
      money => (displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
    );
        return;
  };

const checkCashRegister = () => {
    const cashValue = Number(cash.value);
    if (cashValue< price) {
      alert('Customer does not have enough money to purchase the item');
      cash.value = '';
      return;
    }
  
    if (cashValue === price) {
      displayChangeDue.innerHTML = '<p>No change due - customer paid with exact cash</p>';
      cash.value = '';
      return;
    }
    let changeDue = cashValue-price;
    let changes = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
    for(let i=0; i<changes.length; i++){
        while(changeDue>changes[i]){
            changeDue-=changes[i];
            returnedAmount += changeDue-changes[i];
        }
        returnedValues.push(returnedAmount);
    }
}