// https://youtu.be/LJlKaTwtSdI



//Speed to drop a new block
const GAME_SPEED = 300;

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


const TETROMINO_COLORS = [
    "#000", //#0, no color (dummy)
    "#6CF", //#1, light blue
    "#F92", //#2, orange
    "#66F", //#3, blue
    "#C5C", //#4, purple
    "#FD2", //#5, yellow
    "#F44", //#6, red
    "#5B5", //#7, green
];

//Three-dimensional array to store all seven tetrominos with four blocks * four blocks 
//0 is empty space, 1 has a block.
const TETROMINO_TYPES = 
[
    //#0, no tetromino (dummy)
    [],

    //#1, I
    [
        [ 0, 0, 0, 0 ],
        [ 1, 1, 1, 1 ],                  
        [ 0, 0, 0, 0 ],                  
        [ 0, 0, 0, 0 ],                  
    ], 

    //#2, L
    [
        [ 0, 1, 0, 0 ],
        [ 0, 1, 0, 0 ],                  
        [ 0, 1, 1, 0 ],                  
        [ 0, 0, 0, 0 ],                  
    ], 

    //#3, J
    [
        [ 0, 0, 1, 0 ],
        [ 0, 0, 1, 0 ],                  
        [ 0, 1, 1, 0 ],                  
        [ 0, 0, 0, 0 ],                  
    ], 

    //#4, T
    [
        [ 0, 1, 0, 0 ],
        [ 0, 1, 1, 0 ],                  
        [ 0, 1, 0, 0 ],                  
        [ 0, 0, 0, 0 ],                  
    ], 

    //#5, O
    [
        [ 0, 0, 0, 0 ],
        [ 0, 1, 1, 0 ],                  
        [ 0, 1, 1, 0 ],                  
        [ 0, 0, 0, 0 ],                  
    ], 

    //#6, Z
    [
        [ 0, 0, 0, 0 ],
        [ 1, 1, 0, 0 ],                  
        [ 0, 1, 1, 0 ],                  
        [ 0, 0, 0, 0 ],                  
    ], 

    //#7, S
    [
        [ 0, 0, 0, 0 ],
        [ 0, 1, 1, 0 ],                  
        [ 1, 1, 0, 0 ],                  
        [ 0, 0, 0, 0 ],                  
    ],     
];

//Starting tetromino coordinate at the center of the X-axis
const START_X = FIELD_COLUMN / 2 - TETROMINO_SIZE / 2;
const START_Y = 0;

//Current tetromino coordinate
let tetromino_x = START_X;
let tetromino_y = START_Y;

//Two-dimensional array to express a tetromino from all types
let tetromino;

//Tetromino shape randomly selected between #1 and #7
let tetromino_type = Math.floor( Math.random() * (TETROMINO_TYPES.length-1) ) + 1;
tetromino = TETROMINO_TYPES[ tetromino_type ];

//Field content
let field = [];


init();
drawAll();

setInterval( dropTetromino, GAME_SPEED );


//Initialize an empty field with FIELD_COLUMN * FIELD_ROW
function init () {
    //Clear the field
    for ( let y = 0; y < FIELD_ROW; y++ ) {
        field[y] = [];
        for ( let x = 0; x < FIELD_COLUMN; x++ ) {
            field[y][x] = 0;
        }
    }
    
    //Demo
    field[19][0] = 1;
    field[19][9] = 1;
    field[ 0][9] = 1;
}

//Draw a single block
function drawBlock ( x, y, color ) {
    let printX = x * BLOCK_SIZE;
    let printY = y * BLOCK_SIZE;

    context.fillStyle = TETROMINO_COLORS[ color ];
    context.fillRect( printX, printY, BLOCK_SIZE, BLOCK_SIZE );//Draw a tetromino with BLOCK_SIZE at (printX,printY) coordinate
    context.strokeStyle = "black";//Draw a frame
    context.strokeRect( printX, printY, BLOCK_SIZE, BLOCK_SIZE );
}


