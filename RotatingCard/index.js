const appContainer = document.getElementById('container');

createLayout(appContainer);

function createLayout(parent) {
  const cardContainer = document.createElement('div');
  cardContainer.className = 'card-container';
  
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  cardFront.textContent = 'Front';
  
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';
  cardBack.textContent = 'Back';

  cardContainer.appendChild(cardFront);
  cardContainer.appendChild(cardBack);
  parent.appendChild(cardContainer);
}