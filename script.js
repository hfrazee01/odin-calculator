let firstOperand = null;
let secondOperand = null;
let operator = null;
let displayValue = "0";
let hasDecimal = false;
let buttons = document.querySelectorAll('button');

window.addEventListener("keydown", function(e) {
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});

function operate(op1, op2, operand) {
    if (operand === "+")
        return op1 + op2;
    else if (operand === "-")
        return op1 - op2;
    else if (operand === "x")
        return op1 * op2;
    else if (operand === "/") {
        if (op2 === 0) return "Error";
        else return op1 / op2;
    } else
        return "0";
}

function updateDisplay() {
    let display = document.querySelector(".display");
    if (displayValue.length > 10) display.innerHTML = displayValue.substring(0, 9);
    else display.innerHTML = displayValue;
}

updateDisplay();

function clickButton() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            if (buttons[i].classList.contains("operand")) {
                inputOperand(parseInt(buttons[i].value))
                updateDisplay();
            } else if (buttons[i].classList.contains("operator")) {
                inputOperator(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].classList.contains("equals")) {
                solve();
                updateDisplay();
            } else if (buttons[i].id === "percent") {
                makePercentage();
                updateDisplay();
            } else if (buttons[i].id === "clear") {
                clearDisplay();
                updateDisplay();
            } else if (buttons[i].id === "sign") {
                negate()
                updateDisplay();
            } else if (buttons[i].classList.contains("decimal")) {
                inputDecimal()
                updateDisplay();
            }
        })
    }
}

clickButton();

function inputOperand(operand) {
    if (firstOperand === null) {
        firstOperand = operand;
        displayValue = firstOperand.toString();
    } else if (firstOperand !== null && operator === null) {
        if (hasDecimal) firstOperand = parseFloat(firstOperand.toString() + "." + operand.toString());
        else firstOperand = firstOperand * 10 + operand;
        displayValue = firstOperand.toString();
    } else if (secondOperand === null) {
        secondOperand = operand;
        displayValue = secondOperand.toString();
    } else if (secondOperand !== null) {
        if (hasDecimal) secondOperand = parseFloat(secondOperand.toString() + "." + operand.toString());
        else secondOperand = secondOperand * 10 + operand;
        displayValue = secondOperand.toString();
    }
}

function inputOperator(op) {
    if (operator && secondOperand !== null) {
        firstOperand = operate(firstOperand, secondOperand, operator);
        secondOperand = null;
        displayValue = firstOperand.toString();
    }
    operator = op;
}

function inputDecimal() {
    if (hasDecimal) return;
    else {
        displayValue += ".";
        hasDecimal = true;
    }
}

function solve() {
    firstOperand = operate(firstOperand, secondOperand, operator);
    displayValue = firstOperand.toString();
    secondOperand = null;
    operator = null;
}

function makePercentage() {
    if (secondOperand !== null && secondOperand.toString() === displayValue) {
        secondOperand = operate(secondOperand, 100, "/");
        displayValue = secondOperand.toString();
    } else if (firstOperand !== null) {
        firstOperand = operate(firstOperand, 100, "/");
        displayValue = firstOperand.toString();
    }
}

function clearDisplay() {
    displayValue = "0";
    firstOperand = null;
    secondOperand = null;
    operator = null;

    if (displayValue.includes(".")) hasDecimal = true;
    else hasDecimal = false;
}

function negate() {
    if (secondOperand && secondOperand.toString() === displayValue) {
        secondOperand *= -1;
        displayValue = secondOperand.toString();
    } else if (firstOperand) {
        firstOperand *= -1;
        displayValue = firstOperand.toString();
    }
}