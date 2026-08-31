    const expressionEl = document.getElementById('expression');
    const resultEl = document.getElementById('result');

    let currentInput = '0';
    let previousInput = '';
    let operator = null;
    let shouldResetResult = false;

    function updateDisplay() {
      resultEl.textContent = currentInput;
      if (operator !== null) {
        const symbol = operator === '*' ? '×' : operator === '/' ? '÷' : operator === '-' ? '−' : '+';
        expressionEl.textContent = `${previousInput} ${symbol}`;
      } else {
        expressionEl.textContent = '';
      }
    }

    function appendNumber(number) {
      if (currentInput === '0' || shouldResetResult) {
        currentInput = number;
        shouldResetResult = false;
      } else {
        currentInput += number;
      }
      updateDisplay();
    }

    function appendDecimal() {
      if (shouldResetResult) {
        currentInput = '0.';
        shouldResetResult = false;
      } else if (!currentInput.includes('.')) {
        currentInput += '.';
      }
      updateDisplay();
    }

    function appendOperator(op) {
      if (operator !== null && !shouldResetResult) {
        calculate();
      }
      previousInput = currentInput;
      operator = op;
      shouldResetResult = true;
      updateDisplay();
    }

    function calculate() {
      if (operator === null || shouldResetResult) return;

      const prev = parseFloat(previousInput);
      const current = parseFloat(currentInput);
      let res = 0;

      switch (operator) {
        case '+': res = prev + current; break;
        case '-': res = prev - current; break;
        case '*': res = prev * current; break;
        case '/': 
          if (current === 0) {
            currentInput = 'Error';
            operator = null;
            previousInput = '';
            shouldResetResult = true;
            updateDisplay();
            return;
          }
          res = prev / current; 
          break;
      }

      currentInput = Math.round(res * 1000000) / 1000000 + '';
      operator = null;
      previousInput = '';
      shouldResetResult = true;
      updateDisplay();
    }

    function clearDisplay() {
      currentInput = '0';
      previousInput = '';
      operator = null;
      shouldResetResult = false;
      updateDisplay();
    }

    function deleteLast() {
      if (shouldResetResult) return;
      if (currentInput.length === 1) {
        currentInput = '0';
      } else {
        currentInput = currentInput.slice(0, -1);
      }
      updateDisplay();
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
      if (e.key === '.') appendDecimal();
      if (e.key === '+' || e.key === '-') appendOperator(e.key);
      if (e.key === '*') appendOperator('*');
      if (e.key === '/') {
        e.preventDefault();
        appendOperator('/');
      }
      if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
      }
      if (e.key === 'Backspace') deleteLast();
      if (e.key === 'Escape') clearDisplay();
    });