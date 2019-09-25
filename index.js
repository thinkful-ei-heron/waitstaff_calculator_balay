/* eslint-disable no-console */
'use strict';

const store = {
  mealDetails: {price: 0, tax: 0, tip: 0}, 
  charges: {subTotal: 0, tip: 0, total: 0}, 
  earnings: {tipTotal: 0, mealCount: 0, averageTip: 0}, 
  counter: 0, 
  totalTip: 0
};

function generateContent(mealDetails, charges, earnings) {
  $('.js-meal-details').html(`
  <form class='meal-details'>
    <h4>Enter the Meal Details</h4>
    <label for='price'>Base Meal Price: $</label>
    <input type='number' class='priceInput js-priceInput' placeholder='Enter a number' step="0.01"><br>
    <label for='tax'>Tax Rate: %</label>
    <input type='number' class='taxInput js-taxInput' placeholder='Enter a percentage' step="0.01"><br>
    <label for='tip'>Tip Percentage: %</label>
    <input type='number' class='tipInput js-tipInput' placeholder='ex. 20 for 20%' step="0.01"><br>
    <button type="submit" class='submitMealDetails'>Submit</button>
    <button type='button' class='resetMealDetails'>Cancel</button>
  </form>
  `);
  $('.js-charges').html(`
    <h4>Customer Charges</h4>
    <span>Subtotal: ${charges.subTotal}</span> <br>
    <span>Tip: ${charges.tip}</span> <br>
    <span>Total: ${charges.total}</span>
  `);
  $('.js-earnings').html(`
  <h4>My Earnings Info</h4>
  <span>Tip Total: ${earnings.tipTotal}</span> <br>
  <span>Meal Count: ${earnings.mealCount}</span> <br>
  <span>Average Tip Per Meal: ${earnings.averageTip}</span>
  `);
}

function render() {
  console.log('renderworking');
  let mealDetails = store.mealDetails;
  let charges = store.charges;
  let earnings = store.earnings;
  generateContent(mealDetails, charges, earnings);
}

function updateNums(price, tax, tip) {
  let item = store.mealDetails;
  item.price = item.price + parseFloat(price);
  item.tax = item.tax + parseFloat(tax) / 100;
  item.tip = item.tip + parseFloat(tip) / 100;
}

function handleCustomerCharges() {
  console.log('chargesworking');
  let details = store.mealDetails;
  let item = store.charges;
  item.subTotal = parseFloat((details.price + (details.tax * details.price)).toFixed(2));
  item.tip = parseFloat((item.subTotal * details.tip).toFixed(2));
  item.total = item.subTotal + item.tip;
  store.totalTip = store.totalTip + item.tip;
  console.log(store.totalTip);
}

function handleEarnings() {
  console.log('earningsworking');
  let charges = store.charges;
  let item = store.earnings;
  item.tipTotal = store.totalTip.toFixed(2);
  item.mealCount = store.counter;
  item.averageTip = parseFloat(item.tipTotal / item.mealCount).toFixed(2);
}

function clearMealDetails() {
  let meal = store.mealDetails;
  meal.price = 0;
  meal.tax = 0;
  meal.tip = 0;
  console.log(meal);
}

function handleMealDetails() {
  console.log('mealdetailsworking');
  $('.js-meal-details').on('submit', '.meal-details', event => {
    event.preventDefault();
    let price = $('.js-priceInput').val();
    let tax = $('.js-taxInput').val();
    let tip = $('.js-tipInput').val();
    $('.meal-details input[type="number"]').val('');
    store.counter = store.counter += 1;
    updateNums(price, tax, tip);
    handleCustomerCharges();
    handleEarnings();
    clearMealDetails();
    render();
  });
}

function handleClear() {
  $('.js-meal-details').on('click', '.resetMealDetails', event => {
    $('.meal-details input[type="number"]').val('');
  });
}

function resetCalculator() {
  $('.reset').on('click', '.resetButton', event => {
    store.mealDetails = {price: 0, tax: 0, tip: 0};
    store.charges = {subTotal: 0, tip: 0, total: 0};
    store.earnings = {tipTotal: 0, mealCount: 0, averageTip: 0};
    store.counter = 0;
    store.totalTip = 0;
    console.log(store);
    render();
  });
}


function calculate() {
  render();
  handleCustomerCharges();
  handleEarnings();
  clearMealDetails();
  handleMealDetails();
  handleClear();
  resetCalculator();
}

$(calculate);