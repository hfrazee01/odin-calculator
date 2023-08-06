let firstNumber;
let secondNumber;
let operator;

const operate = function(num1, num2, op) {
    if (op == "+") 
        return num1 + num2;
    else if (op == "-") 
        return num1 - num2;
    else if (op == "x") 
        return num1 * num2;
    else if (op == "/") {
        if (num2 == 0) return "You can't divide by zero, silly goose!";
        else return num1 / num2;
    } else 
        return "That's not an operation! Try again!";
}