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
    
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });
    
    function preload() {
        
        game.load.image('volcanobg', 'assets/volcano.jpg');
        game.load.image('wizard', 'assets/wizard.png');
        game.load.image('warlock', 'assets/warlock.png');
        game.load.image('firebolt', 'assets/firebolt.png');
        
    }
    
    var wizard;
    var warlock;
    var volcano;
    var stateText;
    
    var firebolts;
    var firebolt;
    var tween;
    var finalbolt;
    
    function create() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        volcano = game.add.tileSprite(0, 0, 800, 600, 'volcanobg');
        
        wizard = game.add.sprite(30, 230, 'wizard');
        wizard.inputEnabled = true;
        wizard.input.enableDrag();
        
        warlock = game.add.sprite(700, 230, 'warlock');
        
        
        //GAMESTATE
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', {font: '84px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
        
        
        firebolts = game.add.group();
        firebolts.enableBody = true;
        
        for (var i = 0; i < 4; i++)
        {
            var f = firebolts.create(game.rnd.integerInRange(700, 701), game.rnd.integerInRange(230, 231), 'firebolt');
            game.physics.enable(f, Phaser.Physics.ARCADE);
            f.body.velocity.x = game.rnd.integerInRange(-400, 0);
            f.body.velocity.y = game.rnd.integerInRange(-200, 200);
        }
         
        firebolts.setAll('body.collideWorldBounds', true);
        firebolts.setAll('body.bounce.x', 1);
        firebolts.setAll('body.bounce.y', 1);
        firebolts.setAll('body.minBounceVelocity', 0);
        
        
        finalbolt = this.add.sprite(700, 300, 'firebolt');
        tween = game.add.tween(finalbolt).to( { x: [ 650, 650, 750, 650 ], y: [ 300, 200, 200, 200 ] }, 1000, "Sine.easeInOut", true, -1, false);
    
    }
    
    function update() {
        
        if (checkOverlap(wizard, warlock))
        {
            //volcano.visible =! volcano.visible;
            stateText.text = "YOU WIN!";
            stateText.visible = true;
            wizard.kill();
            warlock.kill();
        }
        
        //This next if statement is causing some losing bugs, can't figure out why.
        
            if (checkOverlap(wizard, firebolts))
            {
                volcano.visible =! volcano.visible;
                stateText.text = "YOU LOSE!";
                stateText.visible = true;
                wizard.kill();
            }
        
        if (checkOverlap(wizard, finalbolt))
        {
            //volcano.visible =! volcano.visible;
            stateText.text = "YOU LOSE!";
            stateText.visible = true;
            wizard.kill();
        }
        
    }
    
    function checkOverlap(spriteA, spriteB) {
        
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        
        return Phaser.Rectangle.intersects(boundsA, boundsB);
        
    }

};
