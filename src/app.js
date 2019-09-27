/* eslint-disable no-console */

import $ from 'jquery';
import store from './store';


function generateContent(charges, earnings) {
  $('.js-meal-details').html(`
  <form class='meal-details'>
    <h4>Enter the Meal Details</h4>
    <label for='price'>Base Meal Price:</label>
    <input type='number' class='priceInput js-priceInput' placeholder='ex. 20' step="0.01"><br><br>
    <label for='tax' class="tax-label">Tax Rate:</label>
    <input type='number' class='taxInput js-taxInput' placeholder='ex. 3.5' step="0.01"><br><br>
    <label for='tip'>Tip Percentage:</label>
    <input type='number' class='tipInput js-tipInput' placeholder='ex. 20' step="0.01"><br><br>
    <div><button type="submit" class='submitMealDetails'>Submit</button>
    <button type='button' class='resetMealDetails'>Cancel</button></div>
  </form>
  `);
  $('.js-charges').html(`
    <h4>Customer Charges</h4>
    <span>Subtotal: ${charges.subTotal}</span> <br><br>
    <span>Tip: ${charges.tip}</span> <br><br>
    <span>Total: ${charges.total}</span>
  `);
  $('.js-earnings').html(`
  <h4>My Earnings Info</h4>
  <span>Tip Total: ${earnings.tipTotal}</span> <br><br>
  <span>Meal Count: ${earnings.mealCount}</span> <br><br>
  <span>Average Tip: ${earnings.averageTip}</span>
  `);
}

function render() {
  let charges = store.charges;
  let earnings = store.earnings;
  generateContent(charges, earnings);
}

function handleMealDetails() {
  $('.js-meal-details').on('submit', '.meal-details', event => {
    event.preventDefault();
    let price = $('.js-priceInput').val();
    let tax = $('.js-taxInput').val();
    let tip = $('.js-tipInput').val();
    $('.meal-details input[type="number"]').val('');
    store.incrementCount();
    store.updateNums(price, tax, tip);
    store.handleCustomerCharges();
    store.handleEarnings();
    store.clearMealDetails();
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
    store.resetCalc();
    render();
  });
}


function bindEventListeners() {
  handleMealDetails();
  handleClear();
  resetCalculator();
}
  
export default {
  render,
  bindEventListeners
};