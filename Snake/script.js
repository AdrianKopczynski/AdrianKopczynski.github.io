let isGameOver = false;
let score = 0;

function showTitleScreen() {
    $('#title-screen').show();
    $('#game-over-screen').hide();
}

function showGameOverScreen() {
    $('#game-over-screen').show();
    $('#title-screen').hide();
}
$(document).ready(function () {
    const gridSize = 17;
    const tileSize = 17;
    let snake = [{ x: 0, y: 0 }];
    let direction = 'right';
    let food = generateFood();
    let score = 0;
    let intervalId;

    function generateFood() {
        const x = Math.floor(Math.random() * gridSize) * tileSize;
        const y = Math.floor(Math.random() * gridSize) * tileSize;
        let food_pos = document.elementFromPoint(x, y);
        if (food_pos.classList.contains('.snake')) {
            x = 0;
            y = 0;
            generateFood();
        } else {
            $('#game-container').append('<div class="food" style="left:' + x + 'px; top:' + y + 'px;"></div>');
            return { x, y };
        }

    }

    function updateSnake() {
        
        const head = { ...snake[0] };
        head.style.background = red;
        switch (direction) {
            case 'up':
                head.y -= tileSize;
                break;
            case 'down':
                head.y += tileSize;
                break;
            case 'left':
                head.x -= tileSize;
                break;
            case 'right':
                head.x += tileSize;
                break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            $('.food').remove();
            food = generateFood();
            score ++;
            document.getElementById("score").innerHTML = "Score: " + score;
        } else {
            snake.pop();
        }

        renderSnake();
    }

    function renderSnake() {
        $('.snake').remove();
        for (const segment of snake) {
            $('#game-container').append('<div class="snake" style="left:' + segment.x + 'px; top:' + segment.y + 'px;"></div>');
        }
    }

    function checkCollision() {
        const head = snake[0];


        if (head.x < 0 || head.x >= gridSize * tileSize || head.y < 0 || head.y >= gridSize * tileSize) {
            clearInterval(intervalId);
            document.querySelectorAll('.food').forEach(function (element) {
                element.remove();
            });
            alert('Game Over!');
            score = 0;
            document.getElementById("score").innerHTML = "Score: " + score;
            snake = [{ x: 0, y: 0 }];
            direction = 'right';
            food = generateFood();
            intervalId = setInterval(gameLoop, 100);
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                clearInterval(intervalId);
                document.querySelectorAll('.food').forEach(function (element) {
                    element.remove();
                });    
                alert('Game Over!');
                score = 0;
                document.getElementById("score").innerHTML = "Score: " + score;
                snake = [{ x: 0, y: 0 }];
                direction = 'right';
                food = generateFood();
                intervalId = setInterval(gameLoop, 100);
            }
        }
    }
    function gameLoop() {
        updateSnake();
        checkCollision();
    }
    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: // left
                if (direction !== 'right') {
                    direction = 'left';
                }
                break;
            case 38: // up
                if (direction !== 'down') {
                    direction = 'up';
                }
                break;
            case 39: // right
                if (direction !== 'left') {
                    direction = 'right';
                }
                break;
            case 40: // down
                if (direction !== 'up') {
                    direction = 'down';
                }
                break;
        }
    });
    intervalId = setInterval(gameLoop, 100);
    
});
