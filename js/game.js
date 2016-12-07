var game = new Phaser.Game(640, 380, Phaser.AUTO, 'game-canvas', { preload: preload, create: create, update: update });

function preload() {
    //The sprites need to be loaded in order so in our case we need to 
    game.load.image('background', '../images/space.jpg');
    game.load.image('', '');
    
    //Load the player assets
    game.load.image('main_player', '../images/player.png');
    
    
    //Load the projectile assets
    game.load.image('bullet', '../images/bullet.png');
}

var scrolling;
var main_player;
var controls

function create() {
    scrolling = game.add.tileSprite(0, 0, 800, 600, 'background');
    
    //Create player object
    main_player = game.add.sprite(0, 380/2, 'main_player');
    //Double Check to see what this means 
    //main_player.anchor.setTo(0.5, 0.5);
    game.physics.enable(main_player, Phaser.Physics.ARCADE);
    
    
    //Add the enemies 
    
    //Add the 
    
    //Add the controls
    controls = game.input.keyboard.createCursorKeys();
}

function update() {
    scrolling.tilePosition.x += 5; 
    
//    switch(controls){
//          case controls.left.isDown:  
//                //player.body.velocity.x = -200;
//            break;
//    }
    
    //If this doesn't reset the player flies of the screen when velocity is changed
    main_player.body.velocity.setTo(0, 0);
    
    //If left is pressed
    if(controls.left.isDown){
        main_player.body.velocity.y = -200;
    }
    
    else if(controls.right.isDown){
        main_player.body.velocity.y = 200;
    }     
}




/*
*
* How does the game end a it's loop, is there a game over state? 
*/
/*
*
*
*/

