const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Set canvas size based on the window size
function resizeCanvas() {
    const size = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.8);
    canvas.width = size;
    canvas.height = size;
}

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let speed = 100; // Initial speed
let gameLoop;

const eatSound = new Audio('path/to/eat-sound.mp3');
const gameOverSound = new Audio('path/to/game-over-sound.mp3');

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    updateSnakePosition();
    checkCollision();
    updateScore();
}

function drawSnake() {
    context.fillStyle = 'green';
    snake.forEach(segment => {
        context.fillRect(segment.x * (canvas.width / 20), segment.y * (canvas.height / 20), (canvas.width / 20) - 2, (canvas.height / 20) - 2);
    });
}

function drawFood() {
    context.fillStyle = 'orange';
    context.fillRect(food.x * (canvas.width / 20), food.y * (canvas.height / 20), (canvas.width / 20) - 2, (canvas.height / 20) - 2);
}

function updateSnakePosition() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        eatFood();
        spawnFood();
    } else {
        snake.pop();
    }
}

function spawnFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 20));
    food.y = Math.floor(Math.random() * (canvas.height / 20));
}

function eatFood() {
    eatSound.play();
    score++;
}

function checkCollision() {
    const head = snake[0];

    // Check wall collision
    if (head.x < 0 || head.x >= canvas.width / (canvas.width / 20) || head.y < 0 || head.y >= canvas.height / (canvas.height / 20)) {
        gameOver();
    }

    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(gameLoop);
    gameOverSound.play();
    alert("Game Over! Your score: " + score);
    document.location.reload(); // Restart the game
}

function updateScore() {
    document.getElementById('score').innerText = "Score: " + score;
}

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Touch controls for mobile
document.getElementById('up').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: -1 };
});
document.getElementById('down').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: 1 };
});
document.getElementById('left').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: -1, y: 0 };
});
document.getElementById('right').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: 1, y: 0 };
});

// Resize canvas on load and window resize
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

function startGame() {
    gameLoop = setInterval(draw, speed);
}

startGame();