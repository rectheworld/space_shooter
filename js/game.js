//////////////////////////////
//This is 'game' variable is the soul of the game
/////////////////////////////
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game-canvas');

//var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game-canvas', { preload: preload, create: create, update: update, render: render });



//Prepare assets to be loaded 
var preload = function(game){};

///////////////////////////////////// The Preload State /////////////////////////////////
preload.prototype = {    
    
    preload: function(){
        console.log('In Preload')

        //The sprites need to be loaded in order so in our case we need to
        game.load.image('background', "../images/space.png")

        /// Load in the Bad Guys 
        game.load.image('bossEnemy', "../images/enemy_ship_minion.png");
        game.load.image('', '');
        game.load.image('bullet', "../images/bulletTest.png");
        //game.load.image('bossEnemy_2', "../ERROR!/enemy_ship_minion_tester_2.png"); //---------------- PRELOAD TASK -----------------//
        
        //Load the player assets
        game.load.image('main_player', '../images/player.png');
        
        //Load the projectile assets
        game.load.image('bullet', '../images/bullet.png');
        
        /// Load in the Game over assets 
        game.load.image('gameover', '../images/gameOver.png');
        game.load.image('play', '../images/play.png');
        game.load.image('victory', '../images/victory.png');
        
        //Load power up image
        game.load.image('life_powerup', "images/life_powerup.png");
        game.load.image('button', 'images/red-button-hi.png');
    
        
    },
    create: function(){
        this.game.state.start('theGame')    
    }
} // End of the preload function 

///////////////////////////////////// The Game State /////////////////////////////////

var theGame = function(game){
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
    
    var lifeUp;
    var playerLivesText; 
    var enemyText;
    var bossText;
    var powerUp;
    
    var updateText;
    var bullets;
    var fireButton;
    var nextFire = 0; 
    var gameover; 
    
    //variables for enemies and bosses
    var enemy; 
    var boss;
    
//    var enemyFireRate = 75;
    
    
} /// The Game Object 

