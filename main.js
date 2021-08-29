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

//Variable to see if the game is over
let isGameOver = false;



init();


//Initialize an empty field with FIELD_COLUMN * FIELD_ROW
function init () {
    //Clear the field
    for ( let y = 0; y < FIELD_ROW; y++ ) {
        field[y] = [];
        for ( let x = 0; x < FIELD_COLUMN; x++ ) {
            field[y][x] = 0;
        }
    }

    //Start drawing the
    setInterval( dropTetromino, GAME_SPEED );
    drawAll();
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

    //Once the game is over, the message will be displayed
    if ( isGameOver ) {
        let message = "GAME OVER";
        context.font = "40px 'Impact'";
        let messageWidth = context.measureText( message ).width;
        let messageX = SCREEN_W / 2 - messageWidth / 2;
        let messageY = SCREEN_H / 2 - 20;

        context.lineWidth = 4;
        context.strokeText( message, messageX, messageY );//Draw the frame
        context.fillStyle = "white";//Font color
        context.fillText( message, messageX, messageY );
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


//Check if any line is completed and clear it
function checkLine () {
    let lineCount = 0;

    for ( let y = 0; y < FIELD_ROW; y++ ) {
        //Variable to see if a line is completed
        let isCompleted = true;

        //Check the completion
        for ( let x = 0; x < FIELD_COLUMN; x++ ) {
            //If NO block is found, it means the line is not completed yet
            if ( !field[y][x] ) {
                isCompleted = false;
                break;
            }
        }

        //Clear a completed line
        if ( isCompleted ) {
            lineCount++;

            for ( let newY = y; 0 < newY; newY-- ) {
                for ( let newX = 0; newX < FIELD_COLUMN; newX++ ) {
                    //A new line will be updated as the upper line
                    field[ newY ][ newX ] = field[ newY-1 ][ newX ];
                }
            }
        }
    }
}


//Drop a new tetromino
function dropTetromino () {
    //If the game is over, no more new tetromino will be dropped
    if ( isGameOver ) {
        return;
    }

    if ( checkMove( 0, 1 ) ) {
        tetromino_y++;
    } else {
        //Once the tetromino reaches the bottom line, a user can not move it
        fixTetromino();

        //Check if a line can be deleted
        checkLine();

        //A new tetromino shape will be selected randomly again
        tetromino_type = Math.floor( Math.random() * (TETROMINO_TYPES.length-1) ) + 1;
        tetromino   = TETROMINO_TYPES[ tetromino_type ];
        tetromino_x = START_X;
        tetromino_y = START_Y;

        //Check if the tetrominos stock by the starting X-axis
        if ( !checkMove(0, 0) ) {
            isGameOver = true;
        }
    }

    drawAll();
}


//Movement when a user presses a certain key
document.onkeydown = function( e ) {
    //If the game is over, the tetromino won't rotate or move
    if ( isGameOver ) {
        return;
    }

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