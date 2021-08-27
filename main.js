// https://youtu.be/LJlKaTwtSdI



//Block size (px)
const BLOCK_SIZE = 30;

//Tetromino size (px)
const TETROMINO_SIZE = 4;

let $canvas = document.getElementById("can");
let context = $canvas.getContext("2d");

//Array to express four blocks * four blocks 
//0 is empty space, 1 has a block.
let tetromino = [
    [ 0, 0, 0, 0 ],
    [ 1, 1, 0, 0 ],                  
    [ 0, 1, 1, 0 ],                  
    [ 0, 0, 0, 0 ],                  
];


for ( let y = 0; y < TETROMINO_SIZE; y++ ) {
    for ( let x = 0; x < TETROMINO_SIZE; x++ ) {
        if ( tetromino[y][x] != 0 ) {
            let printX = x * BLOCK_SIZE;
            let printY = y * BLOCK_SIZE;
            context.fillStyle = "red";
            context.fillRect( printX, printY, BLOCK_SIZE, BLOCK_SIZE );//Draw blocks in "Z" with BLOCK_SIZE at (printX,printY) coordinate
            context.strokeStyle = "black";//Draw a frame
            context.strokeRect( printX, printY, BLOCK_SIZE, BLOCK_SIZE );
        }
    }
} 