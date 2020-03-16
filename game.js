//////////////////////////////
//This is 'game' variable is the soul of the game
/////////////////////////////
//var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game-canvas');

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game-canvas', { preload: preload, create: create, update: update, render: render });



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

var preload_counter = 0;
var create_counter = 0;
var update_counter = 0;

var stateText;

//variables for enemies and bosses
var list_of_badguys = []
var enemy; 
var boss;
var num_bosses;
var deadbosses; 


///////////////////////////////////// The Preload State /////////////////////////////////
function preload(){
    console.log('In Preload')
    
    
        //The sprites need to be loaded in order so in our case we need to 
    game.load.image('background', 'images/space.jpg');

    
    /// Load in the Bad Guys 
    game.load.image('bossEnemy', "images/enemy_ship_minion_tester_1.png");
    
    game.load.image('bullet', "images/bulletTest.png");
    
    
    game.load.image('bossEnimy_2', "images/enemy_ship_minion_tester_2.png");

    //Load power up image
    game.load.image('life_powerup', "images/life_powerup.png");
    
    
        //Load the player assets
    game.load.image('main_player', 'images/player.png');
    
        //Load the projectile assets
    game.load.image('bullet', 'images/bullet.png');


    game.load.image('button', 'images/red-button-hi.png');
    
    game.load.image('bossEnemy_2', "images/enemy_ship_boss.png"); 
    
    
    //////////////////////////////////////////////////////////////////////
    ///// STEP 1: Load The Sprites Images! //////////////////
    // Challange: Uncomment the code for the Second bad guy // 
    //////////////////////////////////////////////////////////
    
    

    /// For this game, all of our assets are going to come from phaser.io
    /// this is awesome because they are already made and FREEEEEEE!!!!

    /// These next two lines of code tell phaser we are getting our graphics from
    /// phaser.io

//    game.load.baseURL = 'https://s3.amazonaws.com/phaser-assets'
//    game.load.crossOrigin = 'anonymous';
//
//    //The sprites need to be loaded in order so in our case we need to
//    game.load.image('background', "/space.png")
//
//    /// Load in the Bad Guys 
//    game.load.image('bossEnemy', "/enemy_ship_minion.png");
//    game.load.image('', '');
//    game.load.image('bullet', "/bulletTest.png");
//
//    //Load the player assets
//    game.load.image('main_player', '/player.png');
//
//    //Load the projectile assets
//    game.load.image('bullet', '/bullet.png');
//
//    /// Load in the Game over assets 
//    game.load.image('gameover', '/gameOver.png');
//    game.load.image('play', '/play.png');
//    game.load.image('victory', '/victory.png');
//
//    //Load power up image
//    game.load.image('life_powerup', "/life_powerup.png");
//    game.load.image('button', '/red-button-hi.png');

     //---------------- PRELOAD TASK -----------------//
    ///game.load.image('bossEnemy_2', "/enemy_ship_boss.png"); 

    // ----------------END PRELOAD TASK ---------------///
    
    
    
    /// Show thw the Preload Function is running 
    preload_counter++;
    document.getElementById("preload_counter").innerHTML = preload_counter;


} /// end preload 

