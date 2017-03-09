BasicGame.Game = function (game) {
    
    this.bouncy = null;
    this.portal = null;
    this.squares = null;
    this.s = null;
    this.cursors = null;
    purplesquares = null;
    this.stateText = null;
    this.beep = null;
    this.won = null;
    this.lost = null;
    this.levelText = null;
};

BasicGame.Game.prototype = {
    
create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.beep = this.game.add.audio('beep');
    this.won = this.game.add.audio('win');
    this.lost = this.game.add.audio('lose');
    
    this.portal = this.game.add.sprite(720, 100, 'portal');
    this.portal.inputEnabled = false;
    this.portal.events.onInputDown.add( function() { this.state.start('Level2'); }, this );
    this.game.physics.enable(this.portal, Phaser.Physics.ARCADE);
    
    this.game.stage.backgroundColor = 0xD3D3D3;
    
    this.s = this.game.add.sprite(150, 50, 'yellowsquare');
    this.game.physics.enable(this.s, Phaser.Physics.ARCADE);
    this.s.body.bounce.y = 0;
    this.s.body.gravity.x = -100;
    
    this.squares = this.game.add.group();
    this.squares.enableBody = true;
    
    //Correct Path
    this.square = this.squares.create(50, 50, 'bluesquare');
    this.square.body.immovable = true;
    this.square = this.squares.create(75, 550, 'bluesquare');
    this.square.body.immovable = true;
    this.square = this.squares.create(350, 525, 'bluesquare');
    this.square.body.immovable = true;
    this.square = this.squares.create(325, 300, 'bluesquare');
    this.square.body.immovable = true;
    this.square = this.squares.create(200, 325, 'bluesquare');
    this.square.body.immovable = true;
    this.square = this.squares.create(225, 100, 'bluesquare');
    this.square.body.immovable = true;
    
    //Fake Paths
    
    this.square = this.squares.create(500, 50, 'bluesquare');
    this.square.body.immovable = true;
    this.square = this.squares.create(475, 325, 'bluesquare');
    this.square.body.immovable = true;
    this.square = this.squares.create(750, 500, 'bluesquare');
    this.square.body.immovable = true;
    this.square = this.squares.create(725, 150, 'bluesquare');
    this.square.body.immovable = true;
    this.square = this.squares.create(400, 175, 'bluesquare');
    this.square.body.immovable = true;
    
    purplesquares = this.game.add.group();
    purplesquares.enableBody = true;
    
    //CURSOR
    this.cursors = this.game.input.keyboard.createCursorKeys();
    
    //GameOver TEXT
    this.stateText = this.game.add.text(this.game.world.centerX,this.game.world.centerY,' ', {font: '40px Arial', fill: '#fff' });
    this.stateText.anchor.setTo(0.5, 0.5);
    this.stateText.visible = false;
    
    //Level Text
    this.levelText = this.game.add.text(20, 15,'Level 2', {font: '22px Impact', fill: '#0000ff' });
    this.levelText.anchor.setTo(0, 0);
    this.levelText.visible = true;
    this.levelText.alpha = .6;
    
},
    
    
win: function () {
    this.won.play();
    this.stateText.text = " You Win! Click Portal to move to Level 3";
    this.stateText.visible = true;
    this.s.kill();
    
    this.portal.events.onInputDown.add( function() { this.state.start('Level2'); }, this );
    this.portal.inputEnabled = true;
    
},
    
loss: function () {
    //this.won.play();
    this.stateText.text = " You Lose! Click Portal to restart";
    this.stateText.visible = true;
    if (this.s.exists){
        this.lost.play();
    }
    this.s.kill();
    
    this.portal.events.onInputDown.add( function() { this.state.start('BlueBlocks'); }, this );
    this.portal.inputEnabled = true;
    
},
    
update: function () {
    this.game.physics.arcade.collide(this.s, this.squares);
    this.game.physics.arcade.collide(this.s, this.purplesquares);
    this.hitSquare = this.game.physics.arcade.collide(this.s, this.squares);
    this.game.physics.arcade.overlap(this.s, this.portal, this.win, null, this);
    
    if (this.s.y > this.game.world.y + this.game.world.height || this.s.y < 0 || this.s.x > this.game.world.x + this.game.world.width || this.s.x < 0){
        this.loss();
    }
    
    if (this.cursors.left.isDown){
        if (this.s.body.touching.down || this.s.body.touching.left || this.s.body.touching.right || this.s.body.touching.up){
            this.s.body.gravity.y = 0;
            this.s.body.gravity.x = -400;
            this.beep.play();
        }
        
        purplesquares.forEach(function(psquare) {
                              if (psquare.touched == true){
                              psquare.kill();
                              }
                              }, this);
    }
    
    if (this.cursors.right.isDown){
        if (this.s.body.touching.down || this.s.body.touching.left || this.s.body.touching.right || this.s.body.touching.up){
            this.s.body.gravity.y = 0;
            this.s.body.gravity.x = 400;
            this.beep.play();
            
        }
        
        purplesquares.forEach(function(psquare) {
                              if (psquare.touched == true){
                              psquare.kill();
                              }
                              }, this);
    }
    
    if (this.cursors.up.isDown){
        if (this.s.body.touching.down || this.s.body.touching.left || this.s.body.touching.right || this.s.body.touching.up){
            this.s.body.gravity.x = 0;
            this.s.body.gravity.y = -400;
            this.beep.play();
        }
        
        purplesquares.forEach(function(psquare) {
                              if (psquare.touched == true){
                              psquare.kill();
                              }
                              }, this);
    }
    
    if (this.cursors.down.isDown){
        if (this.s.body.touching.down || this.s.body.touching.left || this.s.body.touching.right || this.s.body.touching.up){
            this.s.body.gravity.x = 0;
            this.s.body.gravity.y = 400;
            this.beep.play();
        }
        
        purplesquares.forEach(function(psquare) {
                              if (psquare.touched == true){
                              psquare.kill();
                              }
                              }, this);
    }
},
    
quitGame: function (pointer) {
    
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
    
    //  Then let's go back to the main menu.
    this.state.start('Level2');
    
}
    
};




/*
 
 //Correct Path
 this.square = this.squares.create(50, 50, 'bluesquare');
 this.square.body.immovable = true;
 this.square = this.squares.create(75, 550, 'bluesquare');
 this.square.body.immovable = true;
 this.square = this.squares.create(350, 525, 'bluesquare');
 this.square.body.immovable = true;
 this.square = this.squares.create(325, 300, 'bluesquare');
 this.square.body.immovable = true;
 this.square = this.squares.create(200, 325, 'bluesquare');
 this.square.body.immovable = true;
 this.square = this.squares.create(225, 100, 'bluesquare');
 this.square.body.immovable = true;
 
 //Fake Paths
 
 this.square = this.squares.create(500, 50, 'bluesquare');
 this.square.body.immovable = true;
 this.square = this.squares.create(475, 325, 'bluesquare');
 this.square.body.immovable = true;
 this.square = this.squares.create(750, 500, 'bluesquare');
 this.square.body.immovable = true;
 this.square = this.squares.create(725, 150, 'bluesquare');
 this.square.body.immovable = true;
 this.square = this.squares.create(400, 175, 'bluesquare');
 this.square.body.immovable = true;
 
 */
