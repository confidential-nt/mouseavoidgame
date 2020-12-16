import { getAttackDirection } from "./direction.js";
import { MAZE_SIZE_X } from "./maze.js";

const rows = document.querySelectorAll(".row");
const firstAttackRow = rows[1];
const secondAttackRow = rows[7];
const lastAttackRow = rows[rows.length - 1];
const firstAttackPos = firstAttackRow.querySelector(".column");
const secondAttackPos = secondAttackRow.querySelector(".column");
const lastAttackPos = lastAttackRow.querySelector(".column");

let start = false;
let create = false; //얘는 나중에 한분기 끝나고 다른 한분기 시작하게 할때 이용할 것.

let attacks = [
  {
    id: 1,
    x: 0,
  },
  {
    id: 2,
    x: 0,
  },
  {
    id: 3,
    x: 0,
  },
];

const ATTACK_SPEED = 2;

let lastRenderTime = 0;

export function drawAttack(timestamp) {
  const sec = Math.round(timestamp / 1000);

  if (create) return;
  const attack = document.createElement("div");
  attack.classList.add("attack");
  const attackElements = document.querySelectorAll(".attack");
  switch (sec) {
    case 2:
      if (firstAttackPos.contains(attackElements[0])) return;
      firstAttackPos.appendChild(attack);
      break;
    case 3:
      if (secondAttackPos.contains(attackElements[1])) return;
      secondAttackPos.appendChild(attack);
      break;
    case 4:
      if (lastAttackPos.contains(attackElements[2])) return;
      lastAttackPos.appendChild(attack);
      create = true;
      break;
  }
}

// export function drawAttack() {
//   const firstAttackRowCol = firstAttackRow.querySelectorAll(".column");
//   if (!start) {
//     firstDrawAttack();
//     return;
//   }
//   if (attack.x > MAZE_SIZE_X) {
//     start = !start;
//     const lastPosition = firstAttackRowCol[firstAttackRowCol.length - 1];
//     const lastAttack = lastPosition.querySelector(".attack");
//     lastPosition.removeChild(lastAttack);
//     attack.x = 0;
//   }

//   const attackElement = document.querySelector(".attack");

//   firstAttackRowCol[attack.x].appendChild(attackElement);
// }

export function updateAttack(object, timestamp) {
  let progress = (timestamp - lastRenderTime) / 1000;
  if (progress < 1 / ATTACK_SPEED) return;
  lastRenderTime = timestamp;
  object.x = getAttackDirection();
}
