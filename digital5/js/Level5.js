BasicGame.Level5 = function (game) {
    
    this.bouncy = null;
    this.portal = null;
    this.squares = null;
    this.s = null;
    this.cursors = null;
    purplesquares = null;
    this.stateText = null;
    this.beep = null;
    this.levelText = null;
    this.won = null
    this.lost = null;
    
};

BasicGame.Level5.prototype = {
    
create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.beep = this.game.add.audio('beep');
    this.won = this.game.add.audio('win');
    this.lost = this.game.add.audio('lose');
    
    
    this.portal = this.game.add.sprite(350, 225, 'portal');
    this.portal.inputEnabled = false;
    this.game.physics.enable(this.portal, Phaser.Physics.ARCADE);
    
    this.game.stage.backgroundColor = 0xD3D3D3;
    
    this.s = this.game.add.sprite(375, 400, 'yellowsquare');
    this.game.physics.enable(this.s, Phaser.Physics.ARCADE);
    this.s.body.bounce.y = 0;
    this.s.body.gravity.y = -100;
    
    this.squares = this.game.add.group();
    this.squares.enableBody = true;
    
    this.square = this.squares.create(375, 300, 'bluesquare');
    this.square.body.immovable = true;
    
    purplesquares = this.game.add.group();
    purplesquares.enableBody = true;
    
    this.square = purplesquares.create(325, 325, 'purplesquare');
    this.square.body.immovable = true;
    this.square.touched = false;
    this.square.alpha = 0;
    this.game.add.tween(this.square).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
    
    this.square = purplesquares.create(425, 325, 'purplesquare');
    this.square.body.immovable = true;
    this.square.touched = false;
    this.square.alpha = 0;
    this.game.add.tween(this.square).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
    
    this.square = purplesquares.create(375, 450, 'purplesquare');
    this.square.body.immovable = true;
    this.square.touched = false;
    this.square.alpha = 0;
    this.game.add.tween(this.square).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
    
    
    
    //CURSOR
    this.cursors = this.game.input.keyboard.createCursorKeys();
    
    //LEVEL TEXT
    this.stateText = this.game.add.text(this.game.world.centerX,this.game.world.centerY,' ', {font: '40px Arial', fill: '#fff' });
    this.stateText.anchor.setTo(0.5, 0.5);
    this.stateText.visible = false;
    
    //Level Text
    this.levelText = this.game.add.text(20, 15,'Level 4 - Coming Soon', {font: '22px Impact', fill: '#0000ff' });
    this.levelText.anchor.setTo(0, 0);
    this.levelText.visible = true;
    this.levelText.alpha = .6;
},
    
    
win: function () {
    this.won.play();
    this.stateText.text = " You Win! Click Portal to move to Level 4";
    this.stateText.visible = true;
    this.s.kill();
    
    this.portal.events.onInputDown.add( function() { this.state.start('Level4'); }, this );
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
    this.game.physics.arcade.collide(this.s, purplesquares);
    this.hitSquare = this.game.physics.arcade.collide(this.s, this.squares);
    this.game.physics.arcade.overlap(this.s, this.portal, this.win, null, this);
    
    if (this.s.y > this.game.world.y + this.game.world.height || this.s.y < 0 || this.s.x > this.game.world.x + this.game.world.width || this.s.x < 0){
        this.loss();
    }
    
    purplesquares.forEach(function(psquare) {
                          if (psquare.body.touching.down || psquare.body.touching.left || psquare.body.touching.right || psquare.body.touching.up){
                          psquare.touched = true;
                          }
                          });
    
    
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
    
    this.state.start('Level3');
    
}
    
};
