
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreSpan = document.getElementById('score');
const startBtn = document.getElementById('startBtn');

const box = 20;
const rows = canvas.height / box;
const cols = canvas.width / box;
let snake, food, firection, score, game;

function randomFood() {
    return {
        x: Math.floor(Math.random() * cols) * box,
        y: Math.floor(Math.random() * rows) * box
    };
}

function drawGame() {
    ctx.fillStyle = '#70B2F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#ffd469' : '#4b8cdf';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

let head = { ...snake[0] };
if (direction === 'LEFT') head.x -= box;
else if (direction === 'RIGHT') head.x += box;
else if (direction === 'DO')head.y -= box;
else if (direction === 'DOWN')head.y += box;



// the wrap around logic!

if (head.x <0) head.x = canvas.width - box;
else if (head.x >= canvas.width) head.x = 0;
if (head.y < 0) head.y = canvas.height - box;
else if (head.y >= canvas.height) head.y = 0;

// game over if the snake hits itself :O

if (snake.some(seg => seg.x === head.x && seg.y === head.y )) {
    clearInterval(game);
    alert("Game Over! Your final score: " + score);
    canvas.style.display = 'none';
    startBtn.style.display = 'inline-block';
    return;
}

snake.unshift(head);
if (head.x === food.x && head.y === food.y) {
    score++;
    scoreSpan.innerText = score;
    food = randomFood();
    } else {
        snake.pop();
    }
ctx.fillStyle = '#ff694f';
ctx.fillRect(food.x, food.y, box, box);
}

function startGame() {
  snake = [{ x: box * 5, y: box * 5 }];
  direction = 'RIGHT';
  food = randomFood();
  score = 0;
  scoreSpan.innerText = score;
  canvas.style.display = 'block';
  scoreDisplay.style.display = 'block';
  startBtn.style.display = 'none';
  clearInterval(game);
  game = setInterval(drawGame, 200);
}

function changeDir(e) {
  if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
}

startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', changeDir);