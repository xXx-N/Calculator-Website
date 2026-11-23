const display = document.getElementById('display');
const operators = ['+', '-', '*', '/'];

function appendValue(value) {
  if (!display) return;

  if (display.value === 'Error') {
    display.value = '';
  }

  const lastChar = display.value.slice(-1);

  if (operators.includes(value) && operators.includes(lastChar)) {
    display.value = display.value.slice(0, -1) + value;
    return;
  }

  display.value += value;
}

function clearDisplay() {
  if (!display) return;
  display.value = '';
}

function deleteLast() {
  if (!display) return;

  if (display.value === 'Error') {
    display.value = '';
  } else {
    display.value = display.value.slice(0, -1);
  }
}

function calculate() {
  if (!display) return;

  try {
    if (!display.value) return;

    if (display.value.includes('/0')) {
      display.value = 'Error';
      return;
    }

    const result = eval(display.value);
    display.value = String(Math.round(result * 1000000) / 1000000);
  } catch (error) {
    display.value = 'Error';
  }
}

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if ((key >= '0' && key <= '9') || operators.includes(key) || key === '.') {
    appendValue(key);
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});