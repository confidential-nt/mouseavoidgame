import {draw as drawBall, update as updateBall, bumpIntoMaze, ball} from "./ball.js";
import {outSideOfMaze} from "./maze.js";

const confirm = document.querySelector(".confirm");
const btns = document.querySelectorAll("button");
let gameOver = false;

function main(){
    if(gameOver){
        confirm.classList.remove("hide");
        return;
    }
    window.requestAnimationFrame(main);
    updateBall();
    checkDeath();
    if(gameOver) return;
    drawBall();
   
}


function checkDeath(){
    gameOver = bumpIntoMaze() || outSideOfMaze(ball);
}

function handleRestart(){
    if(this.value == "yes"){
        window.location = "./index.html";
    }else {
        confirm.classList.add("hide");
    }
}


window.requestAnimationFrame(main);
btns.forEach(btn => btn.addEventListener("click",handleRestart))