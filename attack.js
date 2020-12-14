import {getAttackDirection} from "./direction.js";
import {MAZE_SIZE_X} from "./maze.js";

let start = false;

let attack = {
    x: 0,
}

const ATTACK_SPEED = 2;

let lastRenderTime = 0;

const rows = document.querySelectorAll(".row");
const firstAttackRow =  rows[1];
const secondAttackRow = rows[7];
const lastAttackRow = rows[rows.length - 1];


export function drawAttack(){
    const firstAttackRowCol = firstAttackRow.querySelectorAll(".column");
    if(!start){
        const position = setAttackPosition();
        position.forEach(pos => {
            const attackElement = document.createElement("div")
            attackElement.classList.add("attack");
            pos.appendChild(attackElement);
        })

        start = true;
        return;
    }
    if(attack.x > MAZE_SIZE_X){
        start = !start;
        const lastPosition = firstAttackRowCol[firstAttackRowCol.length - 1]
        const lastAttack = lastPosition.querySelector(".attack");
        lastPosition.removeChild(lastAttack);
        attack.x = 0;
    }
    
    const attackElement = document.querySelector(".attack");
    
    firstAttackRowCol[attack.x].appendChild(attackElement);
    

}

function setAttackPosition(){
    
    const firstAttackPos = firstAttackRow.querySelector(".column");
    const secondAttackPos = secondAttackRow.querySelector(".column");;
    const lastAttackPos = lastAttackRow.querySelector(".column");;
    return [firstAttackPos, secondAttackPos, lastAttackPos];
}

export function updateAttack(timestamp){
    let progress = (timestamp - lastRenderTime) / 1000;
    if(progress < 1 / ATTACK_SPEED) return;
    lastRenderTime = timestamp;
    attack = getAttackDirection();
}