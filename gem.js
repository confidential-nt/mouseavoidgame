let done = false;
let gemPositions;

export function drawGem(){
    if(done) return;
    gemPositions = setGemPosition();
    gemPositions.forEach(pos => {
        const gemElement = document.createElement("div");
        gemElement.classList.add("gem");
        pos.appendChild(gemElement);
    })

    done = true;

}

function setGemPosition(){
    const rows = document.querySelectorAll(".row");
    const row_one = rows[0].querySelectorAll(".column");
    const row_two = rows[rows.length - 1].querySelectorAll(".column");

    const position_one = row_one[15];
    const position_two = row_two[row_two.length -1];
    const position_three = row_two[0];

    return [position_one, position_two, position_three];
}

export function eatGem(ball){
    let eat = false;

    gemPositions.forEach(pos => {
        if(pos.contains(ball)){
            const gem = pos.querySelector(".gem");
            if(!gem) return;
            pos.removeChild(gem);
            eat = true;
        }
    })

    return eat;
}

