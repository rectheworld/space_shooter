var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game-canvas', { preload: preload, create: create, update: update, render: render });

//Prepare assets to be loaded 
function preload() {
    //The sprites need to be loaded in order so in our case we need to 
    game.load.image('background', '../images/space.jpg');

    
    /// Load in the Bad Guys 
    game.load.image('bossEnimy', "../images/enemy_ship_minion_tester_1.png")
    game.load.image('', '')
    
    game.load.image('bullet', "../images/bulletTest.png")
    
        //Load the player assets
    game.load.image('main_player', '../images/player.png');
    
        //Load the projectile assets
    game.load.image('bullet', '../images/bullet.png');
}

var scrolling; 
var sprite;
var boss1Weapon;
var cursors;
var fireButton;
var bullets;
var bulletTime = 0;
var enemyBullet;
var firingTimer = 0;
var scrolling;
var main_player;
var controls;
var boss1; 


var bullets;
var fireButton;
var nextFire = 0; 
var bulletTime = 0;
var gameover; 

//Ran once to load all the necessary sprites and objects in the game
function create() {
    gameover = false;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //Add Tile background to give scrolling effect
    scrolling = game.add.tileSprite(0, 0, 800, 600, 'background');

    //game.add.state()

    
    //Create player object
    main_player = game.add.sprite(50, 380/2, 'main_player');
    //Double Check to see what this means 
    //main_player.anchor.setTo(0.5, 0.5);
    game.physics.enable(main_player, Phaser.Physics.ARCADE);

    
    
    //Add the enemies 
    boss1 = game.add.sprite(400, 150, 'bossEnimy');
    //set anchor point to center of the sprite
	boss1.anchor.set(0.5);
	//enable physics for the boss1 body
	game.physics.enable(boss1, Phaser.Physics.ARCADE);
	//make the boss1 collide with the bounds of the world
	boss1.body.collideWorldBounds = true;
	
    boss1 = boss1_deatils(boss1);
    
    
//    ///Create Ememy Fire  (based off phaser example)
//    //  Creates 40 bullets, using the 'bullet' graphic
//    boss1Weapon = game.add.weapon(1, 'bullet');
// 
//
//    //  The bullets will be automatically killed when they leave the world bounds
//    boss1Weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
//
//    //  Because our bullet is drawn facing up, we need to offset its rotation:
//    boss1Weapon.bulletAngleOffset = 90;
//
//    //  The speed at which the bullets are fired
//    boss1Weapon.bulletSpeed = 400;
//	
//    /// For Testing the ememy Fire 
//    cursors = this.input.keyboard.createCursorKeys();
//    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    

    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'bullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);
    
    
    //Add Bullets 
    bullets = game.add.group();
    bullets.enableBody = true; 
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    
    //Creates bullet pools
    bullets.createMultiple(20, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    
    //Add the controls
    controls = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}


function boss1_deatils(boss1){
    
    /// Change Size of the emimy 
    boss1.scale.setTo(.5, .5);
    
    boss1.lives = 1 
    
    boss1.strength = 10
    
    boss1.attackFreq = 5 // 10% of the time it will attace
    
    boss1.points = {
        'x': [ 400, 128, 256, 384, 512, 608 ],
        'y': [ 150, 240, 240, 240, 240, 240 ]
    }
    
    boss1.path = [];
    
    boss1.py = boss1.points.y;

//    for (var i = 0; i < py.length; i++)
//    {
//        py[i] = game.rnd.realInRange(32, 432);
//    }
    
    return(boss1)
    
}  

//Runs constantly referred to as the game loop 
function update() {
    
    if(!gameover){
        scrolling.tilePosition.x += 5;
        
        //If this doesn't reset the player flies of the screen when velocity is changed
        main_player.body.velocity.setTo(0, 0);

        //If up is pressed
        if(controls.up.isDown){
            main_player.body.velocity.y = -200;
        }

        //If down is pressed 
        else if(controls.down.isDown){
            main_player.body.velocity.y = 200;
        }

        //Needs to be in it's own if statement 
        if(fireButton.isDown){
            //game.debug.text('Fire Pressed ' + fireButton.isDown, 32, 32);
            fire(main_player);
        }

        //Controls the behavior of the boss
        boss1_update(boss1);
    }       
    
//    switch(controls){
//          case controls.left.isDown:  
//                //player.body.velocity.x = -200;
//            break;
//    }
    
    
    
    
//Handle Collision with bullet and enemy
game.physics.arcade.overlap(bullets, boss1, bulletCollisionWithEnemy, null, this);
    
//Handle Collision with enemy bullets and main_player
game.physics.arcade.overlap(main_player, enemyBullets, bulletCollisionWithPlayer, null, this);
} // End Update Function 

function render(){
    //game.debug.text('Game Time ' + game.time.now, 100, 100);
}

function boss1_update(boss1){
    if(boss1.alive){
        // selct a random numer 
        randomNumber = game.rnd.realInRange(1, 1000);
        if(randomNumber <= boss1.attackFreq){
            //console.log('FIRE BOSS 1!')
            fireBullet();
        }
    } 
} 

function fire(main_player){
    
    if(main_player.alive){
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
}

function bulletCollisionWithEnemy(bullet, boss1){
    bullet.kill();
    boss1.kill();
}

function bulletCollisionWithPlayer(main_player, enemyBullet){
    main_player.kill();
    enemyBullet.kill();
    
    
    //Maybe add a life system
    gameOver();
}

function fireBullet () {

    //  Grab the first bullet we can from the pool
    bullet = enemyBullets.getFirstExists(false);

    if (bullet){
        //  And fire it
        bullet.reset(boss1.x, boss1.y + 8);
        bullet.body.velocity.x = -400;
        bulletTime = game.time.now + 200;
    }
}

function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

function gameOver(){
    gameover = true; 
}