import {draw as drawBall, update as updateBall, bumpIntoMaze, ball, onFinishLine} from "./ball.js";
import {outSideOfMaze} from "./maze.js";

const failConfirm = document.querySelector(".failConfirm");
const finishConfirm = document.querySelector(".finishConfirm");
const btns = document.querySelectorAll("button");
let gameOver = false;
let finish = false;

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
}


function checkDeath(){
    gameOver = bumpIntoMaze() || outSideOfMaze(ball);
}

function checkFinish(){
    const ball = document.querySelector(".ball");
    if(!ball) return;
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


window.requestAnimationFrame(main);
btns.forEach(btn => btn.addEventListener("click",handleRestart))