import {getAttackDirection} from "./direction.js";
import {MAZE_SIZE_X} from "./maze.js";

const rows = document.querySelectorAll(".row");
const firstAttackRow =  rows[1];
const secondAttackRow = rows[7];
const lastAttackRow = rows[rows.length - 1];
const firstAttackPos = firstAttackRow.querySelector(".column");
const secondAttackPos = secondAttackRow.querySelector(".column");
const lastAttackPos = lastAttackRow.querySelector(".column");

let start = false;

let attacks = [
    {
        id: 1,
        x: 0,
        firstPos: firstAttackPos,
    },
    {
        id: 2,
        x: 0,
        firstPos: secondAttackPos,
    },
    {
        id: 3,
        x: 0,
        firstPos: lastAttackPos,
    }
]

const ATTACK_SPEED = 2;

let lastRenderTime = 0;




export function handleAttack(timestamp){
    const randomNum = Math.floor( Math.random() * 3) + 1;
    switch (randomNum){
        case 1:
            const firstAttack = attacks.find(el => el["id"] === 1);
            updateAttack(firstAttack, timestamp);
            drawAttack(firstAttack);
            break;
        case 2:
            const secondAttack = attacks.find(el => el["id"] === 2);
            updateAttack(secondAttack, timestamp);
            drawAttack(secondAttack);
            break;
        case 3:
            const thirdAttack = attacks.find(el => el["id"] === 3);
            updateAttack(thirdAttack, timestamp);
            drawAttack(thirdAttack);
    }
}



export function drawAttack(){
    const firstAttackRowCol = firstAttackRow.querySelectorAll(".column");
    if(!start){
        firstDrawAttack();
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


export function updateAttack(object,timestamp){
    let progress = (timestamp - lastRenderTime) / 1000;
    if(progress < 1 / ATTACK_SPEED) return;
    lastRenderTime = timestamp;
    object.x = getAttackDirection();
}