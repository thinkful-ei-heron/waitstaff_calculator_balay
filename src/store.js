/* eslint-disable no-console */

let mealDetails = {price: 0, tax: 0, tip: 0};
let charges = {subTotal: 0, tip: 0, total: 0};
let earnings = {tipTotal: 0, mealCount: 0, averageTip: 0};
let counter = 0;
let totalTip = 0;


function updateNums(price, tax, tip) {
  let item = this.mealDetails;
  item.price = item.price + parseFloat(price);
  item.tax = item.tax + parseFloat(tax) / 100;
  item.tip = item.tip + parseFloat(tip) / 100;
}

function handleCustomerCharges() {
  let details = this.mealDetails;
  let item = this.charges;
  item.subTotal = (details.price + (details.tax * details.price)).toFixed(2);
  item.tip = (item.subTotal * details.tip).toFixed(2);
  item.total = (parseFloat(item.subTotal) + parseFloat(item.tip)).toFixed(2);
  this.totalTip = this.totalTip + parseFloat(item.tip);
}

function handleEarnings() {
  console.log('earningsworking');
  let item = this.earnings;
  item.tipTotal = parseFloat(this.totalTip).toFixed(2);
  item.mealCount = this.counter;
  item.averageTip = parseFloat(item.tipTotal / item.mealCount).toFixed(2);
}
  
function clearMealDetails() {
  let meal = this.mealDetails;
  meal.price = 0;
  meal.tax = 0;
  meal.tip = 0;
}

function incrementCount() {
  this.counter = this.counter += 1;
}

function resetCalc() {
  this.mealDetails = {price: 0, tax: 0, tip: 0};
  this.charges = {subTotal: 0, tip: 0, total: 0};
  this.earnings = {tipTotal: 0, mealCount: 0, averageTip: 0};
  this.counter = 0;
  this.totalTip = 0;
}


export default {
  mealDetails,
  charges,
  earnings,
  counter,
  totalTip,
  updateNums,
  handleCustomerCharges,
  handleEarnings,
  clearMealDetails,
  incrementCount, 
  resetCalc
};