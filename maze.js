export const MAZE_SIZE_X = 21;
const MAZE_SIZE_Y = 12;

export function outSideOfMaze(position){
    
    return (
        position.x < 0 || position.x > MAZE_SIZE_X || 
        position.y < 0 || position.y > MAZE_SIZE_Y
    )
}