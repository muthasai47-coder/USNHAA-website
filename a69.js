// -----------------------------
// Initial Data
// -----------------------------

let budget = 25000;

let totalSpent = 0;

let totalIncome = 0;

let transactions = [];


// -----------------------------
// Add Transaction
// -----------------------------

function addTransaction() {

    const type =
        document.getElementById("type").value;

    const description =
        document.getElementById("description").value.trim();

    const amount =
        Number(document.getElementById("amount").value);

    const category =
        document.getElementById("category").value;


    if (description === "" || amount <= 0) {

        alert("Please enter valid transaction details.");

        return;
    }


    const transaction = {

        type: type,

        description: description,

        amount: amount,

        category: category

    };


    transactions.unshift(transaction);


    if (type === "expense") {

        totalSpent += amount;

    } else {

        totalIncome += amount;

    }


    updateDashboard();


    document.getElementById("description").value = "";

    document.getElementById("amount").value = "";

}


// -----------------------------
// Update Dashboard
// -----------------------------

function updateDashboard() {

    const remaining = budget - totalSpent;


    document.getElementById("budgetDisplay").innerText =
        "₹" + budget.toLocaleString("en-IN");


    document.getElementById("spentDisplay").innerText =
        "₹" + totalSpent.toLocaleString("en-IN");


    document.getElementById("remainingDisplay").innerText =
        "₹" + remaining.toLocaleString("en-IN");


    document.getElementById("incomeDisplay").innerText =
        "₹" + totalIncome.toLocaleString("en-IN");


    // Budget progress

    let percentage = (totalSpent / budget) * 100;


    if (percentage > 100) {

        percentage = 100;

    }


    document.getElementById("progress").style.width =
        percentage + "%";


    document.getElementById("percentageText").innerText =
        Math.round((totalSpent / budget) * 100) + "% used";


    updateTransactions();

    updateSmartTip();

}


// -----------------------------
// Show Transactions
// -----------------------------

function updateTransactions() {

    const container =
        document.getElementById("transactions");


    container.innerHTML = "";


    if (transactions.length === 0) {

        container.innerHTML =
            '<div class="empty">No transactions yet.</div>';

        return;
    }


    transactions.slice(0, 8).forEach(function(item) {

        const div =
            document.createElement("div");

        div.className = "transaction";


        const sign =
            item.type === "income" ? "+" : "-";


        const amountClass =
            item.type === "income"
                ? "incomeAmount"
                : "amount";


        div.innerHTML = `

            <div class="transaction-info">

                <div class="icon">
                    ${item.category.split(" ")[0]}
                </div>

                <div>

                    <strong>${item.description}</strong>

                    <br>

                    <small>${item.category}</small>

                </div>

            </div>

            <div class="${amountClass}">
                ${sign} ₹${item.amount.toLocaleString("en-IN")}
            </div>

        `;


        container.appendChild(div);

    });

}


// -----------------------------
// Smart Suggestions
// -----------------------------

function updateSmartTip() {

    const tip =
        document.getElementById("smartTip");


    const percentage =
        (totalSpent / budget) * 100;


    if (totalSpent === 0) {

        tip.innerText =
            "Add your first transaction to get a smart spending suggestion.";

    }

    else if (percentage >= 100) {

        tip.innerText =
            "⚠️ Your budget is completely used. Try reducing unnecessary expenses.";

    }

    else if (percentage >= 80) {

        tip.innerText =
            "⚠️ You have used more than 80% of your budget. Spend carefully for the remaining days.";

    }

    else if (percentage >= 50) {

        tip.innerText =
            "👍 You have used more than half of your budget. Keep an eye on your spending.";

    }

    else {

        tip.innerText =
            "🎉 Great job! Your spending is currently under control.";

    }

}


// -----------------------------
// Start Dashboard
// -----------------------------

updateDashboard();