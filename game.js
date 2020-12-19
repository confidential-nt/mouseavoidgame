import {
  draw as drawBall,
  update as updateBall,
  bumpIntoMaze,
  ball as ballLoc,
  onFinishLine,
  healthPoint,
} from "./ball.js";
import { outSideOfMaze } from "./maze.js";
import { drawGem, eatGem } from "./gem.js";
import { timer, timeOut, timerId } from "./time.js";
import { drawAttack, updateAttack } from "./attack.js";

const failConfirm = document.querySelector(".failConfirm");
const finishConfirm = document.querySelector(".finishConfirm");
const btns = document.querySelectorAll("button");
const scoreBoard = document.querySelector(".scoreBoard");
export const healthPointBoard = document.querySelector(".healthPoint");
const ALL_GEMS = 3;
let gameOver = false;
let finish = false;
let iseatGem = false;
let score = 0;
let justAgo = false;

scoreBoard.innerText = `left gems:${ALL_GEMS}`;
// healthPointBoard.innerText = `${healthPoint}HP`;

function main(timestamp) {
  if (gameOver) {
    failConfirm.classList.remove("hide");
    clearInterval(timerId);
    return;
  }
  if (finish) {
    finishConfirm.classList.remove("hide");
    clearInterval(timerId);
    return;
  }
  if (!justAgo) {
    const startTime = Date.now();
    timer(startTime);
    justAgo = true;
  }
  window.requestAnimationFrame(main);
  update(timestamp);
  if (gameOver || finish) return;
  draw(timestamp);
}

function draw(timestamp) {
  drawBall();
  drawGem();
  drawAttack(timestamp);
  getScore();
}

function update(timestamp) {
  updateBall();
  updateAttack(timestamp);
  checkDeath();
  checkFinish();
}

function checkDeath() {
  const ball = document.querySelector(".ball");
  gameOver =
    bumpIntoMaze(ball) ||
    outSideOfMaze(ballLoc) ||
    timeOut() ||
    healthPoint === 0;
}

function checkFinish() {
  const ball = document.querySelector(".ball");
  if (!ball) return;
  if (score !== 3) return;
  finish = onFinishLine(ball);
}

function handleRestart() {
  if (this.value == "yes") {
    window.location = "./index.html";
  } else {
    failConfirm.classList.add("hide");
    finishConfirm.classList.add("hide");
  }
}

function getScore() {
  const ball = document.querySelector(".ball");
  const eatSound = document.querySelector(`audio[data-sound="eatGem"]`);
  iseatGem = eatGem(ball);

  if (iseatGem) {
    score++;
    scoreBoard.innerText = `left gems:${ALL_GEMS - score}`;
    eatSound.play();
  }
}

window.requestAnimationFrame(main);
btns.forEach((btn) => btn.addEventListener("click", handleRestart));