theGame.prototype = {

//Create Enemy
createEnemy: function(properties, enemy){
    enemy.alive = true;
    
    enemy.scale.setTo(properties.scale.x, properties.scale.y);
    enemy.lives = properties.lives;
    enemy.strength = properties.strength;
    enemy.attackFreq = properties.attackFreq
    enemy.anchor.set(properties.anchor);
    
	game.physics.enable(enemy, Phaser.Physics.ARCADE);
    
	//make the enemy collide with the bounds of the world
	enemy.body.collideWorldBounds = true;
    
    enemy.points = properties.points; 
    
    enemy.path = [];
    enemy.pi = 0;
    
    enemy.py = enemy.points.y;
    
    enemy = this.enemyMath(enemy);
    
    //Add Text for enemy
    enemy.name = properties.name;
    
    enemy.livesText = game.add.text(properties.text.x, properties.text.y, enemy.name + ' Lives : ' + this.lives, { font: '20px Arial', fill: '#fff' });
    enemy.livesText.anchor.setTo(properties.text.anchor.x, properties.text.anchor.y);
    
    return enemy;
},
    
enemy_update: function(enemy){                   
    if(enemy.alive){
        // selct a random numer 
        randomNumber = game.rnd.realInRange(1, 150); //!--------------- Enemy FIRERATE --------------------------------------!

        if(randomNumber <= enemy.attackFreq){
            this.enemy_fireBullet(enemy);
        }

        // more the boss
        enemy.x = enemy.path[enemy.pi].x;
        enemy.y = enemy.path[enemy.pi].y;

        enemy.pi++;

        if (enemy.pi >= enemy.path.length)
        {
            enemy.pi = 0;
        }
    } // end boss 2 alive check
},

createMainPlayer: function(options, player){
    player.anchor.setTo(options.anchor.x, options.anchor.y);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    
    player.body.collideWorldBounds = true;
    player.alive = true;
    
    return player;
},

//Main Player fire function
fire: function(player){
    
    if(player.alive){        
        if(game.time.now > this.PlayerbulletTime){  //checks the current time against the "PlayerbulletTime" value
            console.log('in fire')
            //Grabs bullets from pool
            bullet = bullets.getFirstExists(false);
        
            if(bullet){
                bullet.reset(player.x + 10, player.y + 5);
                bullet.body.velocity.x = 400;
                this.PlayerbulletTime = game.time.now + 200;  //sets the "PlayerbulletTime" value in the future so we have to wait until then to fire next
            }
        }
    }
},
    
//Spawns power up item 
spawnPowerUp: function(){
    this.lifeUp = game.add.sprite(350, 350, 'life_powerup');
    game.physics.enable(this.lifeUp, Phaser.Physics.ARCADE);
    this.lifeUp.anchor.set(0.5);
    this.lifeUp.scale.setTo(.5,.5);
    this.lifeUp.body.velocity.y = 100;
    this.lifeUp.body.collideWorldBounds = true;
    this.lifeUp.body.bounce.set(1);
},

enemy_fireBullet: function (enemy) {
    //  Grab the first bullet we can from the pool
    bullet = enemyBullets.getFirstExists(false);

    if (bullet){
        //  And fire it
        bullet.reset(enemy.x - enemy.width/2, enemy.y + 8);
        bullet.body.velocity.x = -400;
        bulletTime = game.time.now + 200;
    }
},
      
//Ran once to load all the necessary sprites and objects in the game
create: function() {
    
    //Main player lives
    this.lives = 3;
    
    this.gameover = false;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //Add Tile background to give scrolling effect
    scrolling = game.add.tileSprite(0, 0, 800, 600, 'background');

    //Text to display if you won or lost
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
    
    //Create player object
//    main_player = game.add.sprite(55, 380/2, 'main_player');
//    main_player.anchor.setTo(0.5, 0.5);
//    game.physics.enable(main_player, Phaser.Physics.ARCADE);
//    main_player.alive = true;
    
    this.main_player = game.add.sprite(55, 380/2, 'main_player');
    this.main_player = this.createMainPlayer({
                                            "anchor":{
                                                "x": 0.5,
                                                "y": 0.5
                                            }
                                        }, this.main_player);
    
    this.powerUp = false;
    
    //Add the enemies 
    this.enemy = game.add.sprite(100, 240, 'bossEnemy');
    this.enemy = this.createEnemy({
                                    "name": "Bison",
                                    "lives": 3,
                                    "scale": {
                                        "x": 0.5,
                                        "y": 0.5
                                    },
                                    "strength": 10,
                                    "attackFreq": 5,
                                    "points": {
                                        "x": [440, 440, 440, 440, 440, 440, 440, 440],
                                        "y": [100, 128, 256, 300, 382, 400, 410, 100]
                                    },
                                    "anchor": 0.2,
                                    "text":{
                                        "x" : game.world.width - .50 * game.world.width, 
                                        "y" : game.world.height  - 20,
                                        "anchor": {
                                            "x": "1",
                                            "y": "0"
                                        }
                                    }

                                }, this.enemy);
    
    //Create Boss the boss does some funky stuff. :-) 
    this.boss = game.add.sprite(200, 340, 'ERROR'); //---------------- ADD SPRITE TASK -----------------//
    this.boss = this.createEnemy({
                                    "name": "Akuma",
                                    "lives": 3,
                                    "scale": {
                                        "x": 0.5,
                                        "y": 0.5
                                    },
                                    "strength": 10,
                                    "attackFreq": 1,
                                    "points": {
                                        "x": [640, 640, 640, 440, 540, 540, 540, 540],
                                        "y": [100, 100, 216, 300, 382, 400, 410, 100]
                                    },
                                    "anchor": 0.5,
                                    "text":{
                                        "x" : game.world.width - .20 * game.world.width,
                                        "y" : game.world.height  - 20,
                                        "anchor": {
                                            "x": "1",
                                            "y": "0"
                                        }
                                    }

                                }, this.boss);
    
    
    //Add lives Text
    this.livesText = game.add.text(game.world.width - .80 * game.world.width, game.world.height  - 20, 'Lives : ' + this.lives, { font: '20px Arial', fill: '#fff' });
    this.livesText.anchor.set(1,0);
    

//    this.enemyText = game.add.text(game.world.width - 200, 450, 'Quincy : ' + this.enemy.lives, { font: '20px Arial', fill: '#fff' });
//    this.enemyText.anchor.set(1,0);
    
//    this.bossText= game.add.text(game.world.width - 450, 450, 'Bossman : ' + this.boss.lives, { font: '20px Arial', fill: '#fff' })
//    this.bossText.anchor.set(1,0);
    
    /// Counts the number of bosses the player has killed
    /// In the Update Function, when deadbosses is equal to 2 the
    /// Victory screen will show
    this.deadbosses = 0;
    
    /// a placeholder for lifeup
    lifeUp =null;

    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'bullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 0.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);
    
    //Add Player Bullets 
    bullets = game.add.group();
    bullets.enableBody = true; 
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    
    //Creates bullet pools
    bullets.createMultiple(20, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    
    // Bullet Timers
    this.PlayerbulletTime = 0;
    
    //Add the controls
    controls = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    updateAmt = 0;
    updateText = game.add.text(10, 10, 'Game has updated '+ "0"+' times.' , { font: '20px Arial', fill: '#fff' });
},

//Runs constantly referred to as the game loop 
update: function() {
    console.log(this.enemy.lives);
    
    //Demonstrates how many times this function is being ran. 
    //updateText.setText('The game has updated '+ updateAmt++ +' times');//---------------- UPDATE TASK -----------------//
    
    //If enemy lives are zero then we win the game! 
    if(this.enemy.lives <= 0 && this.boss.lives <= 0){
        game.state.start('victory');
    };
    
    //Check if game is over
    if(!this.gameover){
    
        // Moving the picture of the background to the left makes it look like the ship is flying
        scrolling.tilePosition.x -= 5;
        
        if(this.enemy.lives === 0){
            this.enemy.kill();
        }
        
        /////////////////////////////////////
        // MOVEMENT //
        // This part of the code controls the movement of the player's spaceship 
        /////////////////////////////////////
        
        //If this doesn't reset the player flies of the screen when velocity is changed
        this.main_player.body.velocity.setTo(0, 0);
        
        //If up is pressed
        if(controls.up.isDown){
            // If the up arrow is pressed move the ship up
            this.main_player.body.velocity.y = -200;
        }
        
        //If down arrow is pressed move the ship down
        else if(controls.down.isDown){
            this.main_player.body.velocity.y = 200;
        }

        ////////////////////////////////////
        // SHOOTING LAZERS
        ////////////////////////////////////

        // If the fireButton (the space bar) is down, then lets fire a bullet  
        if(fireButton.isDown){
            this.fire(this.main_player);
        }
        
        /////////////////////////////////////
        // ARTIFICAL INTELIGENCE 
        // These update functions control the two bosses 
        ////////////////////////////////////
        this.enemy_update(this.enemy);
        this.enemy_update(this.boss);
        
        //Handle Collision with bullet and enemy
        game.physics.arcade.overlap(this.enemy, bullets, this.bulletCollisionWithEnemy, null, this);
        game.physics.arcade.overlap(this.boss, bullets, this.bulletCollisionWithEnemy, null, this);

        //Handle Collision with enemy bullets and main_player
        //game.physics.arcade.overlap(this.main_player, enemyBullets, this.bulletCollisionWithPlayer, null, this);
        
        //Handle Collision with bullet and powerup
        game.physics.arcade.overlap(bullets, this.lifeUp, this.bulletCollisionWithLifeUp, null, this);

        
    } // End of not game over test       

}, // End Update Function 
    
///////////////////////////////////// Collision Detectors //////////////////////////////////
    
//Collision Detector for enemies
bulletCollisionWithEnemy: function(enemy, bullet){
    
    bullet.kill();
    enemy.lives--;
    enemy.livesText.setText( enemy.name + ' Lives: ' + enemy.lives);  
},
  
//Collision Detector for Life up badge
bulletCollisionWithLifeUp: function(bullet, lifeUp){
    bullet.kill();
    lifeUp.kill();
    this.lives++;
    this.powerUp = false;
    this.livesText.setText('Lives: '+ this.lives)
},

//Collision Detector for main player 
bulletCollisionWithPlayer: function(main_player, enemyBullet){

    enemyBullet.kill();

    this.lives--;
    
    //update lives text and end game if players lives reach 0
    if (this.lives) {
        
        this.livesText.setText('Lives: ' + this.lives);
        
        //If my lives are low we spawn a power up.
        if(this.lives == 1){                            //-------------- POWER UP TASK ------------------------//
            this.spawnPowerUp();
        }
    } 
    else{
        game.state.start('gameOver');
    }
},

gameOver: function(){
    this.gameover = true; 
},
    
//Utility Functions
render: function(){
    //game.debug.text('Game Time ' + game.time.now, 100, 100);
},
//Random Number generator
randomNum: function(){
    var num = Math.floor((Math.random() * 440) + 10);
    return num;
},
    
enemyMath: function(bossEnemy){
var x = 1 / game.width;

for (var i = 0; i <= 1; i += x){
    var px = game.math.linearInterpolation(bossEnemy.points.x, i);
    var py = game.math.linearInterpolation(bossEnemy.points.y, i);

    bossEnemy.path.push( { x: px, y: py });
}

return bossEnemy;
},

} /// End of theGame prototype

///////////////////////////////////// The Game States /////////////////////////////////

var gameOver = function(game){
    
}

gameOver.prototype = {
    init: function(){
		console.log("in Game Over")
	},
  	create: function(){
  		var gameOverTitle = this.game.add.sprite(640 /2, 100,"gameover");
		gameOverTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(640 /2, 350,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("theGame");
	}
}

var victory = function(game){
    
}

victory.prototype = {
    init: function(){
		console.log("in Victory")
	},
  	create: function(){
  		var gameOverTitle = this.game.add.sprite(640 /2, 200,"victory");
		gameOverTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(640 /2, 350,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("theGame");
	}
} 


//////////////////////////////
//Game States
//Out Game will have three states
//1. The Start Menu
//2. The Game 
//3. The Game Over State
/////////////////////////////
game.state.add("preload", preload);
game.state.add("theGame", theGame);
game.state.add("gameOver", gameOver);
game.state.add("victory", victory);
game.state.start("preload");

/////////////////////////////////////////////////// Code Graveyard ////////////////////////////////////////////////////////////////////

//Have to refactor
    //boss1LivesText.setText('Quincy: '+ enemy.lives)
    //this.enemyText.setText('Quincy: ' + enemy.lives);
    //enemy.livesText.anchor.setTo(0.5, 0.5);

//    boss2LivesText = game.add.text(game.world.width - 250, 450, 'Dru : '+this.boss2.lives, { font: '20px Arial', fill: '#fff' });
//    boss2LivesText.anchor.set(1,0);

//set anchor point to center of the sprite
	
	
    //this.boss1 = this.boss1_details(this.boss1);
    
    
//    this.boss2 = game.add.sprite(100, 240, 'bossEnemy_2');
//    //set anchor point to center of the sprite
//	this.boss2.anchor.set(0.2);
//	//enable physics for the boss1 body
//	game.physics.enable(this.boss2, Phaser.Physics.ARCADE);
//	//make the boss1 collide with the bounds of the world
//	this.boss2.body.collideWorldBounds = true;
	
    //this.boss2 = this.boss2_details(this.boss2);

//boss2_details: function(boss2){
//    boss2.alive = true;
//    
//    /// Change Size of the emimy 
//    boss2.scale.setTo(.5, .5);
//    
//    boss2.lives = 3;
//    
//    boss2.strength = 10;
//    
//    boss2.attackFreq = 5 // 10% of the time it will attace
//    
//    boss2.points = {
//        'x': [ 540, 540, 540, 540, 540, 540, 540,540],
//        'y': [ 110, 138, 266, 290, 392, 400, 410,110]
//        
//    }
//    
//    boss2.path = [];
//    boss2.pi = 0;
//    
//    boss2.py = boss2.points.y;
//
//    // Some math magic 
//    var x = 1 / game.width;
//
//    for (var i = 0; i <= 1; i += x){
//
//        var px = game.math.linearInterpolation(boss2.points.x, i);
//        var py = game.math.linearInterpolation(boss2.points.y, i);
//        
//        boss2.path.push( { x: px, y: py });
//
//    }
//    
//    return(boss2) 
//},

//boss1_fireBullet: function () {
//    //  Grab the first bullet we can from the pool
//    bullet = enemyBullets.getFirstExists(false);
//
//    if (bullet){
//        //  And fire it
//        bullet.reset(this.boss1.x - this.boss1.width/2, this.boss1.y + 8);
//        bullet.body.velocity.x = -400;
//        bulletTime = game.time.now + 200;
//    }
//},

//boss2bulletCollisionWithEnemy: function(boss2, bullet){
//    
//    bullet.kill();
//    this.boss2.lives--;
//    
//    boss2LivesText.setText('Dru: '+this.boss2.lives);
//},

//boss1_update: function(boss1){
//    
//    if(boss1.alive){
//        // selct a random numer 
//        randomNumber = game.rnd.realInRange(1, 2000);   //!--------------- BOSS 1 FIRERATE --------------------------------------!
//
//        if(randomNumber <= boss1.attackFreq){
//            console.log('FIRE BOSS 1!')
//            this.boss1_fireBullet();
//        }
//
//        // move the boss
//        boss1.x = boss1.path[boss1.pi].x;
//        boss1.y = boss1.path[boss1.pi].y;
//
//        boss1.pi++;
//
//        if (boss1.pi >= boss1.path.length)
//        {
//            boss1.pi = 0;
//        }
//    } // End of if Alive Statment
//},

//boss2_update: function(boss2){                   //!--------------- BOSS 2 FIRERATE --------------------------------------!
//    if(boss2.alive){
//        // selct a random numer 
//        randomNumber = game.rnd.realInRange(1, 1000);
//
//        if(randomNumber <= boss2.attackFreq){
//            console.log('FIRE BOSS 2!')
//            this.boss2_fireBullet();
//        }
//
//    //    console.log(boss2.pi)
//
//        // more the boss
//        boss2.x = boss2.path[boss2.pi].x;
//        boss2.y = boss2.path[boss2.pi].y;
//
//        boss2.pi++;
//
//        if (boss2.pi >= boss2.path.length)
//        {
//            boss2.pi = 0;
//        }
//    } // end boss 2 alive check
//
//}, 

//boss2_fireBullet: function() {
//    //  Grab the first bullet we can from the pool
//    bullet = enemyBullets.getFirstExists(false);
//
//    if (bullet)
//    {
//        //  And fire it
//        bullet.reset(this.boss2.x - this.boss2.width/2, this.boss2.y + 8);
//        bullet.body.velocity.x = -400;
//        bulletTime = game.time.now + 200;
//        }
//    
//
//},

/////////////////////////////////////
        // Are the Bosses DEAD???? //
        // This part of the code checks to see if the boses are dead 
        /////////////////////////////////////
//        if(this.boss1.lives === 0){
//            boss1LivesText.setText('Quincy: '+ 'DEAD')
//            this.boss1.kill()
//            this.deadbosses++;
//        }
//        if(this.boss2.lives === 0){
//            boss2LivesText.setText('Dru: '+'DEAD')
//            this.boss2.kill()
//            this.deadbosses++;
//        }

/////////////////////////////////////
        // Should we Generate a Power UP?  //
        //  This is an IF statment, that creates a powerup if the lives is set to 0 
        /////////////////////////////////////
//        if (this.lives == 1 && this.powerUp == false) {                           //!----------------------- PowerUp Call --------------!
//
//            //random number is used to randomize spawning location of power up
//            var num = this.randomNum();
//            this.powerUp = true;                                                            
//            //add life powerup
//            this.lifeUp = game.add.sprite(350, num, 'life_powerup');
//            game.physics.enable(this.lifeUp, Phaser.Physics.ARCADE);
//            this.lifeUp.anchor.set(0.5);
//            this.lifeUp.scale.setTo(.5,.5);
//            this.lifeUp.body.velocity.y = 100;
//            this.lifeUp.body.collideWorldBounds = true;
//            this.lifeUp.body.bounce.set(1);
//
//        }

//boss1_details: function(boss1){
//    
//    //Variable to keep track of boss if alive
//    boss1.alive = true
//    
//    /// Change Size of the enemy 
//    boss1.scale.setTo(.5, .5);
//    
//    //Lives of the boss
//    boss1.lives = 3;
//    
//    //Strength of the boss 
//    boss1.strength = 10
//    
//    
//    boss1.attackFreq = 5 // 10% of the time it will attack
//    
//    
//    boss1.points = {
//        'x': [ 440, 440, 440, 440, 440, 440, 440,440],
//        'y': [ 100, 128, 256, 300, 382, 400, 410,100]
//        
//    }
//    boss1.path = [];
//    boss1.pi = 0;
//    
//    boss1.py = boss1.points.y;
//    
//    
//    // Some math magic 
//    var x = 1 / game.width;
//
//    for (var i = 0; i <= 1; i += x){
//        var px = game.math.linearInterpolation(boss1.points.x, i);
//        var py = game.math.linearInterpolation(boss1.points.y, i);
//        
//        boss1.path.push( { x: px, y: py });
//    }
//
//    return(boss1)    
//},

//bulletCollisionWithPlayer: function(main_player, enemyBullet){
//    main_player.kill();
//    enemyBullet.kill();
//    
//    //Maybe add a life system
//    game.state.start('gameOver');
//},

//resetBullet: function(bullet) {
//
//    //  Called if the bullet goes out of the screen
//    bullet.kill();
//
//},