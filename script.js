"use strict";

const btnEl = document.querySelectorAll(".btn");
const customPositionEl = document.querySelector(".custom--position");

const btnTipEl = document.querySelector(".btn--tip");

const tipEl = document.querySelector(".tip");
const totalEl = document.querySelector(".total");

const warningBillEl = document.querySelector(".warning-bill");
const warningPeopleEl = document.querySelector(".warning-people");

const inputFieldEl = document.querySelectorAll(".input-field");

const billEl = document.querySelector(".bill");
const peopleEl = document.querySelector(".people");

const placeHolderBillEl = document.querySelector(".placeholder--bill");
const placeHolderpeopleEl = document.querySelector(".placeholder--people");

const emptyNum = new Array(10);
const keyNum = Array.from(emptyNum, (num, i) => (num = i + 1) - 1);

let tip;
let billAmount;
let numPeople;
let totalTipPerPerson;

// Main function

function main() {
  btnEl.forEach((el) => {
    el.addEventListener("click", function () {
      const hasInput = checkInputField();
      const customerTipAmount = calculateTip(el);

      if (hasInput) {
        btnDefaultState();
        btnActivate(el);
        tipEl.textContent = `${Math.abs(tipPerPerson(customerTipAmount))}`;
        totalEl.textContent = `${Math.abs(
          Number(totalTipPerPerson).toFixed(2)
        )}`;
        btnTipEl.classList.remove("btn--default");
      }
      btnReset();
    });
  });
}

// calculate the total per person

function totalPerPerson(tipPercentage) {
  numPeople = Number(peopleEl.value);
  billAmount = Number(billEl.value);
  return (billAmount + tipPercentage) / numPeople;
}

// calculate the tip per person

function tipPerPerson(tipAmount) {
  numPeople = Number(peopleEl.value);
  return Number((tipAmount / numPeople).toFixed(2));
}

// calculate the tip

function calculateTip(element) {
  billAmount = Number(billEl.value);
  let tipPercentage = Number.parseFloat(element.textContent);
  if (
    !element.classList.contains("btn--active") &&
    !element.classList.contains("custom")
  ) {
    tip = billAmount * (tipPercentage / 100);
    totalTipPerPerson = totalPerPerson(tipPercentage);
    return tip;
  } else if (element.classList.contains("custom")) {
    tipPercentage = Number(element.value);
    tip = billAmount * (tipPercentage / 100);
    totalTipPerPerson = totalPerPerson(tipPercentage);
    return tip;
  }
}

// Function that does action if input field is active

function inputFieldActive() {
  keyNum.forEach((_, i) =>
    inputFieldEl.forEach((el) =>
      el.addEventListener("keydown", function (e) {
        if (e.key === String(i) && el.getAttribute("id") === "bill") {
          placeHolderBillEl.style.opacity = 0;
          warningBillEl.style.opacity = 0;
          billEl.style.outline = "2px solid hsl(172, 67%, 45%)";
        } else if (e.key === String(i) && el.getAttribute("id") === "people") {
          placeHolderpeopleEl.style.opacity = 0;
          warningPeopleEl.style.opacity = 0;
          peopleEl.style.outline = "2px solid hsl(172, 67%, 45%)";
        } else if (e.key === String(i) && el.getAttribute("id") === "custom") {
          customPositionEl.style.opacity = 0;
        }
      })
    )
  );
}

// Function for checking if input field is active

function checkInputField() {
  if (
    Number(
      window.getComputedStyle(placeHolderBillEl).getPropertyValue("opacity")
    ) === 1
  ) {
    warningBillEl.style.opacity = 1;
    billEl.style.outline = "2px solid hsl(27, 98%, 54%)";
    return false;
  } else if (
    Number(
      window.getComputedStyle(placeHolderpeopleEl).getPropertyValue("opacity")
    ) === 1
  ) {
    warningPeopleEl.style.opacity = 1;
    peopleEl.style.outline = "2px solid hsl(27, 98%, 54%)";
    return false;
  }

  return true;
}

// Function to reset everything

function btnReset() {
  btnTipEl.addEventListener("click", function () {
    btnTipEl.classList.add("btn--default");
    inputFieldEl.forEach((el) => (el.value = ""));
    placeHolderBillEl.style.opacity = 1;
    placeHolderpeopleEl.style.opacity = 1;
    billEl.style.outline = "none";
    peopleEl.style.outline = "none";
    tipEl.textContent = "0.00";
    totalEl.textContent = "0.00";
    customPositionEl.style.opacity = 1;
    btnEl.forEach((el) => el.classList.remove("btn--active"));
  });
}

// Tip button for UI activation

function btnActivate(element) {
  if (
    !element.classList.contains("btn--active") &&
    !element.classList.contains("custom")
  ) {
    element.classList.add("btn--active");
  }
}

// current btn default state

function btnDefaultState() {
  btnEl.forEach((el) => el.classList.remove("btn--active"));
}

inputFieldActive();
main();
