// https://youtu.be/LJlKaTwtSdI



let $canvas = document.getElementById("can");
let context = $canvas.getContext("2d");
const BLOCK_SIZE     = 30;
const TETROMINO_SIZE = 4;
let tetromino = [
    [ 0, 0, 0, 0 ],//0 means NO block, 1 means a block.                  
    [ 1, 1, 0, 0 ],                  
    [ 0, 1, 1, 0 ],                  
    [ 0, 0, 0, 0 ],                  
];

// context.fillStyle = "red";
// context.fillRect( 0, 0, BLOCK_SIZE, BLOCK_SIZE );//Draw a square with BLOCK_SIZE at (0,0) coordinate

for ( let y = 0; y < TETROMINO_SIZE; y++ ) {
    for ( let x = 0; x < TETROMINO_SIZE; x++ ) {
        if ( tetromino[y][x] ) {
            let px = x * BLOCK_SIZE;
            let py = y * BLOCK_SIZE;
            context.fillStyle = "red";
            context.fillRect( px, py, BLOCK_SIZE, BLOCK_SIZE );//Draw blocks in "Z" with BLOCK_SIZE at (px,py) coordinate
            context.strokeStyle = "black";
            context.strokeRect( px, py, BLOCK_SIZE, BLOCK_SIZE );
        }
    }
} 