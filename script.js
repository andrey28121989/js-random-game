const memoryCards = document.querySelectorAll('.memory__card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const timer = document.getElementById('timer');

let timeCounter = 0;
let gameTime = null;
let matchCount = 0;

const modal = document.getElementById('myModal');
const again = document.getElementById('play-again');
const start = document.querySelector('.start');

function gameEnds() {
  if (matchCount === 12){
  modal.style.display = 'block';
  }
}

again.onclick = function() {
  modal.style.display = 'none';
  resetTimer();
  rotateCard();
};

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