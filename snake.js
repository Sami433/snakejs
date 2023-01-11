const canvas = document.getElementById("snake-game");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;


let snake = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 5,
  direction: "right",
  pieces: []
};


let food = {
  x: 10,
  y: 10
};

let gameInterval = setInterval(drawSnake, 100);

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
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.pieces.forEach((piece) => {
    ctx.fillRect(piece.x, piece.y, snake.size, snake.size);
  });

  ctx.fillRect(food.x, food.y, snake.size, snake.size);

  if (snake.direction === "right") {
    snake.x += snake.speed;
  } else if (snake.direction === "left") {
    snake.x -= snake.speed;
  } else if (snake.direction === "up") {
    snake.y -= snake.speed;
  } else if (snake.direction === "down") {
    snake.y += snake.speed;
  }

 
  snake.pieces.unshift({ x: snake.x, y: snake.y });

  if (snake.pieces.length > 1) {
    snake.pieces.pop();
  }

  if (
    snake.x < 0 ||
    snake.x > canvas.width ||
    snake.y < 0 ||
    snake.y > canvas.height
  ) {
    if(confirm("Game over! Voulez-vous recommencer?")) {
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

  if (snake.x === food.x && snake.y === food.y) {

    snake.pieces.push({ x: snake.x, y: snake.y });

    food.x = Math.floor(Math.random() * (canvas.width / snake.size)) * snake.size;
    food.y = Math.floor(Math.random() * (canvas.height / snake.size)) * snake.size;
  }
}

