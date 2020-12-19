import { getBallDirection } from "./direction.js";
import { attacks } from "./attack.js";
import { healthPointBoard } from "./game.js";

export let ball = {
  x: 0,
  y: 0,
};

const rows = document.querySelectorAll(".row");
let start = false;
let row;
let cols;
export let healthPoint = 4;
const healthGauges = document.querySelectorAll(".healthPoint__gauge");

export function draw() {
  if (!start) {
    const ballElement = document.createElement("div");
    ballElement.classList.add("ball");
    row = rows[ball.y];
    cols = row.querySelectorAll(".column");
    cols[ball.x].appendChild(ballElement);

    start = true;

    return;
  }

  const ballElement = document.querySelector(".ball");
  row = rows[ball.y];
  if (!row) return;
  cols = row.querySelectorAll(".column");
  if (!cols[ball.x]) return;
  cols[ball.x].appendChild(ballElement);
}

export function update() {
  ball = getBallDirection();
}

export function bumpIntoMaze(ball) {
  const walls = Array.from(document.querySelectorAll(".wall"));

  return walls.some((wall) => wall.contains(ball));
}

export function onFinishLine(ball) {
  const finishLine = Array.from(rows[0].querySelectorAll(".column"));

  return finishLine[finishLine.length - 1].contains(ball);
}

export function isBallHit(el) {
  if (el.x === ball.x && el.y === ball.y) {
    healthPoint--;
    healthGauges[healthPoint].classList.add("gauge__hide");
    return true;
  }
}
