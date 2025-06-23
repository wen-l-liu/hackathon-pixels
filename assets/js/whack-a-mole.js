const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('reset-btn');
const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.getElementById('score');
const board = document.querySelector('.board');

let score = 0;
let gameRunning = false;
let moleTimeout = null;

const sound = new Audio("assets/images/whack.mp3");
const crash = new Audio("assets/images/crash.mp3");

// Start game on button click
startBtn.addEventListener('click', () => {
  if (!gameRunning) {
    gameRunning = true;
    startBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    scoreEl.textContent = 0;
    score = 0;
    run();
  }
});

// Reset score
resetBtn.addEventListener('click', () => {
  score = 0;
  scoreEl.textContent = score;
});

// Cursor animation
window.addEventListener('mousemove', e => {
  cursor.style.top = e.pageY + 'px';
  cursor.style.left = e.pageX + 'px';
});
window.addEventListener('mousedown', () => {
  cursor.classList.add('active');
});
window.addEventListener('mouseup', () => {
  cursor.classList.remove('active');
});

// Main game loop
function run() {
  if (!gameRunning) return;

  const i = Math.floor(Math.random() * holes.length);
  const hole = holes[i];
  const img = document.createElement('img');
  img.classList.add('mole');

  const isSpecialMole = Math.random() < 0.3;
  img.src = isSpecialMole ? 'assets/images/starmole.png' : 'assets/images/first-mole.png';

  img.addEventListener('click', () => {
    if (isSpecialMole) {
      score += 50;
      crash.play();
    } else {
      score += 10;
      sound.play();
    }
    scoreEl.textContent = score;

    clearTimeout(moleTimeout);
    img.remove();
    setTimeout(run, 400); // delay before next mole
  });

  hole.appendChild(img);

  moleTimeout = setTimeout(() => {
    if (hole.contains(img)) hole.removeChild(img);
    run();
  }, 1200);
}
