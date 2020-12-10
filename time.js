let end = false;
const BY = 60;

export let timerId;

export function timer(startTime){
    const timeUp = startTime + 60000;
    displayTime(BY);
    timerId = setInterval(()=>{
        const timeDif = Math.round((timeUp - Date.now())/1000);
        displayTime(timeDif);
        if(timeDif === 0){
            clearInterval(timerId)
            end = true;
            return;
        }
    },1000)
}

function displayTime(time){
    const timeBoard = document.querySelector(".timeBoard");
    timeBoard.textContent = time;
}

export function timeOut(){
    
    return end;
}