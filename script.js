const memoryCards = document.querySelectorAll('.memory__card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const timer = document.getElementById('timer');

let counter = 0;
let timeCounter = 0;
let gameTime = null;
let matchCount = 0;

const modal = document.getElementById('myModal');
const again = document.getElementById('play-again');
const start = document.querySelector('.start');

memoryCards.forEach(card => card.addEventListener('click', rotateCard));

function rotateCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle('rotate');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    counter = counter + 1;
    if (counter === 6) {
      showModal();
    }
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
    firstCard.classList.toggle('rotate');
    secondCard.classList.toggle('rotate');
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

function showModal() {
  setTimeout(() => {
    modal.style.zIndex = 2;
  }, 1000);
  resetTimer();
}

function restartGame() {
  modal.style.zIndex = -1;
  counter = 0;
  hasFlippedCard = false;
  lockBoard = false;
  memoryCards.forEach(card => {
      card.classList.toggle('rotate');
    });
  resetTimer();
}

again.addEventListener('click', restartGame);

function formatSeconds(seconds) {
  const date = new Date(1970, 0, 1);
  date.setSeconds(seconds);
  return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function initGameTime() {
  setInterval(() => {
    timer.innerHTML = `${formatSeconds(++timeCounter)}`;
  }, 1000);
}

function resetTimer() {
  timeCounter = -1;
}

window.addEventListener('load', () => {
  gameTime = initGameTime();
});

