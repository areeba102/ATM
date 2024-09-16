// Initializing balance and transaction history
let balance = 1000; // Starting balance
let transactions = []; // To store transaction history

// Select DOM elements
const messageDisplay = document.getElementById('message');
const balanceDisplay = document.getElementById('balance');
const checkBalanceBtn = document.getElementById('checkBalance');
const depositBtn = document.getElementById('deposit');
const withdrawBtn = document.getElementById('withdraw');
const transactionHistoryBtn = document.getElementById('transactionHistory');
const inputSection = document.getElementById('inputSection');
const amountInput = document.getElementById('amountInput');
const submitAmountBtn = document.getElementById('submitAmount');
const exitBtn = document.getElementById('exit');

let currentAction = ''; // Track current action (deposit or withdraw)

// Show balance function
function showBalance() {
    messageDisplay.textContent = 'Your current balance is:';
    balanceDisplay.textContent = `$${balance.toFixed(2)}`;
}

// Deposit money function
function depositMoney(amount) {
    balance += amount;
    transactions.push(`Deposited: $${amount.toFixed(2)}`);
    showBalance();
}

// Withdraw money function
function withdrawMoney(amount) {
    if (amount > balance) {
        messageDisplay.textContent = "Insufficient funds!";
        balanceDisplay.textContent = "";
    } else {
        balance -= amount;
        transactions.push(`Withdrew: $${amount.toFixed(2)}`);
        showBalance();
    }
}

// Show transaction history function
function showTransactionHistory() {
    if (transactions.length === 0) {
        messageDisplay.textContent = "No transactions yet.";
    } else {
        messageDisplay.textContent = "Transaction History:";
        balanceDisplay.innerHTML = transactions.map(tx => `<p>${tx}</p>`).join('');
    }
}

// Handle input for deposit or withdraw
function handleInputSubmit() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        messageDisplay.textContent = "Please enter a valid amount.";
        return;
    }

    if (currentAction === 'deposit') {
        depositMoney(amount);
    } else if (currentAction === 'withdraw') {
        withdrawMoney(amount);
    }

    amountInput.value = ''; // Clear input
    inputSection.classList.add('hidden'); // Hide input section after submitting
}

// Event listeners
checkBalanceBtn.addEventListener('click', () => {
    showBalance();
});

depositBtn.addEventListener('click', () => {
    currentAction = 'deposit';
    messageDisplay.textContent = "Enter amount to deposit:";
    inputSection.classList.remove('hidden');
});

withdrawBtn.addEventListener('click', () => {
    currentAction = 'withdraw';
    messageDisplay.textContent = "Enter amount to withdraw:";
    inputSection.classList.remove('hidden');
});

transactionHistoryBtn.addEventListener('click', () => {
    showTransactionHistory();
});

submitAmountBtn.addEventListener('click', handleInputSubmit);

exitBtn.addEventListener('click', () => {
    messageDisplay.textContent = "Goodbye!";
    balanceDisplay.textContent = "";
    inputSection.classList.add('hidden');
});
