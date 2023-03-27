const canvas = document.getElementById('game-canvas');

const ctx = canvas.getContext('2d');

const gameContainer = document.getElementById('game-container');

const flappyImg = new Image();
flappyImg.src = 'imagens/flappy_dunk.png';

const FLAP_SPEED = -5;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
const PIPE_WIDTH = 50;
const PIPE_GAP = 125;

let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.1;

let pipeX = 400;
let pipeY = canvas.height - 200;

let scoreDiv = document.getElementById('score-display');
let score = 0;
let highScore = 0;

document.body.onkeyup = function(e) {
    if (e.code == 'Space'){
        birdVelocity = FLAP_SPEED;
    }
}


function increaseScore(){

}

function hideEndMenu(){
    document.getElementById('end-menu').style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');

}

function showEndMenu(){
    document.getElementById('end-menu').style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    document.getElementById('end-score').innerHTML = score;
}

function collisionCheck(){
    const birdBox = {
        x: birdX,
        y: birdY,
        width: BIRD_WIDTH,
        height: BIRD_HEIGHT
    }

    const topPipeBox = {
        x: pipeX,
        y: pipeY - PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height:pipeY 
    }

    const bottomPipeBox = {
        x: pipeX,
        y: pipeY + PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: canvas.height - pipeY - PIPE_GAP
    }
}

function resetGame(){

}

function endGame(){

}

function loop(){
    ctx.clearRect(0,0,canvas.width, canvas.height);

    ctx.drawImage(flappyImg,birdX, birdY);

    ctx.fillStyle = '#333';
    ctx.fillRect(pipeX, -100, PIPE_WIDTH, pipeY);
    ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY);

    if(collisionCheck()){
        endGame();
        return;
    }

     pipeX -= 1.5;
     if(pipeX < -50){
        pipeX = 400;
        pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH;
     }

    birdVelocity += birdAcceleration;
    birdY += birdVelocity;

    requestAnimationFrame(loop);
}

loop();



