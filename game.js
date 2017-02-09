var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game-canvas', { preload: preload, create: create, update: update, render: render });

//Prepare assets to be loaded 
function preload() {
    //The sprites need to be loaded in order so in our case we need to 
    game.load.image('background', 'images/space.jpg');

    
    /// Load in the Bad Guys 
    game.load.image('bossEnimy', "images/enemy_ship_minion_tester_1.png");
    
    game.load.image('bullet', "images/bulletTest.png");
    
    
    game.load.image('bossEnimy_2', "images/enemy_ship_minion_tester_2.png");

    //Load power up image
    game.load.image('life_powerup', "images/life_powerup.png");
    
    
        //Load the player assets
    game.load.image('main_player', 'images/player.png');
    
        //Load the projectile assets
    game.load.image('bullet', 'images/bullet.png');


    game.load.image('button', 'images/red-button-hi.png');
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
var boss2;
var lifeUp;
var livesText;
var lives = 3;
var boss1Lives = 5;
var boss2Lives = 3;

var button;
var buttonText;

//Scoring variables
var score;
var scoreString = '';


var updateText;
var updateAmt=0;

var bullets;
var fireButton;
var nextFire = 0; 
var bulletTime = 0;
var gameover;

var stateText;

//Ran once to load all the necessary sprites and objects in the game
function create() {
    gameover = false;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Add Tile background to give scrolling effect
    scrolling = game.add.tileSprite(0, 0, 800, 600, 'background');

    //game.add.state()

    //Adding button to pause game
    button = game.add.image(game.world.width - 98, 445, 'button');
    button.scale.setTo(.15,.15);
    buttonText = game.add.text(game.world.width - 80, 448, 'Pause', { font: '18px Arial', fill: '#fff' });
    button.inputEnabled = true;
    button.events.onInputDown.add(listener, this);


    //Add lives
    livesText = game.add.text(game.world.width - 555, 450, 'Lives : '+lives, { font: '20px Arial', fill: '#fff' });
    livesText.anchor.set(1,0);

    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    //creates player and two enemies
    createSprites();

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

    //Scoring
    //scoreString = 'Score : ';
    //scoreText = game.add.text(10, 450, scoreString + score, { font: '20px Arial', fill: '#fff' });


    updateText = game.add.text(10, 10, 'Game has updated '+updateAmt+' times.' , { font: '20px Arial', fill: '#fff' });

}

//created the add sprite function so that when the game is over, the function can be called to repopulate the screen with the sprites
function createSprites(){
    //Create player object
    main_player = game.add.sprite(50, 380/2, 'main_player');
    //Double Check to see what this means
    //main_player.anchor.setTo(0.5, 0.5);
    game.physics.enable(main_player, Phaser.Physics.ARCADE);
    main_player.alive = true;
    main_player.body.collideWorldBounds = true;


    //Add the enemies
    boss1 = game.add.sprite(100, 240, 'bossEnimy');
    //set anchor point to center of the sprite
    boss1.anchor.set(0.5);
    //enable physics for the boss1 body
    game.physics.enable(boss1, Phaser.Physics.ARCADE);
    //make the boss1 collide with the bounds of the world
    boss1.body.collideWorldBounds = true;

    boss1 = boss1_deatils(boss1);



    boss2 = game.add.sprite(100, 240, 'bossEnimy_2');
    //set anchor point to center of the sprite
    boss2.anchor.set(0.5);
    //enable physics for the boss1 body
    game.physics.enable(boss2, Phaser.Physics.ARCADE);
    //make the boss1 collide with the bounds of the world
    boss2.body.collideWorldBounds = true;

    boss2 = boss2_deatils(boss2);

}

//Allows the game to pause
/*having an issue with continuing the game while paused because pausing
the everything on the game pane pause, making the listener not function for the button*/
function listener (){

    if(game.paused == false) {
        game.paused = true;
        buttonText.setText('Start');
    } else {
        game.paused = false;
        buttonText.setText('Pause');
    }
}


function boss1_deatils(boss1){

    boss1.alive = true

    /// Change Size of the emimy
    boss1.scale.setTo(.5, .5);

    boss1.lives = 1

    boss1.strength = 10

    boss1.attackFreq = 5 // 10% of the time it will attack
    
    boss1.points = {
        'x': [ 440, 440, 440, 440, 440, 440, 440,440],
        'y': [ 100, 128, 256, 300, 382, 400, 410,100]
        
    }
    
    boss1.path = [];
    boss1.pi = 0;
    
    boss1.py = boss1.points.y;
    
//    for (var i = 0; i < boss1.py.length; i++)
//    {
//        boss1.py[i] = game.rnd.realInRange(32, 432);
//    }

    
    // Some math magic 
    var x = 1 / game.width;

    for (var i = 0; i <= 1; i += x){
//        var px = game.math.bezierInterpolation(boss1.points.x, i);
//        var py = game.math.bezierInterpolation(boss1.points.y, i);    
        
        var px = game.math.linearInterpolation(boss1.points.x, i);
        var py = game.math.linearInterpolation(boss1.points.y, i);
        
        boss1.path.push( { x: px, y: py });

//        game.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');    
    }
    
//    for (var p = 0; p < this.points.x.length; p++)
//    {
//        this.bmd.rect(this.points.x[p]-3, this.points.y[p]-3, 6, 6, 'rgba(255, 0, 0, 1)');
//    }
    
    return(boss1)
    

}
    
function boss1_update(boss1){
    
    if(boss1.alive){
        // selct a random numer 
        randomNumber = game.rnd.realInRange(1, 1000);

        if(randomNumber <= boss1.attackFreq){
            console.log('FIRE BOB 1!')
            boss1_fireBullet();
        }

    //    console.log(boss1.pi)

        // more the boss
        boss1.x = boss1.path[boss1.pi].x;
        boss1.y = boss1.path[boss1.pi].y;

        boss1.pi++;

        if (boss1.pi >= boss1.path.length)
        {
            boss1.pi = 0;
        }
    } // End of if Alive Statment

}  



function boss2_deatils(boss2){
    boss2.alive = true
    
    /// Change Size of the emimy 
    boss2.scale.setTo(.5, .5);
    
    boss2.attackFreq = 5 // 10% of the time it will attace
    
    boss2.points = {
        'x': [ 540, 540, 540, 540, 540, 540, 540,540],
        'y': [ 110, 138, 266, 290, 392, 400, 410,110]
        
    }
    
    boss2.path = [];
    boss2.pi = 0;
    
    boss2.py = boss2.points.y;

    // Some math magic 
    var x = 1 / game.width;

    for (var i = 0; i <= 1; i += x){

        var px = game.math.linearInterpolation(boss2.points.x, i);
        var py = game.math.linearInterpolation(boss2.points.y, i);
        
        boss2.path.push( { x: px, y: py });

    }
    
    return(boss2) 
}


function boss2_update(boss2){
    if(boss2.alive){
        // selct a random numer 
        randomNumber = game.rnd.realInRange(1, 1000);

        if(randomNumber <= boss2.attackFreq){
            console.log('FIRE BOSS 2!')
            boss2_fireBullet();
        }

    //    console.log(boss2.pi)

        // more the boss
        boss2.x = boss2.path[boss2.pi].x;
        boss2.y = boss2.path[boss2.pi].y;

        boss2.pi++;

        if (boss2.pi >= boss2.path.length)
        {
            boss2.pi = 0;
        }
    } // end boss 2 alive check

} 


//Runs constantly referred to as the game loop 
function update() {                                               //!----------------- UPDAAAAAAAAAAAAAAATE ---------------!

    console.log('test');

    updateAmt++;
    updateText.setText('The game has updated '+updateAmt+' times');

    if(!gameover){
        scrolling.tilePosition.x += 5;
        
        //If this doesn't reset the player flies of the screen when velocity is changed
        main_player.body.velocity.setTo(0, 0);

        //If up is pressed
        if(controls.up.isDown){
            game.debug.text('Game Time ' + game.time.now, 100, 100);
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
    
        //Needs to be in it's own if statement 
        if(fireButton.isDown){
            //game.debug.text('Fire Pressed ' + fireButton.isDown, 32, 32);
            fire();
        }
        
        //Controls the behavior of the boss

        boss1_update(boss1);
        boss2_update(boss2);

        //Handle Collision with bullet and enemy
        game.physics.arcade.overlap(bullets, boss1, bulletCollisionWithEnemy1, null, this);

        //Handle Collision with bullet and enemy
        game.physics.arcade.overlap(bullets, boss2, bulletCollisionWithEnemy2, null, this);

        //Handle Collision with bullet and powerup
        game.physics.arcade.overlap(bullets, lifeUp, bulletCollisionWithLifeUp, null, this);

        //Handle Collision with enemy bullets and main_player
        game.physics.arcade.overlap(main_player, enemyBullets, bulletCollisionWithPlayer, null, this);


        //attempting to prompt user to restart game if both bosses have been killed
        //other method would involve using a counter that is incremented when a boss in killed, then prompt the user when the count equals 2
        /*
        if(boss1.kill == true && boss2.kill() == true){
            stateText.text=" GAME OVER \n Click to restart";
            stateText.visible = true;
        }
        */


    }

    // End of not game over test

} // End Update Function 


function render(){
    //game.debug.text('Game Time ' + game.time.now, 100, 100);
}


function fire(){
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

function bulletCollisionWithEnemy1(bullet, boss1){
    bullet.kill();
    boss1.kill();
}

function bulletCollisionWithEnemy2(bullet, boss2, boss2Lives){

    bullet.kill();
    boss2.kill();

    /*boss2Lives--;     


    if (boss2Lives) {

        bullet.kill();

    }else {

        boss2.kill();
        bullet.kill();

    }*/



}

function bulletCollisionWithLifeUp(bullet, lifeUp){
    bullet.kill();
    lifeUp.kill();
    lives++;
    livesText.setText('Lives: '+lives)
}

function bulletCollisionWithPlayer(main_player, enemyBullet){

    enemyBullet.kill();
    console.log('hit');
    lives--;

    //when the user has one life left, a power up will appear on the screen
    if (lives == 1) {                                                      //!----------- POWERUP ---------------!

        //random number is used to randomize spawning location of power up
        var num = randomNum();

        //add life powerup
        lifeUp = game.add.sprite(350, num, 'life_powerup');
        game.physics.enable(lifeUp, Phaser.Physics.ARCADE);
        lifeUp.anchor.set(0.5);
        lifeUp.scale.setTo(.5,.5);
        lifeUp.body.velocity.y = 100;
        lifeUp.body.collideWorldBounds = true;
        lifeUp.body.bounce.set(1);
    }

    //update lives text and end game if players lives reach 0
    if (lives) {
        livesText.setText('Lives: ' + lives);
    }  else{
        main_player.kill();
        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;
        livesText.setText('Lives: 0');

        game.input.onTap.addOnce(restart,this);
    }


}

function randomNum(){
    var num = Math.floor((Math.random() * 440) + 10);
    return num;
}

function boss1_fireBullet () {

    //  Grab the first bullet we can from the pool
    bullet = enemyBullets.getFirstExists(false);

    if (bullet){
        //  And fire it
        bullet.reset(boss1.x - boss1.width/2, boss1.y + 8);
        bullet.body.velocity.x = -400;
        bulletTime = game.time.now + 200;
    }
}

function boss2_fireBullet () {


    //  Grab the first bullet we can from the pool
    bullet = enemyBullets.getFirstExists(false);

    if (bullet)
    {
        //  And fire it
        bullet.reset(boss2.x - boss2.width/2, boss2.y + 8);
        bullet.body.velocity.x = -400;
        bulletTime = game.time.now + 200;
        }
    

}
function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

//function is called when game is restarted after player is killed
//screen is repopulated with sprites
//need to fix lifeText to reset to 3 when player is killed and game is restarted
function restart(){

    boss1.kill();
    boss2.kill();
    main_player.kill();
    lifeUp.kill();

    createSprites();
    stateText.visible = false;

}