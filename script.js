// Get elements
const form = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const expenseList = document.getElementById("expense-list");
const totalEl = document.getElementById("total");
const filterInput = document.getElementById("filter");

// Load expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Save to localStorage
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Format currency
function formatCurrency(num) {
  return "Br " + num.toFixed(2);
}

// Render expenses
function renderExpenses() {
  const filter = filterInput.value;
  expenseList.innerHTML = "";

  const filtered = filter === "All"
    ? expenses
    : expenses.filter(e => e.category === filter);

  if (filtered.length === 0) {
    expenseList.innerHTML = "<p style='text-align:center;color:#999;'>No expenses yet.</p>";
  }

  filtered.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="info">
        <strong>${expense.description}</strong>
        <small>${expense.category} • ${expense.date}</small>
      </div>
      <div>
        <span>${formatCurrency(expense.amount)}</span>
        <button class="delete-btn" onclick="deleteExpense(${index})">X</button>
      </div>
    `;
    expenseList.appendChild(li);
  });

  updateTotal();
}

// Update total
function updateTotal() {
  const filter = filterInput.value;
  const filtered = filter === "All"
    ? expenses
    : expenses.filter(e => e.category === filter);

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);
  totalEl.textContent = formatCurrency(total);
}

// Delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  renderExpenses();
}

// Add expense
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const expense = {
    description: descriptionInput.value.trim(),
    amount: parseFloat(amountInput.value),
    category: categoryInput.value,
    date: dateInput.value,
  };

  expenses.push(expense);
  saveExpenses();
  renderExpenses();

  form.reset();
});

// Filter change
filterInput.addEventListener("change", renderExpenses);

// Initial render
renderExpenses();