//Draw the field and a tetromino
function drawAll () {

    //Clear the previous image
    context.clearRect( 0, 0, SCREEN_W, SCREEN_H );

    //Draw the field
    for ( let y = 0; y < FIELD_ROW; y++ ) {
        for ( let x = 0; x < FIELD_COLUMN; x++ ) {
            if ( field[y][x] != 0 ) {
                drawBlock( x, y, field[y][x] );
            }
        }
    }

    //Draw a tetromino
    for ( let y = 0; y < TETROMINO_SIZE; y++ ) {
        for ( let x = 0; x < TETROMINO_SIZE; x++ ) {
            if ( tetromino[y][x] != 0 ) {
                drawBlock( tetromino_x+x, tetromino_y+y, tetromino_type );
            }
        }
    }
}


//Check if the new coordinate is available
function checkMove ( moveX, moveY, newTetromino ) {
    //If the tetromino is simply moving along with the arrow key
    if ( newTetromino == undefined ) {
        newTetromino = tetromino;
    }
    
    for ( let y = 0; y < TETROMINO_SIZE; y++ ) {
        for ( let x = 0; x < TETROMINO_SIZE; x++ ) {

            if ( newTetromino[y][x] != 0 ) {
                let newX = tetromino_x + x + moveX;
                let newY = tetromino_y + y + moveY;

                if ( newX < 0  ||  newY < 0  ||  FIELD_COLUMN <= newX  ||  FIELD_ROW <= newY
                    ||  field[newY][newX] != 0 ) {
                    return false;
                }
            }
        }
    }

    return true;
}


//Rotate a tetromino
function rotate () {
    //Initialize a new two-dimensional array 
    let newTetro = [];
    
    for ( let y = 0; y < TETROMINO_SIZE; y++ ) {
        newTetro[y] = [];
        for ( let x = 0; x < TETROMINO_SIZE; x++ ) {
            newTetro[y][x] = tetromino[TETROMINO_SIZE-x-1][y];
        }
    }

    return newTetro;
}


//Fix the tetromino's coordinate and shape once it reaches the bottom
function fixTetromino () {
    for ( let y = 0; y < TETROMINO_SIZE; y++ ) {
        for ( let x = 0; x < TETROMINO_SIZE; x++ ) {
            if ( tetromino[y][x] != 0 ) {
                //Fix the tetromino shape as tetromino_type
                field[tetromino_y+y][tetromino_x+x] = tetromino_type;
            }
        }
    }
}


//Drop a new tetromino
function dropTetromino () {
    if ( checkMove( 0, 1 ) ) {
        tetromino_y++;
    } else {
        //Once the tetromino reaches the screen bottom, a user can not move it
        fixTetromino();

        //A new tetromino shape will be selected randomly again
        tetromino_type = Math.floor( Math.random() * (TETROMINO_TYPES.length-1) ) + 1;
        tetromino   = TETROMINO_TYPES[ tetromino_type ];
        tetromino_x = START_X;
        tetromino_y = START_Y;
    }

    drawAll();
}


//Process when a user presses a certain key
document.onkeydown = function( e ) {
    switch( e.code ) {
        case 'ArrowLeft': //←
            if ( checkMove( -1, 0 ) ) {
                tetromino_x--;
            }
            break;
        case 'ArrowUp': //↑
            if ( checkMove( 0, -1 ) ) {
                tetromino_y--;
            }
            break;
        case 'ArrowRight': //→
            if ( checkMove( 1, 0 ) ) {
                tetromino_x++;
            }
            break;
        case 'ArrowDown': //↓
            if ( checkMove( 0, 1 ) ) {
                tetromino_y++;
            }
            break;
        case 'Space': //Space key
            let newTetromino = rotate();
            //Check if the new tetromino can rotate at the same coordinate
            if ( checkMove( 0, 0, newTetromino ) ) {
                tetromino = newTetromino;
            }
            break;
    }

    drawAll();
}