function create() {
    
    gameover = false;
    
    /// Starts the Phaser Physics Engin
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //Add Tile background to give scrolling effect
    scrolling = game.add.tileSprite(0, 0, 800, 600, 'background');
    
    //
    powerUp = false;
    
    /// Counts the number of bosses the player has killed
    /// In the Update Function, when deadbosses is equal to the number of bosses 
    /// Game will end 
    deadbosses = 0;
    
    /// At this point in create we have made zero bosses 
    // This will be used in the update function to see if we have killed all the bosses 
    num_bosses = 0;
    
    ///// STEP 2: Create the Inital Code For the Sprites! ////
    // Challange: Uncomment the code for the Second bad guy // 
    //////////////////////////////////////////////////////////
    

    //////// This code Creates the Main Character 
    /// This line Tells Phaser that we want to create a Sprite 
    main_player = game.add.sprite(55, 380/2, 'main_player');
    /// This line Tells Phasers some Details about the Sprite 
    main_player = createMainPlayer({
                                            "anchor":{
                                                "x": 0.5,
                                                "y": 0.5
                                            },
                                            //// This is how many lives the Boss Has
                                            "lives": 3,
                                            /// This is how big we want the main player to be 
                                            "size": 1, 
                                            "speed": 200,
                                            "health": 100,
                                        }, main_player);
    
    
    
    //////////////////////////////////////////////////////////////////////////////
    //////// This code Creates the First Boss 
    enemy = game.add.sprite(game.width, 240, 'bossEnemy');
    /// This code tells Phaser some details about the First Boss 
    enemy = createEnemy({
                                    "name": "Bison",
                                    "lives": 3,
                                    "size": 1,
                                    "strength": 5,
                                    "attackFreq": 5,
                                    "points": [[440, 100],
                                               [440,428]],
                                    "speed": 2000,
                                    "anchor": 0.2,
                                    "text":{
                                        "x" : game.world.width - .50 * game.world.width, 
                                        "y" : game.world.height  - 20,
                                        "anchor": {
                                            "x": "1",
                                            "y": "0"
                                        }
                                    }

                                }, enemy);
    
    /// We just added enemy as a bad guy, so we need to increases the number of bad guys in the game 
    num_bosses = num_bosses + 1;

    
    ///////////////////////////////////////////////////////////////////////////
    //////// This code Creates the Second Boss 
    //---------------- ADD SPRITE TASK -----------------//
//    boss = game.add.sprite(game.width, 340, 'bossEnemy_2'); 
//    /// This code tells Phaser some details about the Second Boss 
//    boss = createEnemy({
//                                    "name": "Akuma",
//                                    "lives": 3,
//                                    "size": 1,
//                                    "strength": 10,
//                                    "attackFreq": 1,
//                                    "points": [[480, 100],
//                                               [480,428]],
//                                    "speed": 2000,
//                                    "anchor": 0.5,
//                                    "text":{
//                                        "x" : game.world.width - .20 * game.world.width,
//                                        "y" : game.world.height  - 20,
//                                        "anchor": {
//                                            "x": "1",
//                                            "y": "0"
//                                        }
//                                    }
//
//                                }, boss);
//    
//    /// We just added boss as a bad guy, so we need to increases the number of bad guys in the game 
//    num_bosses = num_bosses + 1;
    
    //---------------- END ADD SPRITE TASK -----------------//
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    //Add lives Text
    livesText = game.add.text(game.world.width - .80 * game.world.width, game.world.height  - 20, 'Health : ' + main_player.health, { font: '20px Arial', fill: '#fff' });
    livesText.anchor.set(1,0);
    

//    enemyText = game.add.text(game.world.width - 200, 450, 'Quincy : ' + enemy.lives, { font: '20px Arial', fill: '#fff' });
//    enemyText.anchor.set(1,0);
    
//    bossText= game.add.text(game.world.width - 450, 450, 'Bossman : ' + boss.lives, { font: '20px Arial', fill: '#fff' })
//    bossText.anchor.set(1,0);
    
    
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
    PlayerbulletTime = 0;
    
    //Add the controls
    controls = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    map_keys();
    
    updateAmt = 0;
    updateText = game.add.text(10, 10, 'Game has updated '+ "0"+' times.' , { font: '20px Arial', fill: '#fff' });
    
    /// Show thw the Create Function is running 
    create_counter++;
    document.getElementById("create_counter").innerHTML = create_counter;
    
    //Text to display if you won or lost
    stateText = game.add.text(game.world.centerX,game.world.centerY,'', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
}// End create function


function update() {

    //---------------- UPDATE TASK -----------------//
    //Demonstrates how many times this function is being ran. 
        /// Show thw the Create Function is running 
    //update_counter++;
    //document.getElementById("update_counter").innerHTML = update_counter;
    //---------------- END UPDATE TASK -----------------//
    
    
    /// Check to See if the Game has ended 
    if(deadbosses === num_bosses){
        stateText.visible = true;
        stateText.setText("You Won!")
        
    }else if(main_player.health <= 0){
        stateText.visible = true;
        stateText.setText("You Dead!")
    }
    

    // Moving the picture of the background to the left makes it look like the ship is flying
    scrolling.tilePosition.x -= 5;

    /////////////////////////////////////
    // Lives 
    // These If statments control what happens when the bad guys lives reaches Zero
    /////////////////////////////////////

    if(enemy.lives === 0){
        enemy.kill();
    }

//---------------- Update TASK 1-----------------//
//        if(boss.lives === 0){
//            boss.kill();
//        }
//---------------- Update TASK 1-----------------//


    /////////////////////////////////////
    // MOVEMENT //
    // This part of the code controls the movement of the player's spaceship 
    /////////////////////////////////////

    //If this doesn't reset the player flies of the screen when velocity is changed
    main_player.body.velocity.setTo(0, 0);

    //If up is pressed
    if(controls.up.isDown){
        // If the up arrow is pressed move the ship up
        main_player.body.velocity.y = -main_player.speed;
    }

    //If down arrow is pressed move the ship down
    else if(controls.down.isDown){
        main_player.body.velocity.y = main_player.speed;
    }

    ////////////////////////////////////
    // SHOOTING LAZERS
    // this controls when the player shoots 
    ////////////////////////////////////

    // If the fireButton (the space bar) is down, then lets fire a bullet  
    if(fireButton.isDown){
        fire(main_player);
    }

    /////////////////////////////////////
    // ARTIFICAL INTELIGENCE 
    // These update functions control the two bosses 
    ////////////////////////////////////
    enemy_update(enemy);

    /// ----- Update Task 2 ----///
    
    //enemy_update(boss);
    
    /// ----- Update Task 2 ---- ////

    /////////////////////////////////////
    // Custom //
    // Try adding your own if statment  
    /////////////////////////////////////
    // Examples: 
//        if(player.health === 50){
//            player.size = 2
//        }


//        if(boss.health == 1){
//            boss.attackFreq = 5
//        }
//        
    
//        if(boss.health < 3){
//            boss.size
//        }
//


    
    /////////////////////////////////////
    // Colision Detection //
    // These may may not look it, but these lines are actrally special if statments 
    // They check if two sprites are touching 
    /////////////////////////////////////
    game.physics.arcade.overlap(enemy, bullets, bulletCollisionWithEnemy, null, this);
    game.physics.arcade.overlap(boss, bullets, bulletCollisionWithEnemy, null, this);


    //---------------- Update TASK 3 -----------------//
    
    //Handle Collision with enemy bullets and main_player
    game.physics.arcade.overlap(main_player, enemyBullets, bulletCollisionWithPlayer, null, this);

    // ----------------Update PRELOAD TASK 3---------------///

    //Handle Collision with bullet and powerup
    game.physics.arcade.overlap(bullets, lifeUp, bulletCollisionWithLifeUp, null, this);




} // End Update Function 


//Utility Functions
function render(){
    //game.debug.text('Game Time ' + game.time.now, 100, 100);
}





///////////////////////////////////// The Game State /////////////////////////////////
//
//var theGame = function(game){
//    var scrolling; 
//    var sprite;
//    var boss1Weapon;
//    var cursors;
//    var fireButton;
//    var bullets;
//    var bulletTime = 0;
//    var enemyBullet;
//    var firingTimer = 0;
//    var scrolling;
//    var main_player;
//    var controls;
//    var map_keys;
//    
//    var lifeUp;
//    var playerLivesText; 
//    var enemyText;
//    var bossText;
//    var powerUp;
//    
//    var updateText;
//    var bullets;
//    var fireButton;
//    var nextFire = 0; 
//    var gameover; 
//    
//    //variables for enemies and bosses
//    var enemy; 
//    var boss;
//    
////    var enemyFireRate = 75;
//    
//    
//} /// The Game Object 



//Create Enemy
function createEnemy(properties, enemy){
    enemy.alive = true;
    
    enemy.scale.setTo(properties.size);
    enemy.lives = properties.lives;
    enemy.strength = properties.strength;
    enemy.attackFreq = properties.attackFreq
    enemy.anchor.set(properties.anchor);
    enemy.speed = properties.speed;
    
	game.physics.enable(enemy, Phaser.Physics.ARCADE);
    
	//make the enemy collide with the bounds of the world
	//enemy.body.collideWorldBounds = true;
    
    enemy.points = properties.points; 
    
    enemy.path = [];
    enemy.pi = 0;
    
    enemy.py = enemy.points.y;
    
//    enemy = enemyMath(enemy);
    
    //Add Text for enemy
    enemy.name = properties.name;
    
    enemy.livesText = game.add.text(properties.text.x, properties.text.y, enemy.name + ' Lives : ' + enemy.lives, { font: '20px Arial', fill: '#fff' });
    enemy.livesText.anchor.setTo(properties.text.anchor.x, properties.text.anchor.y);
    
    point_index = 0;
    x_index = 0;
    y_index = 1;
    
    /// create a  tween to move this guy 
    enemy.tweenA = game.add.tween(enemy).to( {x: enemy.points[point_index][x_index], y: enemy.points[point_index][y_index]}, enemy.speed, "Linear", true);
    enemy.tweenB = game.add.tween(enemy).to( {x: enemy.points[point_index + 1][x_index], y: enemy.points[point_index + 1][y_index]}, enemy.speed, "Linear", true);

    enemy.tweenA.chain(enemy.tweenB);
    enemy.tweenB.chain(enemy.tweenA);
    
    enemy.tweenA.start();
    
    return enemy;
}
    
function enemy_update(enemy){                   
    if(enemy.alive){
        // selct a random numer 
        randomNumber = game.rnd.realInRange(1, 150); //!--------------- Enemy FIRERATE --------------------------------------!

        if(randomNumber <= enemy.attackFreq){
            enemy_fireBullet(enemy);
        }

        // move the boss
//        enemy.x = enemy.path[enemy.pi].x;
//        enemy.y = enemy.path[enemy.pi].y;
//
//        enemy.pi++;
//
//        if (enemy.pi >= enemy.path.length)
//        {
//            enemy.pi = 0;
//        }
    } // end boss 2 alive check
}

function createMainPlayer(options, player){
    player.anchor.setTo(options.anchor.x, options.anchor.y);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    
    player.body.collideWorldBounds = true;
    player.alive = true;
    player.scale.setTo(options.size);
    player.speed = options.speed;
    player.health = options.health;
    
    return player;
}

//Main Player fire function
function fire(player){
    
    if(player.alive){        
        if(game.time.now > PlayerbulletTime){  //checks the current time against the "PlayerbulletTime" value
            console.log('in fire')
            //Grabs bullets from pool
            bullet = bullets.getFirstExists(false);
        
            if(bullet){
                bullet.reset(player.x + 10, player.y + 5);
                bullet.body.velocity.x = 400;
                PlayerbulletTime = game.time.now + 200;  //sets the "PlayerbulletTime" value in the future so we have to wait until then to fire next
            }
        }
    }
}
    
//Spawns power up item 
function spawnPowerUp(){
    lifeUp = game.add.sprite(350, 350, 'life_powerup');
    game.physics.enable(lifeUp, Phaser.Physics.ARCADE);
    lifeUp.anchor.set(0.5);
    lifeUp.scale.setTo(2,2); // make power up twice as big 
    lifeUp.body.velocity.y = 100;
    lifeUp.body.collideWorldBounds = true;
    lifeUp.body.bounce.set(1);
}

function enemy_fireBullet(enemy) {
    //  Grab the first bullet we can from the pool
    bullet = enemyBullets.getFirstExists(false);

    if (bullet){
        // give it a damage value
        bullet.strength = enemy.strength;
        
        //  And fire it
        bullet.reset(enemy.x - enemy.width/2, enemy.y + 8);
        bullet.body.velocity.x = -400;
        bulletTime = game.time.now + 200;
    }
}
      
    
///////////////////////////////////// Collision Detectors //////////////////////////////////
    
//Collision Detector for enemies
function bulletCollisionWithEnemy(badguy, bullet){
    
    bullet.kill();
    badguy.lives--;
    if(badguy.lives == 0){
        deadbosses +=1;
    }
    badguy.livesText.setText( badguy.name + ' Lives: ' + badguy.lives);  
}
  
//Collision Detector for Life up badge
function bulletCollisionWithLifeUp(bullet, lifeUp){
    bullet.kill();
    lifeUp.kill();
    main_player.health+= 20;
    powerUp = false;
    livesText.setText('Health: '+ main_player.health)
}

//Collision Detector for main player 
function bulletCollisionWithPlayer(main_player, enemyBullet){

    enemyBullet.kill();

    main_player.health = main_player.health - enemyBullet.strength

    //update lives text and end game if players lives reach 0
    if (main_player.health) {
        
        livesText.setText('Health: ' + main_player.health);
        
        //If my lives are low we spawn a power up.
        if(main_player.health == 30){                            //-------------- POWER UP TASK ------------------------//
            spawnPowerUp();
        }
    } 
    else{
        game.state.start('gameOver');
    }
}

function gameOver(){
    gameover = true; 
}
    

//Random Number generator
function randomNum(){
    var num = Math.floor((Math.random() * 440) + 10);
    return num;
}
    
//function enemyMath(bossEnemy){
//var x = 1 / game.width;
//
//for (var i = 0; i <= 1; i += x){
//    var px = game.math.linearInterpolation(bossEnemy.points.x, i);
//    var py = game.math.linearInterpolation(bossEnemy.points.y, i);
//
//    bossEnemy.path.push( { x: px, y: py });
//}
//
//return bossEnemy;
//}


function map_keys(){

    A_key = game.input.keyboard.addKey(Phaser.Keyboard.A);
    B_key = game.input.keyboard.addKey(Phaser.Keyboard.B);
    C_key = game.input.keyboard.addKey(Phaser.Keyboard.C);
    D_key = game.input.keyboard.addKey(Phaser.Keyboard.D);
    E_key = game.input.keyboard.addKey(Phaser.Keyboard.E);
    F_key = game.input.keyboard.addKey(Phaser.Keyboard.F);
    G_key = game.input.keyboard.addKey(Phaser.Keyboard.G);
    H_key = game.input.keyboard.addKey(Phaser.Keyboard.H);
    I_key = game.input.keyboard.addKey(Phaser.Keyboard.I);
    J_key = game.input.keyboard.addKey(Phaser.Keyboard.J);
    K_key = game.input.keyboard.addKey(Phaser.Keyboard.K);
    L_key = game.input.keyboard.addKey(Phaser.Keyboard.L);
    M_key = game.input.keyboard.addKey(Phaser.Keyboard.M);
    N_key = game.input.keyboard.addKey(Phaser.Keyboard.N);
    O_key = game.input.keyboard.addKey(Phaser.Keyboard.O);
    P_key = game.input.keyboard.addKey(Phaser.Keyboard.P);
    Q_key = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    R_key = game.input.keyboard.addKey(Phaser.Keyboard.R);
    S_key = game.input.keyboard.addKey(Phaser.Keyboard.S);
    T_key = game.input.keyboard.addKey(Phaser.Keyboard.T);
    U_key = game.input.keyboard.addKey(Phaser.Keyboard.U);
    V_key = game.input.keyboard.addKey(Phaser.Keyboard.V);
    W_key = game.input.keyboard.addKey(Phaser.Keyboard.W);
    X_key = game.input.keyboard.addKey(Phaser.Keyboard.X);
    Y_key = game.input.keyboard.addKey(Phaser.Keyboard.Y);
    Z_key = game.input.keyboard.addKey(Phaser.Keyboard.Z);

//    game.input.keyboard.onDownCallback = function(e) {   
//        //for demonstration, next line prints the keyCode to console
//        console.log(e.keyCode); 
//    }
}


