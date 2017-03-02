window.onload = function() {
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'bluesquare', 'assets/bluesquare.png' );
        game.load.image( 'yellowsquare', 'assets/yellowsquare.png' );
        game.load.image( 'purplesquare', 'assets/purplesquare.png' );
        game.load.image( 'portal', 'assets/portal.png' );
        //blue square 25 pixels
    }
    
    var squares;
    var s;
    var cursors;
    var purplesquares;
    var purp;
    var portal;
    var stateText;
    
    function create() {
        
        portal = game.add.sprite(720, 100, 'portal');
        game.physics.enable(portal, Phaser.Physics.ARCADE);
        
        purp = game.add.sprite(600, 350, 'purplesquare');
        purp.alpha = 0;
        game.physics.enable(purp, Phaser.Physics.ARCADE);
        purp.body.immovable = true;
        purp.touch = false;
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.stage.backgroundColor = 0xD3D3D3;
        
        s = game.add.sprite(600, 500, 'yellowsquare');
        game.physics.enable(s, Phaser.Physics.ARCADE);
        s.body.bounce.y = 0;
        s.body.gravity.y = 100;
        //s.body.velocity.setTo(0,300);
        
        squares = game.add.group();
        squares.enableBody = true;
        
        purplesquares = game.add.group();
        purplesquares.enableBody = true;
        
        var ps = purplesquares.create(325, 100, 'purplesquare');
        ps.body.immovable = true;
        ps.touched = false;
        
        var square = squares.create(325, 450, 'bluesquare');
        square.body.immovable = true;
        var square = squares.create(300, 325, 'bluesquare');
        square.body.immovable = true;
        var square = squares.create(600, 575, 'bluesquare');
        square.body.immovable = true;
        square.body.allowGravity = false;
        var square = squares.create(600, 300, 'bluesquare');
        square.body.immovable = true;
        square.body.allowGravity = false;
        
        //CURSOR
        cursors = game.input.keyboard.createCursorKeys();
        
        purplesquares.forEach(function(psquare) {
                        psquare.alpha = 0;
                              game.add.tween(psquare).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
                              
                              });
        
        //GAMESTATE
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', {font: '84px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;

    }
    
    function win (s, portal) {
        game.time.events.add(Phaser.Timer.SECOND * .2, kill, this);
        //s.kill();
    }
    
    function kill() {
        s.kill();
        stateText.text = " You Win!";
        stateText.visible = true;
    }
    
    function update() {
        
        game.physics.arcade.overlap(s, portal, win, null, this);
        //game.physics.arcade.collide(s, portal);
        
        
        
        var hitSquare = game.physics.arcade.collide(s, squares);
        
        game.physics.arcade.collide(s, squares);
        game.physics.arcade.collide(s, purplesquares);
        game.physics.arcade.collide(s, purp);
        
        
        if (purp.body.touching.down || purp.body.touching.left || purp.body.touching.right || purp.body.touching.up){
            purp.kill()
        }
        
        purplesquares.forEach(function(psquare) {
            if (psquare.body.touching.down || psquare.body.touching.left || psquare.body.touching.right || psquare.body.touching.up){
                              psquare.touched = true;
            }
        });
        
        
        if (cursors.left.isDown){
            if (s.body.touching.down || s.body.touching.left || s.body.touching.right || s.body.touching.up){
            s.body.gravity.y = 0;
            s.body.gravity.x = -150;
            }
            
            purplesquares.forEach(function(psquare) {
                                  if (psquare.touched == true){
                                  psquare.kill();
                                  }
                                  });
            
        }
        if (cursors.right.isDown){
            if (s.body.touching.down || s.body.touching.left || s.body.touching.right || s.body.touching.up){
            s.body.gravity.y = 0;
            s.body.gravity.x = 150;
            }
            
            purplesquares.forEach(function(psquare) {
                                  if (psquare.touched == true){
                                  psquare.kill();
                                  }
                                  });
        }
        if (cursors.up.isDown){
            if (s.body.touching.down || s.body.touching.left || s.body.touching.right || s.body.touching.up){
            s.body.gravity.x = 0;
            s.body.gravity.y = -150;
            }
            purplesquares.forEach(function(psquare) {
                                  if (psquare.touched == true){
                                  psquare.kill();
                                  }
                                  });
            
        }
        if (cursors.down.isDown){
            if (s.body.touching.down || s.body.touching.left || s.body.touching.right || s.body.touching.up){
            s.body.gravity.x = 0;
            s.body.gravity.y = 150;
            }
            
            purplesquares.forEach(function(psquare) {
                                  if (psquare.touched == true){
                                  psquare.kill();
                                  }
                                  });
        }
    }

};
