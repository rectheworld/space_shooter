var game = new Phaser.Game(640, 380, Phaser.AUTO, 'game-canvas', { preload: preload, create: create, update: update });

function preload() {
    //The sprites need to be loaded in order so in our case we need to 
    game.load.image('background', '../images/space.jpg');
    game.load.image('', '')
}

var scrolling; 

function create() {
    scrolling = game.add.tileSprite(0, 0, 800, 600, 'background');
    game.add.state()
    
    
    //Add the enemies 
    
    //Add the 
}

function update() {
    scrolling.tilePosition.x += 5; 
}


/*
*
* How does the game end a it's loop, is there a game over state? 
*/
/*
*
*
*/

