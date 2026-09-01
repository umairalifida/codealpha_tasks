const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const equalsButton = document.querySelector(".equals");

let currentNumber = "";
let previousNumber = "";
let operator = null;

function updateDisplay() {
  if (currentNumber !== "") {
    currentDisplay.textContent = currentNumber;
  } else if (previousNumber !== "") {
    currentDisplay.textContent = previousNumber;
  } else {
    currentDisplay.textContent = "0";
  }

  if (previousNumber !== "" && operator !== null) {
    previousDisplay.textContent =
      previousNumber + " " + getOperatorSymbol(operator);
  } else {
    previousDisplay.textContent = "";
  }
}

function getOperatorSymbol(op) {
  if (op === "*") return "×";
  if (op === "/") return "÷";
  if (op === "-") return "−";
  if (op === "+") return "+";
  if (op === "%") return "%";

  return op;
}

function appendNumber(number) {
  if (currentNumber === "Error") {
    currentNumber = "";
  }

  if (number === "." && currentNumber.includes(".")) {
    return;
  }

  if (currentNumber === "") {
    currentNumber = number;
  } else if (currentNumber === "0" && number !== ".") {
    currentNumber = number;
  } else {
    currentNumber += number;
  }

  updateDisplay();
}

function chooseOperator(selectedOperator) {
  if (currentNumber === "" && previousNumber !== "") {
    operator = selectedOperator;

    updateDisplay();

    return;
  }

  if (currentNumber === "") {
    return;
  }

  if (previousNumber !== "" && operator !== null) {
    const result = performCalculation(
      parseFloat(previousNumber),
      parseFloat(currentNumber),
      operator,
    );

    if (result === "Error") {
      currentNumber = "Error";
      previousNumber = "";
      operator = null;

      updateDisplay();

      return;
    }

    previousNumber = result.toString();
  } else {
    previousNumber = currentNumber;
  }

  // Current empty
  currentNumber = "";

  // New operator
  operator = selectedOperator;

  updateDisplay();
}

// ======================================
// ACTUAL CALCULATION
// ======================================

function performCalculation(first, second, op) {
  let result;

  switch (op) {
    case "+":
      result = first + second;

      break;

    case "-":
      result = first - second;

      break;

    case "*":
      result = first * second;

      break;

    case "/":
      if (second === 0) {
        return "Error";
      }

      result = first / second;

      break;

    case "%":
      result = first % second;

      break;

    default:
      return second;
  }

  return Number(result.toFixed(10));
}

function calculate() {
  if (previousNumber === "" || currentNumber === "" || operator === null) {
    return;
  }

  const first = parseFloat(previousNumber);

  const second = parseFloat(currentNumber);

  const result = performCalculation(first, second, operator);

  if (result === "Error") {
    currentNumber = "Error";

    previousNumber = "";

    operator = null;

    updateDisplay();

    return;
  }

  currentNumber = result.toString();

  previousNumber = "";

  operator = null;

  updateDisplay();
}

function clearCalculator() {
  currentNumber = "";

  previousNumber = "";

  operator = null;

  updateDisplay();
}

function deleteNumber() {
  if (currentNumber === "Error") {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.slice(0, -1);
  }

  updateDisplay();
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.dataset.number);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperator(button.dataset.operator);
  });
});

equalsButton.addEventListener("click", calculate);

clearButton.addEventListener("click", clearCalculator);

deleteButton.addEventListener("click", deleteNumber);

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    appendNumber(key);

    return;
  }

  if (key === ".") {
    appendNumber(".");

    return;
  }

  if (key === "+" || key === "-" || key === "*" || key === "/") {
    chooseOperator(key);

    return;
  }

  // Percentage
  if (key === "%") {
    chooseOperator("%");

    return;
  }

  if (key === "Enter" || key === "=") {
    event.preventDefault();

    calculate();

    return;
  }

  if (key === "Backspace") {
    deleteNumber();

    return;
  }

  if (key === "Escape") {
    clearCalculator();

    return;
  }
});
