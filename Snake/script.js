/*ver 0.05*/
let isGameOver = false;
let score = 0;

$(document).ready(function () {
    const gridSize = 27;
    const tileSize = 27;
    let snake = [{ x: 0, y: 0 }];
    let direction = 'right';
    let food = generateFood();
    let score = 0;
    let speed = 100;
    let intervalId;
    let secondInterval;
    let dane;

    function generateFood() {
        const x = Math.floor(Math.random() * gridSize) * tileSize;
        const y = Math.floor(Math.random() * gridSize) * tileSize;
        let food_pos = document.elementFromPoint(x, y);
        if (food_pos.classList.contains('.snake')) {
            x = 0;
            y = 0;
            generateFood();
        } else {
            $('#game-container').append('<div class="food" id="cherry" style="left:' + x + 'px; top:' + y + 'px;"></div>');
            return { x, y };
        }

    }

    function startGame() {
        showGameContainer();
        score = 0;
        document.getElementById("score").innerHTML = "Score: " + score;
        snake = [{ x: 0, y: 0 }];
        direction = 'right';
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
            else if (segment == snake[snake.length]) {
                $('#game-container').append('<div class="snake" style="left:' + segment.x + 'px; top:' + segment.y + 'px;"></div>');
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
            showGameOverScreen()
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                clearInterval(intervalId);
                document.querySelectorAll('.food').forEach(function (element) {
                    element.remove();
                });
                showGameOverScreen()
            }
        }
    }
    function gameLoop() {
        updateSnake();
        checkCollision();
    }
    function getHighScore(wynik) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {     
            if (this.readyState == 4 && this.status == 200) {
                dane = JSON.parse(this.responseText);
                console.log(dane);
            }
        };

        request.open('GET', 'hScore.json', true);
        request.send();
        console.log(dane);
        return dane;
    }
    function checkData(data){
        if(data != null){
            clearInterval(secondInterval);
            console.log('Data collected: ' + data);
            drawTable(data,score);
        }
        else{
            console.log('No data yet...');
        }
    }
    function drawTable(data,wynik){
                    if (data.user.some(user => user.score < score)) {
                        filteredUsers.sort((a, b) => b.score - a.score);
                        const miejsce = filteredUsers[0].id;
                        $('#game-over-screen').append('<div class="newHighScore">Brawo! Udało ci się osiągnąć ' + miejsce + ' miejsce w tableli wyników!</div>');
                    }
                    data.users.forEach(user => {
                        let place = user.id;
                        let nick = user.name;
                        let points = user.score;
                        $('#score-body').append('<tr><td>'+place+'.</td><td>'+nick+'</td><td>'+points+'</td></tr>');
                    });
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
        /*secondInterval = setInterval(checkData(data),1000);*/
        var request = new XMLHttpRequest();
        let data;
            request.onreadystatechange = function () {     
                if (this.readyState == 4 && this.status == 200) {
                    data = JSON.parse(this.responseText);
                    console.log(data);
                    data.user.forEach(user => {
                        if (data.user.some(user => user.score < wynik)) {
                            filteredUsers.sort((a, b) => b.score - a.score);
                            const miejsce = filteredUsers[0].id;
                            $('#game-over-screen').append('<div class="newHighScore">Brawo! Udało ci się osiągnąć ' + miejsce + ' miejsce w tableli wyników!</div>');
                        }
                            let place = user.id;
                            let nick = user.name;
                            let points = user.score;
                            $('#score-body').append('<tr><td>'+place+'.</td><td>'+nick+'</td><td>'+points+'</td></tr>');
                    });
                }
            };
        request.open('GET', 'hScore.json', true);
        request.send();
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
