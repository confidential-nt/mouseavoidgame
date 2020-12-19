import { MAZE_SIZE_X } from "./maze.js";
import { isBallHit } from "./ball.js";

const rows = document.querySelectorAll(".row");
const firstAttackRow = rows[1];
const secondAttackRow = rows[7];
const lastAttackRow = rows[rows.length - 1];
const firstAttackPos = firstAttackRow.querySelector(".column");
const secondAttackPos = secondAttackRow.querySelector(".column");
const lastAttackPos = lastAttackRow.querySelector(".column");

let create = false;

const ATTACK_SPEED = 8;
let lastRenderTime = 0;
export let isBumpIntoMaze = 0;
let capturedTime;

export let attacks = [
  {
    element: null,
    x: 0,
    y: 1,
    row: firstAttackRow,
  },
  {
    element: null,
    x: 0,
    y: 7,
    row: secondAttackRow,
  },
  {
    element: null,
    x: 0,
    y: rows.length - 1,
    row: lastAttackRow,
  },
];

export function drawAttack(timestamp) {
  setDrawAttack(timestamp);
  const setDoneAttack = attacks.filter((el) => el.element !== null);
  setDoneAttack.forEach((el) => {
    const columns = el.row.querySelectorAll(".column");
    columns[el.x].appendChild(el.element);
  });
}

export function updateAttack(timestamp) {
  let progress = (timestamp - lastRenderTime) / 1000;
  if (progress < 1 / ATTACK_SPEED) return;
  lastRenderTime = timestamp;
  attacks.forEach((el) => {
    if (el.element) el.x++;
  });

  initAttack();
}

function setDrawAttack(timestamp) {
  const sec = Math.round(timestamp / 1000);

  if (!capturedTime) capturedTime = sec;

  if (create) return;
  const attackElement = document.createElement("div");
  attackElement.classList.add("attack");

  switch (sec) {
    case capturedTime + 2:
      if (attacks[0].element) return;
      firstAttackPos.appendChild(attackElement);
      attacks[0].element = attackElement;
      break;
    case capturedTime + 3:
      if (attacks[1].element) return;
      secondAttackPos.appendChild(attackElement);
      attacks[1].element = attackElement;
      break;
    case capturedTime + 4:
      if (attacks[2].element) return;
      lastAttackPos.appendChild(attackElement);
      attacks[2].element = attackElement;
      create = true;
      break;
  }
}

function initAttack() {
  attacks.forEach((el) => {
    if (!el.element) return;
    if (el.x >= MAZE_SIZE_X || isBallHit(el)) {
      isBumpIntoMaze++;

      const haveAttackCol = Array.from(
        el.row.querySelectorAll(".column")
      ).find((col) => col.contains(el.element));
      haveAttackCol.removeChild(el.element);
      el.x = 0;
      el.element = null;
    }
  });

  if (isBumpIntoMaze === 3) {
    attackRestart();
    isBumpIntoMaze = 0;
    capturedTime = null;
  }
}

function attackRestart() {
  create = false;
}

//시작할 때 피 3개씩 줄어드는 버그 수정
//Gem순서정하기?
