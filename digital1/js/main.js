window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    
    function preload() {
        
        game.load.image('space', 'assets/space.png');
        game.load.image('ledge', 'assets/moon_ledge.png');
        game.load.image('guy', 'assets/guy.png');
        game.load.image('spaceship', 'assets/spaceship.png');
        game.load.image('ufo', 'assets/ufo.png');
        
    }
    
    
    var ledgestart;
    var player;
    var cursors;
    
    var ledges;
    var spaceship;
    var ufo;
    var stateText;
    
    function create() {
        
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //  A simple background for our game
        //game.add.sprite(0, 0, 'space');
        game.add.tileSprite(0, 0, 800, 600, 'space');
        
        ledges = game.add.group();
        ledges.enableBody = true;
        
        
        var ledge = ledges.create(0, 550, 'ledge');
        ledge.body.immovable = true;
        ledge.body.checkCollision.down = false;
        
        var ledge = ledges.create(400, 400, 'ledge');
        ledge.body.immovable = true;
        ledge.body.checkCollision.down = false;
        
        var ledge = ledges.create(100, 450, 'ledge');
        ledge.body.immovable = true;
        ledge.body.checkCollision.down = false;
        
        var ledge = ledges.create(150, 300, 'ledge');
        ledge.body.immovable = true;
        ledge.body.checkCollision.down = false;
        
        var ledge = ledges.create(300, 600, 'ledge');
        ledge.body.immovable = true;
        ledge.body.checkCollision.down = false;
        
        var ledge = ledges.create(600, 300, 'ledge');
        ledge.body.immovable = true;
        ledge.body.checkCollision.down = false;
        
        var ledge = ledges.create(600, 500, 'ledge');
        ledge.body.immovable = true;
        ledge.body.checkCollision.down = false;
        
        var ledge = ledges.create(550, 145, 'ledge');
        ledge.body.immovable = true;
        ledge.body.checkCollision.down = false;
        
        var ledge = ledges.create(100, 100, 'ledge');
        ledge.body.immovable = true;
        ledge.body.checkCollision.down = false;
        
        var ledge = ledges.create(300, 550, 'ledge');
        ledge.body.immovable = true;
        ledge.body.checkCollision.down = false;
        
        var ledge = ledges.create(300, 200, 'ledge');
        ledge.body.immovable = true;
        ledge.body.checkCollision.down = false;
        
        spaceship = game.add.sprite(750, 0, 'spaceship');
        game.physics.enable(spaceship, Phaser.Physics.ARCADE);
        
        ufo = game.add.sprite(0, 0, 'ufo');
        game.physics.enable(ufo, Phaser.Physics.ARCADE);
        ufo.body.collideWorldBounds = true;
        ufo.body.immovable = true;
        ufo.body.velocity.setTo(300,300);
        ufo.body.allowGravity = false;
        ufo.body.bounce.set(1);
        
        ufo = game.add.sprite(800, 600, 'ufo');
        game.physics.enable(ufo, Phaser.Physics.ARCADE);
        ufo.body.collideWorldBounds = true;
        ufo.body.immovable = true;
        ufo.body.velocity.setTo(200,400);
        ufo.body.allowGravity = false;
        ufo.body.bounce.set(1);
        
        //GAMESTATE
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', {font: '84px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
        
        //PLAYER
        player = game.add.sprite(20,400, 'guy');
        game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
        player.body.gravity.y = 800;
        player.body.bounce.y = 0;
        //player.body.collideWorldBounds = true;
        
        //CURSOR
        cursors = game.input.keyboard.createCursorKeys();
        
    }
    
    function destination (player, star) {
        player.kill();
        stateText.text = " You Win!";
        stateText.visible = true;
    }
    
    function ufoHit(player, ufo){
        ufo.kill();
        stateText.text = "GAME OVER!";
        stateText.visible = true;
    }
    
    function update() {
        var hitLedge = game.physics.arcade.collide(player, ledges);
        game.physics.arcade.overlap(player, spaceship, destination, null, this);
        game.physics.arcade.overlap(ufo, player, ufoHit, null, this);
        game.physics.arcade.collide(player, ufo);
        
        
        player.body.velocity.x = 0;
        
        if (cursors.left.isDown){
            player.body.velocity.x = -150;
        }
        if (cursors.right.isDown){
            player.body.velocity.x = 150;
        }
        if (cursors.up.isDown && player.body.touching.down && hitLedge)
        {
            player.body.velocity.y = -550;
        }
         
    }
};
