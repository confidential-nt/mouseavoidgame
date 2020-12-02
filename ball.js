let ball = {
    x: 0,
    y: 0
}

const rows = document.querySelectorAll(".row");
const columns = document.querySelectorAll(".column");
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
    }

    start = true;
}