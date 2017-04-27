"use strict";

BasicGame.Game = function (game) {

    this.blacksquare = null;
    this.cursors = null;
    this.greensquares = null;
    
    this.levelText = null;
    this.stateText = null;
    
    this.greenCount = 0;
    this.redCount = 0;
    
    this.greybg = null;

};

BasicGame.Game.prototype = {

    create: function () {
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.greybg = this.game.add.tileSprite(0, 0, 800, 600, 'greybg');
        
        this.blacksquare = this.game.add.sprite(400, 450, 'blacksquare');
        this.game.physics.enable(this.blacksquare, Phaser.Physics.ARCADE);
        this.blacksquare.body.collideWorldBounds=true;
        
        this.greensquares = this.game.add.physicsGroup();
        this.redsquares = this.game.add.physicsGroup();
        this.blacksquares = this.game.add.physicsGroup();
        //this.greensquares.enableBody = true;
        
        this.swoosh = this.game.add.audio('swoosh');
        this.win = this.game.add.audio('win');
        
        /*
        this.greensquare = this.greensquares.create(400, 300, 'greensquare');
        this.greensquare.body.mass = -50;
        this.greensquare.overlap = false;
         */
        this.greensquare = this.greensquares.create(350, 300, 'greensquare');
        this.greensquare.body.mass = -50;
        this.greensquare.overlap = false;
        this.greensquare = this.greensquares.create(450, 300, 'greensquare');
        this.greensquare.body.mass = -50;
        this.greensquare.overlap = false;
        
        
        this.redsquare = this.redsquares.create(425, 300, 'redsquare');
        this.redsquare.body.mass = -50;
        this.redsquare.overlap = false;
        this.redsquare = this.redsquares.create(375, 300, 'redsquare');
        this.redsquare.body.mass = -50;
        this.redsquare.overlap = false;
        this.redsquare = this.redsquares.create(400, 275, 'redsquare');
        this.redsquare.body.mass = -50;
        this.redsquare.overlap = false;
        
        
        this.sq = this.blacksquares.create(400, 250, 'solidblack');
        this.sq.body.immovable = true;
        this.sq = this.blacksquares.create(365, 275, 'solidblack');
        this.sq.body.immovable = true;
        this.sq = this.blacksquares.create(435, 275, 'solidblack');
        this.sq.body.immovable = true;
        
        
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        //Level Text
        this.levelText = this.game.add.text(20, 15,'Count: ' + this.greenCount, {font: '22px Impact', fill: '#0000ff' });
        this.levelText.anchor.setTo(0, 0);
        this.levelText.visible = true;
        this.levelText.alpha = .6;
        
        //LEVEL TEXT
        this.stateText = this.game.add.text(this.game.world.centerX,this.game.world.centerY,' ', {font: '70px Arial', fill: '#0000ff' });
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;
    },
    

    update: function () {
        this.levelText.kill();
        this.levelText = this.game.add.text(20, 15,'Count: ' + this.redCount, {font: '22px Impact', fill: '#0000ff' });
        
        
        this.game.physics.arcade.overlap(this.greensquares, this.greensquares, this.greenCollisionHandler, null, this);
        this.game.physics.arcade.overlap(this.redsquares, this.redsquares, this.redCollisionHandler, null, this);
                                  
        
        this.game.physics.arcade.collide(this.blacksquare, this.greensquares);
        this.game.physics.arcade.collide(this.blacksquare, this.redsquares);
        this.game.physics.arcade.collide(this.redsquares, this.greensquares);
        this.game.physics.arcade.collide(this.greensquares, this.redsquares);
        
        this.game.physics.arcade.collide(this.greensquares, this.blacksquares);
        this.game.physics.arcade.collide(this.redsquares, this.blacksquares);
        this.game.physics.arcade.collide(this.blacksquare, this.blacksquares);
        
        
        this.blacksquare.body.velocity.x = 0;
        this.blacksquare.body.velocity.y = 0;
        
        //Cursor Controls
        if (this.cursors.left.isDown)
        {
            this.blacksquare.body.velocity.x = -200;
        }
        else if (this.cursors.right.isDown)
        {
            this.blacksquare.body.velocity.x = 200;
        }
        
        if (this.cursors.up.isDown)
        {
            this.blacksquare.body.velocity.y = -200;
        }
        else if (this.cursors.down.isDown)
        {
            this.blacksquare.body.velocity.y = 200;
        }
        
        if (this.greenCount == 2)
        { this.greensquares.forEach(function(greensquare) {
                                    greensquare.kill();
                                    }, this);
        }
        
        if (this.redCount == 3)
        { this.redsquares.forEach(function(redsquare) {
                                    redsquare.kill();
                                    }, this);
        }
        
        if (this.redCount == 3  && this.greenCount == 2){
            this.stateText.text = "You Win";
            this.win.play();
            this.stateText.visible = true;
            this.redCount++;
            this.greenCount++;
        }
    },
    
    //Green Square Collision Handler
    greenCollisionHandler: function (greensquare, greensquare2) {
        greensquare2.kill();
        this.swoosh.play();
        if (greensquare.overlap == false){
            greensquare.overlap=true;
            this.greenCount++;
        }
        
        if (greensquare2.overlap == false){
            greensquare2.overlap=true;
            this.greenCount++;
        }
    },
    
    redCollisionHandler: function (redsquare, redsquare2) {
        redsquare2.kill();
        this.swoosh.play();
        if (redsquare.overlap == false){
            redsquare.overlap=true;
            this.redCount++;
        }
    
        if (redsquare2.overlap == false){
            redsquare2.overlap=true;
            this.redCount++;
        }
    },

    quitGame: function () {
        this.state.start('MainMenu');

    }

};
