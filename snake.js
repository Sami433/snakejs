// Initialise the canvas and context
const canvas = document.getElementById("snake-game");
const ctx = canvas.getContext("2d");

// Set the size of the canvas
canvas.width = 500;
canvas.height = 500;

// Set the initial position and size of the snake
let snake = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 5,
  direction: "right",
  pieces: []
};

// Create the initial "food" piece
let food = {
  x: 10,
  y: 10
};

// Set an interval to draw the snake every 100ms
let gameInterval = setInterval(drawSnake, 100);

// Add event listener to handle snake direction
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && snake.direction !== "left") {
    snake.direction = "right";
  } else if (event.key === "ArrowLeft" && snake.direction !== "right") {
    snake.direction = "left";
  } else if (event.key === "ArrowUp" && snake.direction !== "down") {
    snake.direction = "up";
  } else if (event.key === "ArrowDown" && snake.direction !== "up") {
    snake.direction = "down";
  }
});

function drawSnake() {
  // Clear the canvas before redrawing the snake
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Go through each piece of
  snake.pieces.forEach((piece) => {
    ctx.fillRect(piece.x, piece.y, snake.size, snake.size);
  });

  // Draw the food on the canvas
  ctx.fillRect(food.x, food.y, snake.size, snake.size);

  // Move the snake based on its current direction
  if (snake.direction === "right") {
    snake.x += snake.speed;
  } else if (snake.direction === "left") {
    snake.x -= snake.speed;
  } else if (snake.direction === "up") {
    snake.y -= snake.speed;
  } else if (snake.direction === "down") {
    snake.y += snake.speed;
  }

  // Add the current position to the beginning of the snake's pieces array
  snake.pieces.unshift({ x: snake.x, y: snake.y });

  // Remove the last piece of the snake if it's longer than 1
  if (snake.pieces.length > 1) {
    snake.pieces.pop();
  }

  // Check if the snake is out of bounds
  if (
    snake.x < 0 ||
    snake.x > canvas.width ||
    snake.y < 0 ||
    snake.y > canvas.height
  ) {
    if(confirm("Game over! Do you want to restart the game?")) {
        snake = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 10,
        speed: 5,
        direction: "right",
        pieces: []
        };
        food = {
          x: Math.floor(Math.random() * (canvas.width / snake.size)) * snake.size,
          y: Math.floor(Math.random() * (canvas.height / snake.size)) * snake.size
        };
    }else {
        clearInterval(gameInterval);
    }
  }

  // Check if the snake is touching the food
  if (snake.x === food.x && snake.y === food.y) {
    // Add a new piece to the snake
    snake.pieces.push({ x: snake.x, y: snake.y });

    // Move the food to a new random location
    food.x = Math.floor(Math.random() * (canvas.width / snake.size)) * snake.size;
    food.y = Math.floor(Math.random() * (canvas.height / snake.size)) * snake.size;
  }
}

