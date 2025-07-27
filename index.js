`use strict`;

// Core Layer
let shouldResetScreen = false;

// Function that takes two string arguements, our previous display and our current display

function calculateOperation(str1, str2) {
  // 4 "if" statements look for a specific operator.
  if (str1.includes(`+`)) {
    let operator = "+";
    // once we find the operator, we have to seperate the string into its number and away from its operator.
    let firstOperand = str1.slice(0, str1.indexOf(`+`));
    // we also turn the current input from a string into a number

    let secondOperand = Number(str2);

    // finally, we add the two numbers together
    let total = Number(firstOperand) + secondOperand;
    // we clear everything so that it appears to the user as if a calculation has gone through.

    allClear();
    // Then, our total is turned into a string that is displayed onto our display
    currentOutput.innerText = total.toString();
    // This sets up the logic to prevent the user from appending more numbers to result

    shouldResetScreen = true;
    // displays the history so that the user knows their calculation went through

    getHistory(firstOperand, secondOperand, operator);
  }

  if (str1.includes("-")) {
    let operator = "-";
    let firstOperand = str1.slice(0, str1.indexOf(`-`));
    let secondOperand = Number(str2);
    let total = Number(firstOperand) - secondOperand;
    allClear();
    currentOutput.innerText = total.toString();
    shouldResetScreen = true;
    getHistory(firstOperand, secondOperand, operator);
  }

  if (str1.includes(`×`)) {
    let operator = "×";
    let firstOperand = str1.slice(0, str1.indexOf(`×`));
    let secondOperand = Number(str2);
    let firstTotal = Number(firstOperand) * secondOperand;
    let total = firstTotal.toFixed(2);
    allClear();
    currentOutput.innerText = total.toString();
    shouldResetScreen = true;
    getHistory(firstOperand, secondOperand, operator);
  }

  // && str2[0] !== 0
  if (str1.includes("÷") && str2 !== "0") {
    let operator = "÷";
    let firstOperand = str1.slice(0, str1.indexOf(`÷`));
    let secondOperand = Number(str2);
    let firstTotal = Number(firstOperand) / secondOperand;
    let total = firstTotal.toFixed(2);
    allClear();
    currentOutput.innerText = total.toString();
    shouldResetScreen = true;
    getHistory(firstOperand, secondOperand, operator);
  } else if (str2 === "0") {
    allClear();
    shouldResetScreen = true;
    currentOutput.innerHTML = "NaN !";
  }
}

// DOM Layer - 2

//1.  I need a way to declare all my vars for now
const numberBtn = document.querySelectorAll(`.calc__btn--num`);
const operationBtn = document.querySelectorAll(`.calc__btn--op`);
const equalBtn = document.querySelector(`.calc__btn--equal`);
const allClearBtn = document.querySelector(`.calc__btn--clear`);
const deleteBtn = document.querySelector(`.calc__btn--delete`);
const prevOutput = document.querySelector(`.previous`);
const currentOutput = document.querySelector(`.current`);
const calcHistory = document.querySelector("[data-history]");

// Used to Clear Previous and Current Output

function allClear() {
  // sets the inner text to an empty string effectively "clearing" it
  currentOutput.innerText = "";
  prevOutput.innerText = "";
  calcHistory.innerText = "";
}

///////

function deleteInput() {
  if (prevOutput.innerText !== "") {
    let deletedPrevString = prevOutput.innerText.slice(0, -1);
    prevOutput.innerText = deletedPrevString;
  } else if (currentOutput.innerText !== "") {
    let deletedString = currentOutput.innerText.slice(0, -1);
    currentOutput.innerText = deletedString;
  } else if (calcHistory.innerText !== "") {
    allClear();
  }
}

// Updates our display depending on the value that the individual buttons give us
// It might be helpful to look at the eventListeners to see where we are calling these
// functions.
function updateDisplay(userButton) {
  if (shouldResetScreen) {
    currentOutput.innerText = "";
    shouldResetScreen = false;
  }

  if (!currentOutput.innerText.includes(".")) {
    // continuously adds the input from our calculator button to the display unless we already have a period
    // appends any number pressed but only allows for 1 period
    currentOutput.innerText += userButton;
  } else if (currentOutput.innerText.includes(`.`) && userButton !== `.`) {
    currentOutput.innerText += userButton;
  }
}

// A second update display function is used to stop a user from
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

function getHistory(firstStr, secondNumber, operatorStr) {
  let totalDisplay =
    firstStr + " " + `${operatorStr}` + ` ${secondNumber.toString()}` + " = ";
  calcHistory.innerText = totalDisplay;
  hideHistory(totalDisplay);
}

function hideHistory(totalStr) {
  let hiddenText = totalStr + currentOutput.innerText;
  console.log(hiddenText, currentOutput.innerText);
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
});

equalBtn.addEventListener(`click`, () => {
  calculateOperation(prevOutput.innerText, currentOutput.innerText);
});

allClearBtn.addEventListener(`click`, () => {
  allClear();
});

deleteBtn.addEventListener("click", () => {
  deleteInput();
});
