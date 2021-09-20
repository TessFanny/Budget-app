const inputBudget = document.getElementById('budget-input')
const budgetAmount = document.getElementById('budget-amount')
const budgetForm = document.getElementById('budget-btn')
const inputExpenseName = document.getElementById('input-expenses-name')
const inputExpenseValue = document.getElementById('input-expenses-value')
const expenseForm = document.getElementById('btn-expenses')
const expenseAmount = document.getElementById('expense-amount')
const balanceAmount = document.getElementById('balance-amount')
const budgetErrorMsg = document.querySelector(".budget-error-msg")
const expenseErrorMsg = document.querySelector(".expense-error-msg")
const expenseContainer = document.querySelector('.expenses-container-title-value')
const expenseTitle = document.querySelector('.expenses-title')

let itemList = []
let itemId = 0


// add budget
const submitBudgetForm = ()=>{
  const value = +inputBudget.value 
  if(inputBudget.value === "" || inputBudget.value < 0){
    budgetErrorMsg.classList.add('show')
    setTimeout(() => {
      budgetErrorMsg.classList.remove('show')
    }, 3000);
  }else{
   budgetAmount.innerText = `${value}`
  inputBudget.value = ''
  showBalance()
  }
  
}


// submit expense form function
const submitExpenseForm = ()=>{
  const inputName = inputExpenseName.value
  const inputValue = +inputExpenseValue.value
  
  if(inputName === '' || inputValue === "" || inputValue < 0){
    expenseErrorMsg.classList.add('show')
    setTimeout(() => {
      expenseErrorMsg.classList.remove('show')
    }, 3000);
  }else{
  expenseAmount.innerText = `${inputValue}`
  inputExpenseValue.value = ''
  inputExpenseName.value = ''
  let expense = {
    id: itemId,
    title: inputName,
    amount: inputValue
  }
  itemId++
  itemList.push(expense)
  addExpenses(expense)
  showBalance()
  }
}

// creating title and value expense 
const addExpenses = (expense)=>{
  const div = document.createElement('div')
  div.classList.add('expense-values')
  div.innerHTML = `<div class="title-value">
  <h6 class="title">- ${expense.title}</h6>
  <h5 class="value">$${expense.amount}</h5>
</div>  
<div class="edit-trash-icons">
  <a href="#" data-id="${expense.id}" class="edit">
  <i class="far fa-edit" ></i>
  </a>
  <a href="#" data-id="${expense.id}" class="trash">
  <i class="far fa-trash-alt" ></i>
  </a>
</div>`
 expenseTitle.insertAdjacentElement('afterend', div)
 console.log(div);
}

// total expense 
const totalExpense = ()=>{
let total = 0
if(itemList.length>0){
  total = itemList.reduce((acc, curr)=>{
    acc += curr.amount
    return acc
  }, 0)
}
expenseAmount.textContent = total
return total
}

// show balance
const showBalance = ()=>{
  const expense = totalExpense()
  const total = +(budgetAmount.textContent) - expense
  balanceAmount.textContent = `$${total}`
  if(total<0){
    balanceAmount.classList.remove('show-green', 'show-black')
    balanceAmount.classList.add('show-red')
  }else if(total>0) {
    balanceAmount.classList.remove('show-red', 'show-black')
    balanceAmount.classList.add('show-green')
  }else if(total===0) {
    balanceAmount.classList.remove('show-red', 'show-green')
    balanceAmount.classList.add('show-black')
  }
}

// edit expense 
const editExpense = (element)=>{
  let id = parseInt(element.dataset.id)
  let parent = element.parentElement.parentElement
  expenseContainer.removeChild(parent)
  let expense = itemList.filter(item=> item.id ===id)
  // show values in the input
  inputExpenseName.value = expense[0].title
  inputExpenseValue.value = expense[0].amount
  // remove from list 
  let tempList = itemList.filter(item=>item.id !==id)
  itemList = tempList
  console.log(expense);
  showBalance()
}
const deleteExpense = (element)=>{
  let id = parseInt(element.dataset.id)
  let parent = element.parentElement.parentElement
  expenseContainer.removeChild(parent)
  let tempList = itemList.filter(item=> item.id !==id)
  itemList = tempList
  showBalance()  
}


// evenlisteners 

// submit budget form
budgetForm.addEventListener('submit', e=>{
  e.preventDefault()
  submitBudgetForm()
} )

// submit expense form
expenseForm.addEventListener('submit', e=>{
  e.preventDefault()
  submitExpenseForm()
} )
// submit edit and delete buttons
expenseContainer.addEventListener('click', e=>{
  if(e.target.parentElement.classList.contains('edit')){
    editExpense(e.target.parentElement)
  }else if(e.target.parentElement.classList.contains('trash')){
    deleteExpense(e.target.parentElement)
  }
})