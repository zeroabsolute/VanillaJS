generateLayout();

/**
 * Layout-related functions
 */

function generateLayout() {
  const NUMBER_OF_ROWS = 20;
  const NUMBER_OF_COLUMNS = 20;

  const appContainer = document.getElementById('container');
  const gameContainer = document.createElement('div');
  const controlsContainer = document.createElement('div');

  appContainer.appendChild(gameContainer);
  appContainer.appendChild(controlsContainer);

  const matrix = generateGameMatrix(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);
  gameContainer.appendChild(matrix);

  const controls = generateGameControls(matrix);
  controlsContainer.append(...controls);
}

function generateGameMatrix(rows, cols) {
  const table = document.createElement('table');

  for (let i = 0; i < rows; i++) {
    const row = document.createElement('tr');
    row.setAttribute('id', `tr-${i}`);
    table.appendChild(row);

    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `td-${i}-${j}`);

      const checkbox = document.createElement('input');
      checkbox.setAttribute('id', `cell-${i}-${j}`);
      checkbox.setAttribute('type', 'checkbox');

      cell.appendChild(checkbox);
      row.appendChild(cell);
    }
  }

  return table;
}

function generateGameControls(matrix) {
  const startGameBtn = document.createElement('button');
  startGameBtn.setAttribute('id', 'start-game-btn');
  startGameBtn.addEventListener('click', () => onStartGameClick(matrix));
  startGameBtn.textContent = 'Start Game';

  const nextGenerationBtn = document.createElement('button');
  nextGenerationBtn.setAttribute('id', 'next-generation-btn');
  nextGenerationBtn.addEventListener('click', onNextGenerationClick);
  nextGenerationBtn.textContent = 'Next Generation';

  const resetBtn = document.createElement('button');
  resetBtn.setAttribute('id', 'reset-btn');
  resetBtn.addEventListener('click', () => onResetClick(matrix));
  resetBtn.textContent = 'Reset';

  return [
    startGameBtn,
    nextGenerationBtn,
    resetBtn,
  ];
}

function populateMatrix(matrix, fixedVal) {
  const rows = Array.from(matrix.children);

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = Array.from(row.children);

    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j];
      const checkbox = cell.children[0];
      const hasLife = typeof (fixedVal) !== 'undefined'
        ? fixedVal
        : getRandomBool();

      checkbox.checked = hasLife;
    }
  }
}

function getNeighbourCells(cells, i, j) {
  const top = cells.find(cell => cell.getAttribute('id') === `cell-${i - 1}-${j}`);
  const bottom = cells.find(cell => cell.getAttribute('id') === `cell-${i + 1}-${j}`);
  const left = cells.find(cell => cell.getAttribute('id') === `cell-${i}-${j - 1}`);
  const right = cells.find(cell => cell.getAttribute('id') === `cell-${i}-${j + 1}`);
  const topLeft = cells.find(cell => cell.getAttribute('id') === `cell-${i - 1}-${j - 1}`);
  const topRight = cells.find(cell => cell.getAttribute('id') === `cell-${i - 1}-${j + 1}`);
  const bottomLeft = cells.find(cell => cell.getAttribute('id') === `cell-${i + 1}-${j - 1}`);
  const bottomRight = cells.find(cell => cell.getAttribute('id') === `cell-${i + 1}-${j + 1}`);

  return {
    top: top?.checked,
    bottom: bottom?.checked,
    left: left?.checked,
    right: right?.checked,
    topLeft: topLeft?.checked,
    topRight: topRight?.checked,
    bottomLeft: bottomLeft?.checked,
    bottomRight: bottomRight?.checked,
  };
}

function updateMatrixForNextGeneration() {
  const cells = Array.from(document.querySelectorAll(`input[type="checkbox"]`));

  for (const cell of cells) {
    const cellId = cell.getAttribute('id');
    const [_prefix, i, j] = cellId.split('-');

    const neighbours = getNeighbourCells(
      cells,
      Number(i),
      Number(j),
    );
    const nextStateForCurrentCell = determineNextGenerationStateForCell(
      cell.checked,
      neighbours,
    );
    
    cell.checked = nextStateForCurrentCell;
  }
}

/**
 * Event handlers
 */

function onStartGameClick(matrix) {
  populateMatrix(matrix);
}

function onNextGenerationClick() {
  updateMatrixForNextGeneration();
}

function onResetClick(matrix) {
  populateMatrix(matrix, false);
}


/**
 * Game logic
 */

function determineNextGenerationStateForCell(currentState, neighbours) {
  const numberOfLivingNeighbours = Object
    .values(neighbours)
    .filter(neighbourState => Boolean(neighbourState)).length;

  const currentCellIsAlive = currentState;

  if (currentCellIsAlive && (numberOfLivingNeighbours < 2 || numberOfLivingNeighbours > 3)) {
    return false;
  }
  if (currentCellIsAlive && (numberOfLivingNeighbours === 2 || numberOfLivingNeighbours === 3)) {
    return true;
  }
  if (!currentCellIsAlive && numberOfLivingNeighbours === 3) {
    return true;
  }

  return currentState;
}


/**
 * Helpers
 */

function getRandomBool() {
  return Boolean(Math.floor(Math.random() * 2));
}