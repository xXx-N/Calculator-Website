const display = document.getElementById('display') as HTMLInputElement | null;
const operators: string[] = ['+', '-', '*', '/'];

function appendValue(value: string): void {
  if (!display) return;
  
  if (display.value === 'Error') {
    display.value = '';
  }

  const lastChar: string = display.value.slice(-1);

  if (operators.includes(value) && operators.includes(lastChar)) {
    display.value = display.value.slice(0, -1) + value;
    return;
  }

  display.value += value;
}

function clearDisplay(): void {
  if (!display) return;
  display.value = '';
}

function deleteLast(): void {
  if (!display) return;
  
  if (display.value === 'Error') {
    display.value = '';
  } else {
    display.value = display.value.slice(0, -1);
  }
}

function calculate(): void {
  if (!display) return;
  
  try {
    if (!display.value) return;

    if (display.value.includes('/0')) {
      display.value = 'Error';
      return;
    }

    const result: number = eval(display.value);
    display.value = String(Math.round(result * 1000000) / 1000000);
  } catch (error) {
    display.value = 'Error';
  }
}

document.addEventListener('keydown', (event: KeyboardEvent): void => {
  const key: string = event.key;

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