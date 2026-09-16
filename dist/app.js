"use strict";
const display = document.getElementById("display");
const previousDisplay = document.getElementById("previous-display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const percentButton = document.getElementById("percent");
let currentInput = "0";
let previousInput = "";
let operator = "";
let shouldResetDisplay = false;
function updateDisplay() {
    display.textContent = currentInput;
    if (previousInput && operator) {
        previousDisplay.textContent =
            `${previousInput} ${operator}`;
    }
    else {
        previousDisplay.textContent = "";
    }
}
function enterNumber(number) {
    if (shouldResetDisplay) {
        currentInput = "0";
        shouldResetDisplay = false;
    }
    if (number === "." && currentInput.includes(".")) {
        return;
    }
    if (currentInput === "0" && number !== ".") {
        currentInput = number;
    }
    else {
        currentInput += number;
    }
    updateDisplay();
}
function chooseOperator(selectedOperator) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = selectedOperator;
    shouldResetDisplay = true;
    updateDisplay();
}
function calculate() {
    if (!previousInput || !operator) {
        return;
    }
    const firstNumber = parseFloat(previousInput);
    const secondNumber = parseFloat(currentInput);
    let result;
    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "*":
            result = firstNumber * secondNumber;
            break;
        case "/":
            if (secondNumber === 0) {
                currentInput = "Error";
                previousInput = "";
                operator = "";
                updateDisplay();
                return;
            }
            result = firstNumber / secondNumber;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    previousInput = "";
    operator = "";
    shouldResetDisplay = true;
    updateDisplay();
}
function clearCalculator() {
    currentInput = "0";
    previousInput = "";
    operator = "";
    shouldResetDisplay = false;
    updateDisplay();
}
function deleteNumber() {
    if (currentInput === "Error") {
        clearCalculator();
        return;
    }
    if (currentInput.length === 1) {
        currentInput = "0";
    }
    else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}
function calculatePercentage() {
    const number = parseFloat(currentInput);
    if (isNaN(number)) {
        return;
    }
    currentInput = (number / 100).toString();
    updateDisplay();
}
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        enterNumber(button.textContent || "0");
    });
});
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedOperator = button.dataset.operator;
        if (selectedOperator) {
            chooseOperator(selectedOperator);
        }
    });
});
equalsButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clearCalculator);
deleteButton.addEventListener("click", deleteNumber);
percentButton.addEventListener("click", calculatePercentage);
updateDisplay();
