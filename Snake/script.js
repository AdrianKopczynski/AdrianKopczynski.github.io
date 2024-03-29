/*ver 0.05*/
let isGameOver = false;
let score = 0;

$(document).ready(function () {
    const gridSize = 27;
    const tileSize = 27;
    let snake = [{ x: 0, y: 0 }];
    let direction = 'right';
    let food;
    let score = 0;
    let speed = 100;
    let intervalId;

    function generateFood() {
        let x = Math.floor(Math.random() * gridSize) * tileSize;
        let y = Math.floor(Math.random() * gridSize) * tileSize;
        for (segment of snake) {
            if (segment.x === x && segment.y === y) {
                x = 0;
                y = 0;
                x = Math.floor(Math.random() * gridSize) * tileSize;
                y = Math.floor(Math.random() * gridSize) * tileSize;
            }
        }
        $('#game-container').append('<div class="food" id="cherry" style="left:' + x + 'px; top:' + y + 'px;"></div>');
        return { x, y };

    }

    function startGame() {
        showGameContainer();
        score = 0;
        document.getElementById("score").innerHTML = "Score: " + score;
        snake = [{ x: 0, y: 0 }];
        direction = 'right';
        food = generateFood();
        intervalId = setInterval(gameLoop, speed);
    }
    function startAgain() {
        score = 0;
        document.getElementById("score").innerHTML = "Score: " + score;
        snake = [{ x: 0, y: 0 }];
        direction = 'right';
        food = generateFood();
        intervalId = setInterval(gameLoop, speed);
    }
    function updateSnake() {

        const head = { ...snake[0] };
        let headDirection = "snakeHeadRight";

        switch (direction) {
            case 'up':
                head.y -= tileSize;
                headDirection = "snakeHeadUp";
                break;
            case 'down':
                head.y += tileSize;
                headDirection = "snakeHeadDown";
                break;
            case 'left':
                head.x -= tileSize;
                headDirection = "snakeHeadLeft";
                break;
            case 'right':
                head.x += tileSize;
                headDirection = "snakeHeadRight";
                break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            $('.food').remove();
            food = generateFood();
            score++;
            document.getElementById("score").innerHTML = "Score: " + score;
        } else {
            snake.pop();
        }

        renderSnake();
        $("#snakeHead").addClass(headDirection);
    }

    function renderSnake() {
        $('.snake').remove();

        for (segment of snake) {
            if (segment == snake[0]) {
                $('#game-container').append('<div class="snake" id="snakeHead" style="left:' + segment.x + 'px; top:' + segment.y + 'px;"></div></div>');
            }
            else {
                $('#game-container').append('<div class="snake" style="left:' + segment.x + 'px; top:' + segment.y + 'px;"></div>');
            }
        }
    }

    function checkCollision() {
        const head = snake[0];


        if (head.x < 0 || head.x >= gridSize * tileSize || head.y < 0 || head.y >= gridSize * tileSize) {
            clearInterval(intervalId);
            document.querySelectorAll('.food').forEach(function (element) {
                element.remove();
            });
            showGameOverScreen();
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                clearInterval(intervalId);
                document.querySelectorAll('.food').forEach(function (element) {
                    element.remove();
                });
                showGameOverScreen();
            }
        }
    }
    function gameLoop() {
        updateSnake();
        checkCollision();
    }

    function showTitleScreen() {
        $('#title-screen').show();
        $('#game-over-screen').hide();
        $('#game-container').hide();
        $('#score').hide();
    }
    function showGameContainer() {
        $('#game-over-screen').hide();
        $('#title-screen').hide();
        $('#game-container').show();
        $('#score').show();

    }

    function showGameOverScreen() {
        $('#game-over-screen').show();
        $('#title-screen').hide();
        $('#game-container').hide();
        $('#score').hide();
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


    showTitleScreen();
    $('#start-game').on('click', function () {
        showGameContainer();
        startGame();
    });
    $('#try-again').on('click', function () {
        showGameContainer();
        startAgain();
        
    });
    $('#exit').on('click', function () {
        showTitleScreen();
    });
});
