/**
 * Created by nehhaket on 02.02.17.
 */

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
const colour = "#FF75A0";




let up_pressed = false;
let down_pressed = false;
let ai_up = false;
let ai_down = false;
let ai_level = 0.5; //between 0-1 (ball.x/canvas.width)

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {

    if (event.keyCode == 38) {
        up_pressed = true;
    }
    else if (event.keyCode == 40) {
        down_pressed = true;
    }

}

function keyUpHandler(event) {

    if (event.keyCode == 38) {
        up_pressed = false;
    }
    else if (event.keyCode == 40) {
        down_pressed = false;
    }

}




function initialRandomization() {

    if (Math.random() < 0.5) {
        ball.v.x *= -1;
        if (Math.random() < 0.5) {
            ball.v.y *= -1;
        }
    }
    else if (Math.random() < 0.5) {
        ball.v.y *= -1;
    }
}




let ball = { colour: colour, radius: 7, v: {x:5, y:3} };
ball.x = canvas.width/2;
ball.y = canvas.height/2;

function drawBall(ball) {

    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    context.fillStyle = ball.colour;
    context.fill();
    context.closePath();

}




function ballMovement() {

    if (ball.v.y < 0) {

        if (ball.y + ball.v.y > ball.radius) {
            ball.y += ball.v.y;
        }
        else if (ball.y >= ball.radius) {
            ball.y = ball.radius;
            ball.v.y *= -1;
        }
    }
    else {

        if (ball.y + ball.v.y < canvas.height - ball.radius) {
            ball.y += ball.v.y;
        }
        else if (ball.y <= canvas.height - ball.radius) {
            ball.y = canvas.height - ball.radius;
            ball.v.y *= -1;
        }
    }

    if (ball.v.x < 0) {

        ball.x += ball.v.x;
        if (ball.x > 0 && ball.x < player.width + ball.radius) {

            if (ball.y > player.y - ball.radius && ball.y < player.y + player.height + ball.radius) {
                ball.x = ball.radius + player.width;
                ball.v.x *= -1;
                if(ball.y < player.y + ball.radius || ball.y > player.y + player.height - ball.radius) {
                    ball.v.x += (Math.random() - 0.5)/4;
                    ball.v.y += (Math.random() - 0.5)/4;
                }
            }
        }
    }
    else {

        ball.x += ball.v.x;
        if (ball.x <= canvas.width && ball.x > canvas.width - opponent.width - ball.radius) {

            if (ball.y > opponent.y - ball.radius && ball.y < opponent.y + opponent.height + ball.radius) {
                ball.x = canvas.width - ball.radius - opponent.width;
                ball.v.x *= -1;
                if(ball.y < opponent.y + ball.radius || ball.y > opponent.y + opponent.height - ball.radius) {
                    ball.v.x += (Math.random() - 0.5)/4;
                    ball.v.y += (Math.random() - 0.5)/4;
                }
            }
        }
    }

}




function drawPaddle(paddle) {

    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fillStyle = paddle.colour;
    context.fill();
    context.closePath();

}

let Paddle = function (colour, id) {
    this.height = (canvas.height * 0.2);
    this.width = (this.height * 0.1);
    this.colour = colour;
    if (id == 0) {
        this.x = 0;
    }
    else {
        this.x = canvas.width - this.width;
    }
    this.y = canvas.height * 0.4;
    this.v = 6;
};

let player = new Paddle(colour, 0);
let opponent = new Paddle(colour, 1);




function playerMovement() {

    if (up_pressed) {

        if (player.y - player.v > 0) {
            player.y -= player.v;
        }
        else if (player.y > 0) {
            player.y = 0;
        }
    }

    if (down_pressed) {

        if (player.y + player.v < canvas.height - player.height) {
            player.y += player.v;
        }
        else if (player.y + player.height < canvas.height) {
            player.y = canvas.height - player.height;
        }
    }

}




function opponentMovement() {
    heheAI();
    if (ai_up) {

        if (opponent.y - opponent.v > 0) {
            opponent.y -= opponent.v;
        }
        else if (opponent.y > 0) {
            opponent.y = 0;
        }
    }

    if (ai_down) {

        if (opponent.y + opponent.v < canvas.height - opponent.height) {
            opponent.y += opponent.v;
        }
        else if (opponent.y + opponent.height < canvas.height) {
            opponent.y = canvas.height - opponent.height;
        }
    }
}




function heheAI() {

    if (ball.x > canvas.width * ai_level && ball.x < canvas.width) {

        if (ball.y < opponent.y + opponent.height && ball.y > opponent.y) {
            ai_up = false;
            ai_down = false;
        }
        else if (ball.y < opponent.y - ball.radius) {
            ai_up = true;
            ai_down = false;
        }
        else {
            ai_down = true;
            ai_up = false;
        }
    }
}




function game() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(ball);
    drawPaddle(player);
    drawPaddle(opponent);

    playerMovement();
    opponentMovement();
    ballMovement();
    requestAnimationFrame(game);

}




initialRandomization();
game();