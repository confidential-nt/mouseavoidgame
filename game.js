import {draw as drawBall, update as updateBall, bumpIntoMaze, ball, onFinishLine} from "./ball.js";
import {outSideOfMaze} from "./maze.js";
import {drawGem, eatGem} from "./gem.js";

const failConfirm = document.querySelector(".failConfirm");
const finishConfirm = document.querySelector(".finishConfirm");
const btns = document.querySelectorAll("button");
const scoreBoard = document.querySelector(".scoreBoard");
const ALL_GEMS = 3;
let gameOver = false;
let finish = false;
let iseatGem = false;
let score = 0;

scoreBoard.innerText = `lefted gem:${ALL_GEMS}`;

function main(){
    if(gameOver){
        failConfirm.classList.remove("hide");
        return;
    }
    if(finish){
        finishConfirm.classList.remove("hide");
        return;
    }
    window.requestAnimationFrame(main);
    updateBall();
    checkDeath();
    checkFinish();
    if(gameOver || finish) return;
    drawBall();
    drawGem();
    getScore();
}


function checkDeath(){
    gameOver = bumpIntoMaze() || outSideOfMaze(ball);
}

function checkFinish(){
    const ball = document.querySelector(".ball");
    if(!ball) return;
    if(score !== 3) return;
    finish = onFinishLine(ball)
    
}

function handleRestart(){
    if(this.value == "yes"){
        window.location = "./index.html";
    }else {
        failConfirm.classList.add("hide");
        finishConfirm.classList.add("hide");
    }
}

function getScore(){
    const ball = document.querySelector(".ball");
    iseatGem = eatGem(ball);

    if(iseatGem){
        score++;
        scoreBoard.innerText = `lefted gem:${ALL_GEMS - score}`;
    }
    
}


window.requestAnimationFrame(main);
btns.forEach(btn => btn.addEventListener("click",handleRestart))