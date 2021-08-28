// https://youtu.be/LJlKaTwtSdI




//Field size
const FIELD_COLUMN = 10;
const FIELD_ROW    = 20;

//Block size (px)
const BLOCK_SIZE = 30;

//Screen size (px)
const SCREEN_W = BLOCK_SIZE * FIELD_COLUMN;
const SCREEN_H = BLOCK_SIZE * FIELD_ROW;

//Tetromino size
const TETROMINO_SIZE = 4;

let $canvas = document.getElementById("can");
let context = $canvas.getContext("2d");

$canvas.width        = SCREEN_W;
$canvas.height       = SCREEN_H;
$canvas.style.border = "4px solid #555";

//Two-dimensional array to express four blocks * four blocks 
//0 is empty space, 1 has a block.
let tetromino = [
    [ 0, 0, 0, 0 ],
    [ 1, 1, 0, 0 ],                  
    [ 0, 1, 1, 0 ],                  
    [ 0, 0, 0, 0 ],                  
];

//Beginning coordinate for a tetromino
let tetromino_x = 0;
let tetromino_y = 0;

//Field itself
let field = [];


//Initialize an empty field with FIELD_COLUMN * FIELD_ROW
for ( let y = 0; y < FIELD_ROW; y++ ) {
    field[y] = [];
    for ( let x = 0; x < FIELD_COLUMN; x++ ) {
        field[y][x] = 0;
    }
}

drawField();
drawTetromino();


//Draw a field
function drawField () {

    //Clear the previous image
    context.clearRect( 0, 0, SCREEN_W, SCREEN_H );

    for ( let y = 0; y < FIELD_ROW; y++ ) {
        for ( let x = 0; x < FIELD_COLUMN; x++ ) {
            if ( field[y][x] != 0 ) {
                let printX = x * BLOCK_SIZE;
                let printY = y * BLOCK_SIZE;
                context.fillStyle = "red";
                context.fillRect( printX, printY, BLOCK_SIZE, BLOCK_SIZE );//Draw a tetromino with BLOCK_SIZE at (printX,printY) coordinate
                context.strokeStyle = "black";//Draw a frame
                context.strokeRect( printX, printY, BLOCK_SIZE, BLOCK_SIZE );
            }
        }
    }
}


//Draw a tetromino
function drawTetromino () {

    for ( let y = 0; y < TETROMINO_SIZE; y++ ) {
        for ( let x = 0; x < TETROMINO_SIZE; x++ ) {
            if ( tetromino[y][x] != 0 ) {
                let printX = ( tetromino_x + x ) * BLOCK_SIZE;
                let printY = ( tetromino_y + y ) * BLOCK_SIZE;
                context.fillStyle = "red";
                context.fillRect( printX, printY, BLOCK_SIZE, BLOCK_SIZE );//Draw a tetromino with BLOCK_SIZE at (printX,printY) coordinate
                context.strokeStyle = "black";//Draw a frame
                context.strokeRect( printX, printY, BLOCK_SIZE, BLOCK_SIZE );
            }
        }
    }
}


//Process when a user presses a certain key
document.onkeydown = function( e ) {
    switch( e.code ) {
        case 'ArrowLeft':  //←
            tetromino_x--;
            break;
        case 'ArrowUp':    //↑
            tetromino_y--;
            break;
        case 'ArrowRight': //→
            tetromino_x++;
            break;
        case 'ArrowDown':  //↓
            tetromino_y++;
            break;
        case 'Space':      //Space key
            break;
    }

    drawField();
    drawTetromino();
}