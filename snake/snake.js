const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let speed = 100; // Initial speed
let gameLoop;

const eatSound = new Audio('../snake/Eating sound effect LUCAS ARPON TV.mp3');
const gameOverSound = new Audio('../snake/Game Over sound effect.mp3');

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawObstacles();
    updateSnakePosition();
    checkCollision();
    updateScore();
}

function drawSnake() {
    context.fillStyle = 'green';
    snake.forEach(segment => {
        context.fillRect(segment.x * 20, segment.y * 20, 18, 18);
    });
}

function drawFood() {
    context.fillStyle = 'orange';
    context.fillRect(food.x * 20, food.y * 20, 18, 18);
}

function drawObstacles() {
    const obstacles = [{ x: 5, y: 5 }, { x: 10, y: 15 }]; // Example obstacles
    context.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        context.fillRect(obstacle.x * 20, obstacle.y * 20, 20, 20);
    });
}

function updateSnakePosition() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        eatFood();
        spawnFood();
        increaseDifficulty();
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

function increaseDifficulty() {
    if (score % 5 === 0 && score > 0) {
        speed = Math.max(50, speed - 10); // Increase speed every 5 points
    }
}

function checkCollision() {
    const head = snake[0];

    // Check wall collision
    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20) {
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

function startGame() {
    gameLoop = setInterval(draw, speed);
}

startGame();