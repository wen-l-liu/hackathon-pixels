
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
        
    }
}