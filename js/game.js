var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-canvas', { preload: preload, create: create, update: update });

function preload() {
    //The sprites need to be loaded in order so in our case we need to 
    game.load.image('background', '../images/space.jpg');
    
    /// Load in the Bad Guys 
    game.load.image('bossEnimy', "../images/enemy_ship_minion_tester_1.png")
    game.load.image('', '')
    
    game.load.image('bullet', "../images/bulletTest.png")
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

function create() {
    scrolling = game.add.tileSprite(0, 0, 800, 600, 'background');
    //game.add.state()
    
    
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
    
    
    
    
    //Add the 
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

    for (var i = 0; i < py.length; i++)
    {
        py[i] = game.rnd.realInRange(32, 432);
    }
    
    return(boss1)
    
}
    
function boss1_update(boss1){
    // selct a random numer 
    randomNumber = game.rnd.realInRange(1, 1000);
    
    if(randomNumber <= boss1.attackFreq){
        console.log('FIRE BOSS 1!')
        fireBullet();
    }
    

}   


function update() {
    scrolling.tilePosition.x -= 5; 
    boss1_update(boss1)
    
    
   boss1.x = boss1.path[boss1.pi].x;
    boss1.y = boss1.path[boss1.pi].y;

    boss1.pi++;

    if (boss1.pi >= boss1.path.length)
    {
        boss1.pi = 0;
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

function fireBullet () {


    //  Grab the first bullet we can from the pool
    bullet = enemyBullets.getFirstExists(false);

    if (bullet)
    {
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