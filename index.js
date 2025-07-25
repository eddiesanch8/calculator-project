`use strict`;

// Core Layer

// const operatorList = ["+", "-", "=", "×", "÷"];

// this code is being used to display hidden message
// let totalDisplay =
//   firstOperand + " " + "+" + ` ${secondOperand.toString()}` + " = ";
// prevOutput.innerText = totalDisplay;

function calculateOperation(str1, str2) {
  if (str1.includes(`+`)) {
    let firstOperand = str1.slice(0, str1.indexOf(`+`));
    let secondOperand = Number(str2);
    let total = Number(firstOperand) + secondOperand;
    allClear();
    currentOutput.innerText = total.toString();
    console.log(`You can add`);
  }

  if (str1.includes("-")) {
    let firstOperand = str1.slice(0, str1.indexOf(`-`));
    let secondOperand = Number(str2);
    let total = Number(firstOperand) - secondOperand;
    allClear();
    currentOutput.innerText = total.toString();
    console.log("You Subtracted");
  }

  if (str1.includes(`×`)) {
    let firstOperand = str1.slice(0, str1.indexOf(`×`));
    let secondOperand = Number(str2);
    let total = Number(firstOperand) + secondOperand;
    allClear();
    currentOutput.innerText = total.toString();
    console.log("You multiplied");
  }
  // && str2[0] !== 0
  if (str1.includes("÷") && !str2.startsWith("0")) {
    let firstOperand = str1.slice(0, str1.indexOf(`÷`));
    let secondOperand = Number(str2);
    let total = Number(firstOperand) / secondOperand;
    allClear();
    currentOutput.innerText = total.toString();
    console.log("You divided");
  } else if (str2.startsWith("0")) {
    allClear();
    currentOutput.innerHTML = "NaN !";
  }
}

// Core Functionality with Joe

// DOM Layer - 2

// handle this as the calculation
let currentHistory = [];

// displays calculation
let currentDisplay = "";

let numberHistory = ["number1", "operator", "="];

//1.  I need a way to declare all my vars for now
const numberBtn = document.querySelectorAll(`.calc__btn--num`);
const operationBtn = document.querySelectorAll(`.calc__btn--op`);
const equalBtn = document.querySelector(`.calc__btn--equal`);
const allClearBtn = document.querySelector(`.calc__btn--clear`);
const deleteBtn = document.querySelector(`.calc__btn--delete`);
const prevOutput = document.querySelector(`.previous`);
const currentOutput = document.querySelector(`.current`);

// Used to Clear Previous and Current Output

function allClear() {
  // sets the inner text to an empty string effectively "clearing" it
  currentOutput.innerText = "";
  prevOutput.innerText = "";
}

// Updates our display depending on the value that the individual buttons give us
// It might be helpful to look at the eventListeners to see where we are calling these
// functions.
function updateDisplay(userButton) {
  // continuously adds the input from our calculator button to the display unless we already have a period
  if (!currentOutput.innerText.includes(".")) {
    // appends any number pressed but only allows for 1 period
    currentOutput.innerText += userButton;
  } else if (currentOutput.innerText.includes(`.`) && userButton !== `.`) {
    currentOutput.innerText += userButton;
  }
}

// A second update display functioned is used to stop a user from
// adding multiple operators to the field

function updateDisplay2(userButton) {
  // The logic is: if the user presses any operator and
  // the our top line on our calculator doesn't already have that operator,
  // then and only then, can we append the operator that is initially pressed.
  // Prevents bugs like: 3+++++ and 3 - + 4 / 2 from displaying.

  if (
    (userButton === `+` && !prevOutput.innerText.includes(`+`)) ||
    (userButton === `-` && !prevOutput.innerText.includes(`-`)) ||
    (userButton === `÷` && !prevOutput.innerText.includes(`÷`)) ||
    (userButton === `×` && !prevOutput.innerText.includes(`×`))
  ) {
    // appends operator to string
    currentOutput.innerText += userButton;

    // moves text up and out of the way so that user can continue to use the calculator once
    // operator is being pressed
    prevOutput.innerText = currentOutput.innerText;
    currentOutput.innerText = ``;
  } else if (
    (userButton === `+` && prevOutput.innerText.includes(`+`)) ||
    (userButton === `-` && prevOutput.innerText.includes(`-`)) ||
    (userButton === `÷` && prevOutput.innerText.includes(`÷`)) ||
    (userButton === `×` && prevOutput.innerText.includes(`×`))
  ) {
    calculateOperation(prevOutput.innerText, currentOutput.innerText);
  }
}

// DOM Layer

numberBtn.forEach((btn) => {
  btn.addEventListener(`click`, () => {
    numChoice = btn.innerText;
    updateDisplay(numChoice);
  });
});

operationBtn.forEach((btn) => {
  btn.addEventListener(`click`, () => {
    operand = btn.innerText;
    updateDisplay2(operand);

    // end of Event Listner
  });

  // End of .forEach function
});

equalBtn.addEventListener(`click`, () => {
  console.log(prevOutput.innerText);

  calculateOperation(prevOutput.innerText, currentOutput.innerText);
});

allClearBtn.addEventListener(`click`, () => {
  // Sets all strings to empty on display

  allClear();
});
