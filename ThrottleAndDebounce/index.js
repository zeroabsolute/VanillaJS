buildInterface();

function buildInterface() {
  const container = document.getElementById('container');
  const inputContainer = document.createElement('div');
  const normalInput = document.createElement('input');
  const debouncedInput = document.createElement('input');
  const throttledInput = document.createElement('input');
  const outputContainer = document.createElement('div');
  const normalOutput = document.createElement('p');
  const debouncedOutput = document.createElement('p');
  const throttledOutput = document.createElement('p');

  container.append(inputContainer, outputContainer);
  inputContainer.append(normalInput, debouncedInput, throttledInput);
  outputContainer.append(normalOutput, debouncedOutput, throttledOutput);

  normalInput.type = 'text';
  debouncedInput.type = 'text';
  throttledInput.type = 'text';

  inputContainer.style.display = 'flex';
  inputContainer.style.justifyContent = 'space-between';
  outputContainer.style.display = 'flex';
  outputContainer.style.justifyContent = 'space-between';

  normalInput.style.width = '30%';
  debouncedInput.style.width = '30%';
  throttledInput.style.width = '30%';
  normalOutput.style.width = '30%';
  debouncedOutput.style.width = '30%';
  throttledOutput.style.width = '30%';
  normalOutput.style.minHeight = '50vh';
  debouncedOutput.style.minHeight = '50vh';
  throttledOutput.style.minHeight = '50vh';
  normalOutput.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
  debouncedOutput.style.backgroundColor = 'rgba(0, 0, 0, 0.15)';
  throttledOutput.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';

  normalInput.addEventListener('keyup', (event) => onNormalInputChange(event, normalOutput));
  debouncedInput.addEventListener(
    'keyup',
    debounce((event) => onDebouncedInputChange(event, debouncedOutput), 200),
  );
  throttledInput.addEventListener(
    'keyup',
    throttle((event) => onThrottledInputChange(event, throttledOutput), 200),
  );
}

function onNormalInputChange(event, normalOutput) {
  normalOutput.textContent = event.target.value;
}

function onDebouncedInputChange(event, debouncedOutput) {
  debouncedOutput.textContent = event.target.value;
}

function onThrottledInputChange(event, throttledOutput) {
  throttledOutput.textContent = event.target.value;
}

/**
 * Debounce:
 * Execute a function X milliseconds after we are done typing.
 */

function debounce(fn, timeout) {
  let timer;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
}


/**
 * Throttle:
 * Execute a function every X milliseconds.
 */

function throttle(fn, timeout) {
  let isWaiting = false;

  return (...args) => {
    if (isWaiting) {
      return;
    }

    isWaiting = true;
    fn(...args);

    setTimeout(() => {
      isWaiting = false;
    }, timeout);
  }
}