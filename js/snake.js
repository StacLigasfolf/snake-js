const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = "img/back.png";

const foodImg = new Image();
foodImg.src = "img/apple.png";

let box = 42;
let score = 0;
let gameOver = 'GAME OVER !!!'

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction);

// бинды на 'WASD', для движения змейки
let dir;
function direction(event){
    if(event.keyCode == 65 && dir != "right"){
        dir = "left";
    } else if (event.keyCode == 68 && dir != "left") {
        dir = "right";
    } else if (event.keyCode == 87 && dir != "down"){
        dir = "up";
    } else if (event.keyCode == 83 && dir != "up"){
        dir = "down";
    }
}

function eatTail(head, array) {
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            ctx.fillStyle = "red";
            ctx.font = "70px Roboto";
            ctx.fillText(gameOver, 170, 450);
            clearInterval(gameStarted);
        }
            
    }
}

function drawGame(){
    /* основная функция запуска игры */

    // отрисовка добавленных изображений поля и яблока
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    // создание змеики 
    for (let i = 0; i < snake.length; i++){
        ctx.fillStyle = i == 0 ? "white" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // отрисовка счета score
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2, box * 1.5);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // появление и поедание яблок
    if (snakeX == food.x && snakeY == food.y ){
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
    } else {
        snake.pop();
    }

    // конец игры при выходе за пределы поля
    if (snakeX < box || snakeX > box *17 || snakeY < 3 * box || snakeY > box * 17){
        ctx.fillStyle = "red";
        ctx.font = "70px Roboto";
        ctx.fillText(gameOver, 170, 450);
        clearInterval(gameStarted);
    }
        
        
    // движение змейки 
    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;
    // 
    let headApp = {
        x: snakeX,
        y: snakeY
    };

    eatTail(headApp, snake);
    snake.unshift(headApp);
}
let speed = 100
// старт динамики 
let gameStarted = setInterval(drawGame, speed)

