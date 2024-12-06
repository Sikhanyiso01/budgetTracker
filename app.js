//Referencing Our elements
let totalamount = document.getElementById
("total-Amount");
let userAmount = document.getElementById
("user-amount");
const checkAmountButton = document.getElementById
("check-amount");
const totalAmountButton = document.getElementById
("total-Amount-button");
const ExpenseTitle = document.getElementById
("expense-title");
const errorMessage = document.getElementById
("Budget-error");
const expenseTitleError = document.getElementById
("expense-title-error");
const expenseCostError = document.getElementById
("expense-cost-error");
const balanceValue = document.getElementById
("balance-amount");
const list = document.getElementById("list");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById
("expenditure-value");
let tempAmount = 0;

//set budget
totalAmountButton.addEventListener("click", () => {
    tempAmount = parseInt(totalamount.value);
    if (isNaN(tempAmount) || tempAmount <= 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        amount.innerText = tempAmount;
        balanceValue.innerText = tempAmount - parseInt(expenditureValue.innerText || 0);
        totalamount.value = "";
         // Clear input
    }
});


//function for disabling delete and edit 
const disabledButton = (bool) => {
    let editbutton = document.getElementsByClassName("edit");
    Array.from(editbutton).forEach(element => {
        element.disabbled = bool;  
    });
};

//function to modify list elements 

const modifyElements = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = parseInt(balanceValue.innerText);
    let currentExpense = parseInt(expenditureValue.innerText);
    let parentAmount = parseInt(parentDiv.querySelector(".amount").innerText);

    if (edit) {
        // Get the product name (expense title) and amount
        let parentText = parentDiv.querySelector(".product").innerText;
        ExpenseTitle.value = parentText; // Pre-fill inputs with current values
        userAmount.value = parentAmount;
        disabledButton(true); // Disable other edit buttons
    }

    // Update balance and expenses
    balanceValue.innerText = currentBalance + parentAmount;
    expenditureValue.innerText = currentExpense - parentAmount;

    // Remove the item from the list
    parentDiv.remove();
};

//create expense list

const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    sublistContent.innerHTML = `
        <p class="product">${expenseName}</p>
        <p class="amount">${expenseValue}</p>`;
    
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => modifyElements(editButton, true));

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash", "delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () => modifyElements(deleteButton));

    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    list.appendChild(sublistContent);
};


//function to clalculate baland and expense

checkAmountButton.addEventListener("click", () => {
    // Validation for empty inputs
    if (!userAmount.value || !ExpenseTitle.value) {
        expenseTitleError.classList.remove("hide");
        return;
    }
    expenseTitleError.classList.add("hide");
    
    // Parse values
    let expenditure = parseInt(userAmount.value);
    let sum = parseInt(expenditureValue.innerText || 0) + expenditure;

    // Update totals
    expenditureValue.innerText = sum;
    let totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;

    // Add the expense to the list
    listCreator(ExpenseTitle.value, expenditure);

    // Clear input fields
    ExpenseTitle.value = "";
    userAmount.value = "";
});
