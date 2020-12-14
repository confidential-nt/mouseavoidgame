
let ballDirection  = {
    x:0,
    y:0
};

let attackDirection = {
    x:0,
}

window.addEventListener("keydown", e => {
    switch(e.key){
        case "ArrowUp":
            ballDirection.y = ballDirection.y - 1;
            break;
        case "ArrowDown":
            ballDirection.y = ballDirection.y + 1;
            break;
        case "ArrowLeft":
            ballDirection.x = ballDirection.x -1;
            break;
        case "ArrowRight":
            ballDirection.x = ballDirection.x + 1;            
    }
})


export function getBallDirection(){
    return ballDirection;
}

export function getAttackDirection(){
 
    attackDirection.x++
    return attackDirection;
}