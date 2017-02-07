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
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    
    function preload() {
        
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.image('space', 'assets/space.png');
        game.load.image('ledge', 'assets/moon_ledge.png');
        
    }
    
    var platforms;
    
    function create() {
        
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //  A simple background for our game
        game.add.sprite(0, 0, 'space');
        
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();
        
        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;
        
        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);
        
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;
        
        //  Now let's create two ledges
        var ledge = platforms.create(400, 400, 'ledge');
        
        ledge.body.immovable = true;
        
        ledge = platforms.create(50, 250, 'ledge');
        
        ledge.body.immovable = true;
        
        var image = game.add.sprite(0, 100, 'ledge');
        game.physics.enable(image, Phaser.Physics.ARCADE);
        image.body.velocity.setTo(200,0);
        image.body.collideWorldBounds = true;
        image.body.bounce.set(1);
        
    }
    
    function update() {
    }
};
