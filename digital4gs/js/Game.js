
BasicGame.Game = function (game) {

    this.bouncy = null;
    this.portal = null;
    this.squares = null;
    this.s = null;
    this.cursors = null;
    purplesquares = null;
    this.stateText = null;
};

BasicGame.Game.prototype = {

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.portal = this.game.add.sprite(720, 100, 'portal');
        this.portal.inputEnabled = false;
        this.portal.events.onInputDown.add( function() { this.state.start('MainMenu'); }, this );
        this.game.physics.enable(this.portal, Phaser.Physics.ARCADE);
        
        this.game.stage.backgroundColor = 0xD3D3D3;
        
        this.s = this.game.add.sprite(600, 500, 'yellowsquare');
        this.game.physics.enable(this.s, Phaser.Physics.ARCADE);
        this.s.body.bounce.y = 0;
        this.s.body.gravity.y = 100;
        
        this.squares = this.game.add.group();
        this.squares.enableBody = true;
        
        this.square = this.squares.create(325, 450, 'bluesquare');
        this.square.body.immovable = true;
        this.square = this.squares.create(300, 325, 'bluesquare');
        this.square.body.immovable = true;
        this.square = this.squares.create(600, 575, 'bluesquare');
        this.square.body.immovable = true;
        this.square = this.squares.create(600, 300, 'bluesquare');
        this.square.body.immovable = true;
        this.square = this.squares.create(775, 425, 'bluesquare');
        this.square.body.immovable = true;
        
        //CURSOR
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        //LEVEL TEXT
        this.stateText = this.game.add.text(this.game.world.centerX,this.game.world.centerY,' ', {font: '40px Arial', fill: '#fff' });
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;
    
    },
    
    
    win: function () {
        this.stateText.text = " You Win! Click Portal to move to Level 2";
        this.stateText.visible = true;
        this.s.kill();
        
        this.portal.inputEnabled = true;
    
    },
    

    update: function () {
        this.game.physics.arcade.collide(this.s, this.squares);
        this.game.physics.arcade.collide(this.s, this.purplesquares);
        this.hitSquare = this.game.physics.arcade.collide(this.s, this.squares);
        this.game.physics.arcade.overlap(this.s, this.portal, this.win, null, this);
        
        if (this.cursors.left.isDown){
            if (this.s.body.touching.down || this.s.body.touching.left || this.s.body.touching.right || this.s.body.touching.up){
                this.s.body.gravity.y = 0;
                this.s.body.gravity.x = -150;
            }
        }
        
        if (this.cursors.right.isDown){
            if (this.s.body.touching.down || this.s.body.touching.left || this.s.body.touching.right || this.s.body.touching.up){
                this.s.body.gravity.y = 0;
                this.s.body.gravity.x = 150;
                
            }
        }
        
        if (this.cursors.up.isDown){
            if (this.s.body.touching.down || this.s.body.touching.left || this.s.body.touching.right || this.s.body.touching.up){
                this.s.body.gravity.x = 0;
                this.s.body.gravity.y = -150;
            }
        }
        
        if (this.cursors.down.isDown){
            if (this.s.body.touching.down || this.s.body.touching.left || this.s.body.touching.right || this.s.body.touching.up){
                this.s.body.gravity.x = 0;
                this.s.body.gravity.y = 150;
            }
        }
        
        
        
        
        
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
