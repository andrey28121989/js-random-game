const memoryCards = document.querySelectorAll('.memory__card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function rotateCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('rotate');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', rotateCard);
  secondCard.removeEventListener('click', rotateCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('rotate');
    secondCard.classList.remove('rotate');
    resetBoard();
  }, 1200);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  memoryCards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();


memoryCards.forEach(card => card.addEventListener('click', rotateCard));