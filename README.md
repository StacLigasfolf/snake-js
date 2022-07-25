<img src="img/gifs.gif" alt="">

# Snake 
snake game, the meaning of the game is to sit down as many apples as possible without touching the walls of the field and your tail, each gray-haired apple adds a tail to the snake, which complicates the task, the number of gray-haired apples is also displayed through a variable `scope`

## Function
to move the snake around the map, the dimensions of each square in
pixels were calculated and used to dynamically move the snake along
each calculated square, depending on the button pressed, the keys
were bound to the  `WASD`

## GUI 
a suitable picture in PNG format was selected as a `field` for a snake, and an icon in the corresponding form as an `apple`.
a `snake` is just an array consisting of a snake's head of a separate `color` and the rest of the body (array).

## Methods 
```
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
```