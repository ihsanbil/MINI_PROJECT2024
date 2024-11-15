<<<<<<< HEAD
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Local Storage - Mengambil atau mengatur transaksi awal
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorageTransactions !== null ? localStorageTransactions : [];

// Menambahkan transaksi baru
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Harap masukkan deskripsi dan nominal');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// Generate ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Menambahkan transaksi ke DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');
    item.classList.add('list-group-item', transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}Rp${formatRupiah(Math.abs(transaction.amount))}</span> 
        <button class="edit-btn" onclick="editTransaction(${transaction.id})"><i class="fas fa-edit"></i></button> 
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})"><i class="fas fa-trash"></i></button>
    `;

    list.appendChild(item);
}

// Fungsi untuk mengedit transaksi
function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);

    if (transaction) {
        text.value = transaction.text;
        amount.value = transaction.amount;

        removeTransaction(id); // Hapus transaksi lama sebelum disimpan
    }
}

// Menghapus transaksi
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

// Update total, pendapatan, dan pengeluaran
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const incomeAmount = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expenseAmount = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerHTML = `<i class="fas fa-rupiah-sign"></i> ${formatRupiah(total)}`;
    income.innerHTML = `<i class="fas fa-rupiah-sign"></i> ${formatRupiah(incomeAmount)}`;
    expense.innerHTML = `<i class="fas fa-rupiah-sign"></i> ${formatRupiah(expenseAmount)}`;
}

// Format Rupiah
function formatRupiah(angka) {
    return parseInt(angka).toLocaleString('id-ID', {
        style: 'decimal',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).replace('IDR', '').trim();
}

// Update Local Storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init aplikasi
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);
=======
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Local Storage - Mengambil atau mengatur transaksi awal
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorageTransactions !== null ? localStorageTransactions : [];

// Menambahkan transaksi baru
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Harap masukkan deskripsi dan nominal');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// Generate ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Menambahkan transaksi ke DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');
    item.classList.add('list-group-item', transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}Rp${formatRupiah(Math.abs(transaction.amount))}</span> 
        <button class="edit-btn" onclick="editTransaction(${transaction.id})"><i class="fas fa-edit"></i></button> 
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})"><i class="fas fa-trash"></i></button>
    `;

    list.appendChild(item);
}

// Fungsi untuk mengedit transaksi
function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);

    if (transaction) {
        text.value = transaction.text;
        amount.value = transaction.amount;

        removeTransaction(id); // Hapus transaksi lama sebelum disimpan
    }
}

// Menghapus transaksi
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

// Update total, pendapatan, dan pengeluaran
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const incomeAmount = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expenseAmount = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerHTML = `<i class="fas fa-rupiah-sign"></i> ${formatRupiah(total)}`;
    income.innerHTML = `<i class="fas fa-rupiah-sign"></i> ${formatRupiah(incomeAmount)}`;
    expense.innerHTML = `<i class="fas fa-rupiah-sign"></i> ${formatRupiah(expenseAmount)}`;
}

// Format Rupiah
function formatRupiah(angka) {
    return parseInt(angka).toLocaleString('id-ID', {
        style: 'decimal',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).replace('IDR', '').trim();
}

// Update Local Storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init aplikasi
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);
>>>>>>> 3cd3e5f3efdfedb3b84c5cd44ab6fd243193e592
