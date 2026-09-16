const display = document.getElementById("display") as HTMLDivElement;
const previousDisplay = document.getElementById("previous-display") as HTMLDivElement;

const numberButtons =
    document.querySelectorAll(".number") as NodeListOf<HTMLButtonElement>;

const operatorButtons =
    document.querySelectorAll(".operator") as NodeListOf<HTMLButtonElement>;

const equalsButton =
    document.getElementById("equals") as HTMLButtonElement;

const clearButton =
    document.getElementById("clear") as HTMLButtonElement;

const deleteButton =
    document.getElementById("delete") as HTMLButtonElement;

const percentButton =
    document.getElementById("percent") as HTMLButtonElement;


let currentInput = "0";
let previousInput = "";
let operator = "";

let shouldResetDisplay = false;


function updateDisplay(): void {

    display.textContent = currentInput;

    if (previousInput && operator) {
        previousDisplay.textContent =
            `${previousInput} ${operator}`;
    } else {
        previousDisplay.textContent = "";
    }
}


function enterNumber(number: string): void {

    if (shouldResetDisplay) {
        currentInput = "0";
        shouldResetDisplay = false;
    }

    if (number === "." && currentInput.includes(".")) {
        return;
    }

    if (currentInput === "0" && number !== ".") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay();
}


function chooseOperator(selectedOperator: string): void {

    if (operator && !shouldResetDisplay) {
        calculate();
    }

    previousInput = currentInput;
    operator = selectedOperator;

    shouldResetDisplay = true;

    updateDisplay();
}


function calculate(): void {

    if (!previousInput || !operator) {
        return;
    }

    const firstNumber = parseFloat(previousInput);
    const secondNumber = parseFloat(currentInput);

    let result: number;

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


function clearCalculator(): void {

    currentInput = "0";
    previousInput = "";
    operator = "";

    shouldResetDisplay = false;

    updateDisplay();
}


function deleteNumber(): void {

    if (currentInput === "Error") {
        clearCalculator();
        return;
    }

    if (currentInput.length === 1) {
        currentInput = "0";
    } else {
        currentInput = currentInput.slice(0, -1);
    }

    updateDisplay();
}


function calculatePercentage(): void {

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