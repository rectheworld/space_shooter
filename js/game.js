var game = new Phaser.Game(640, 380, Phaser.AUTO, 'game-canvas', { preload: preload, create: create, update: update, render: render });

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
var controls;


var bullets;
var fireButton;
var nextFire = 0; 
var bulletTime = 0;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //Add Tile background to give scrolling effect
    scrolling = game.add.tileSprite(0, 0, 800, 600, 'background');
    
    //Create player object
    main_player = game.add.sprite(50, 380/2, 'main_player');
    //Double Check to see what this means 
    //main_player.anchor.setTo(0.5, 0.5);
    game.physics.enable(main_player, Phaser.Physics.ARCADE);
    
    
    //Add the enemies 
    
    //Add Bullets 
    bullets = game.add.group();
    bullets.enableBody = true; 
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    
    bullets.createMultiple(20, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    
    
    
    
    //Add the controls
    controls = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
    if(controls.up.isDown){
        main_player.body.velocity.y = -200;
    }
    
    else if(controls.down.isDown){
        main_player.body.velocity.y = 200;
    }
    
    //Needs to be in it's own if statement 
    if(fireButton.isDown){
        //game.debug.text('Fire Pressed ' + fireButton.isDown, 32, 32);
        fire();
        
    }
}

function fire(){
    if(game.time.now > bulletTime){
        
        //Grabs bullets from pool
        bullet = bullets.getFirstExists(false);
        
        if(bullet){
            bullet.reset(main_player.x + 10, main_player.y + 5);
            bullet.body.velocity.x = 400;
            bulletTime = game.time.now + 200;
        }
    }
}
function render(){
    //game.debug.text('Game Time ' + game.time.now, 100, 100);
}


/*
*
* How does the game end a it's loop, is there a game over state? 
*/
/*
*
*
*/

