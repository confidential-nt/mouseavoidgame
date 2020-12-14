import {getBallDirection} from "./direction.js";

export let ball = {
    x: 0,
    y: 0
}

const rows = document.querySelectorAll(".row");
let start = false;
let row;
let cols;

export function draw(){
    if(!start){
        const ballElement = document.createElement("div");
        ballElement.classList.add("ball");
        row = rows[ball.y]
        cols = row.querySelectorAll(".column")
        cols[ball.x].appendChild(ballElement);

        start = true;

        return;
    }

    const ballElement = document.querySelector(".ball");
    row = rows[ball.y]
    if(!row) return;
    cols = row.querySelectorAll(".column")
    if(!cols[ball.x]) return;
    cols[ball.x].appendChild(ballElement);
    
}

export function update(){
    ball = getBallDirection();
}



export function bumpIntoMaze(ball){
    const walls = Array.from(document.querySelectorAll(".wall"))

    return walls.some(wall => wall.contains(ball));
}

export function onFinishLine(ball) {
    const finishLine = Array.from(rows[0].querySelectorAll(".column"))
    
    return finishLine[finishLine.length - 1].contains(ball);
}



