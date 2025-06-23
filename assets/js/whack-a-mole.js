const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
let score = 0;

// Audio
const sound = new Audio("assets/images/whack.mp3");
const crash = new Audio("assets/images/crash.mp3");

function run() {
  const i = Math.floor(Math.random() * holes.length);
  const hole = holes[i];
  let timer = null;

  const img = document.createElement('img');
  img.classList.add('mole');

  const isSpecialMole = Math.random() < 0.3; // 30% chance
  if (isSpecialMole) {
    img.src = 'assets/images/starmole.png';
    img.classList.add('star-mole');
  } else {
    img.src = 'assets/images/mole.png';
  }

  img.addEventListener('click', () => {
    if (isSpecialMole) {
      score += 50;
      crash.play();
      img.src = 'assets/images/starmole.png';
    } else {
      score += 10;
      sound.play();
      img.src = 'assets/images/mole.png';
    }
    scoreEl.textContent = score;
    clearTimeout(timer);
    setTimeout(() => {
      if (hole.contains(img)) hole.removeChild(img);
      run();
    }, 500);
  });

  hole.appendChild(img);

  timer = setTimeout(() => {
    if (hole.contains(img)) hole.removeChild(img);
    run();
  }, 1500);
}

// Start game after the game screen is shown
document.addEventListener('DOMContentLoaded', () => {
  const gameScreen = document.getElementById('game-screen');
  const observer = new MutationObserver(() => {
    if (gameScreen.style.display === 'flex') {
      run();
      observer.disconnect(); // Only run once
    }
  });
  observer.observe(gameScreen, { attributes: true, attributeFilter: ['style'] });
});

// Cursor movement
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

// Reset Score
const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    score = 0;
    scoreEl.textContent = score;
  });
}
