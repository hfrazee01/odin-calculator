let firstOperand = null;
let secondOperand = null;
let operator = null;
let displayValue = "0";
let buttons = document.querySelectorAll('button');

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
    for (let i=0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            if (buttons[i].classList.contains("operand")) {
                inputOperand(parseInt(buttons[i].value))
                updateDisplay();
            } else if (buttons[i].classList.contains("operator")) {
                inputOperator(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].classList.contains("equals")) {
                firstOperand = operate(firstOperand, secondOperand, operator);
                displayValue = firstOperand.toString();
                updateDisplay();
            } else if (buttons[i].id.contains("percent")) {
                // input percent function
            } else if (buttons[i].id.contains("clear")) {
                // input clear function
            } else if (buttons[i].id.contains("sign")) {
                // input sign function
            } else if (buttons[i].classList.contains("decimal")) {

            }
        })
    }
}

clickButton();

function inputOperand(operand) {
    if (firstOperand === null) {
        firstOperand = operand;
        displayValue = firstOperand.toString();
    } else if (firstOperand && operator === null) {
        firstOperand = firstOperand * 10 + operand;
        displayValue = firstOperand.toString();
    } else if (secondOperand === null) {
        secondOperand = operand;
        displayValue = secondOperand.toString();
    } else if (secondOperand) {
        secondOperand = secondOperand * 10 + operand;
        displayValue = secondOperand.toString();
    }
}

function inputOperator(op) {
    if (operator && secondOperand) {
        firstOperand = operate(firstOperand, secondOperand, operator);
        secondOperand = null;
        displayValue = firstOperand.toString();
    }
    operator = op;
}