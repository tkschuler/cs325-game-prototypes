"use strict";

BasicGame.Game = function (game) {
    
    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
    this.spaceship1 = null;
    this.spaceship2 = null;
    this.weapon1 = null;
    this.weapon2 = null;
    
    
    this.cursors1 = null;
    this.fireButton1;
    
    this.p1Text = null;
    this.p2Text = null;
    
    this.levelText = null;
    this.stateText = null;
    
    this.P1Health = 50;
    this.P2Health = 50;
    
    this.timer = null;
    this.total = 3;
};

BasicGame.Game.prototype = {

    create: function () {

        this.timer = this.game.time.create(false);
        this.timer.loop(1000, this.updateCounter, this);
        this.timer.start();
        
        this.spaceship1 = this.game.add.sprite( 750, 520, 'spaceship1' );
        this.spaceship2 = this.game.add.sprite( 50, 75, 'spaceship2' );
        this.spaceship1.anchor.setTo(0.5,0.5);
        this.spaceship2.anchor.setTo(0.5,0.5);
        
        this.game.physics.arcade.enable(this.spaceship1);
        this.game.physics.arcade.enable(this.spaceship2);
        
        
        this.weapon1 = this.game.add.weapon( 100, 'bullet1' );
        this.weapon2 = this.game.add.weapon( 100, 'bullet2' );
        
        this.game.physics.arcade.enable(this.weapon1);
        this.game.physics.arcade.enable(this.weapon2);
        
        this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon1.bulletSpeed = 600;
        this.weapon1.fireRate = 300;
        
        
        this.weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon2.bulletSpeed = 600;
        this.weapon2.fireRate = 300;
        
        this.spaceship1.body.drag.set(70);
        this.spaceship2.body.drag.set(70);
        
        this.spaceship1.body.maxVelocity.set(200);
        this.spaceship2.body.maxVelocity.set(200);
        
        this.weapon1.trackSprite(this.spaceship1, 10, 0, true);
        this.weapon2.trackSprite(this.spaceship2, 10, 0, true);
        
        this.cursors1 = this.game.input.keyboard.createCursorKeys();
        this.fireButton1 = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        
        this.cursors2 = this.game.input.keyboard.createCursorKeys();
        this.fireButton2 = this.game.input.keyboard.addKey(Phaser.KeyCode.Z);
        
        
        this.upButton = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.downButton = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.leftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        
        //Health Text
        this.p1Text = this.game.add.text(32, 15,'Player1 Health:' + this.P1Health, {font: '18px Arial', fill: '#0000ff' });
        this.p1Text.anchor.setTo(0, 0);
        this.p1Text.visible = true;
        
        this.p2Text = this.game.add.text(650, 15,'Player2 Health:' + this.P2Health, {font: '18px Arial', fill: '#ff0000' });
        this.p1Text.anchor.setTo(0, 0);
        this.p1Text.visible = true;
        
        this.levelText = this.game.add.text(720, 560,'Level 1', {font: '22px Impact', fill: '#ffffff' });
        this.levelText.anchor.setTo(0, 0);
        this.levelText.visible = true;
        this.levelText.alpha = .7;
        
        //GameOver TEXT
        this.stateText = this.game.add.text(this.game.world.centerX,this.game.world.centerY,' ', {font: '40px Arial', fill: '#fff' });
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;
    },
    
    hitP2: function () {
        this.P1Health -= 1;
        this.p1Text.text = "Player1 Health:" + this.P1Health;
        if (this.P1Health <= 0)
        {
            this.spaceship2.kill();
            this.stateText.text = "Player2 Wins!";
            this.stateText.visible = true;
        }
    },
    
    hitP1: function () {
        this.P2Health -= 1;
        this.p2Text.text = "Player2 Health:" + this.P2Health;
        if (this.P2Health <= 0)
        {
            this.spaceship1.kill();
            this.stateText.text = "Player1 Wins!";
            this.stateText.visible = true;
        }
    },
    
    updateCounter: function () {
        
        this.total--;
        
    },
    
    update: function () {
        this.game.physics.arcade.collide(this.weapon1, this.spaceship2);
        this.game.physics.arcade.overlap(this.weapon1.bullets, this.spaceship2, this.hitP2, null, this);
        
        this.game.physics.arcade.collide(this.weapon2, this.spaceship1);
        this.game.physics.arcade.overlap(this.weapon2.bullets, this.spaceship1, this.hitP1, null, this);
        
        if (this.total == 0)
        {
        
        //Player 1 Controls
        if (this.cursors1.up.isDown)
        {
            this.game.physics.arcade.accelerationFromRotation(this.spaceship1.rotation, 300, this.spaceship1.body.acceleration);
        }
        else
        {
            this.spaceship1.body.acceleration.set(0);
        }
        
        if (this.cursors1.left.isDown)
        {
            this.spaceship1.body.angularVelocity = -300;
        }
        else if (this.cursors1.right.isDown)
        {
            this.spaceship1.body.angularVelocity = 300;
        }
        else
        {
            this.spaceship1.body.angularVelocity = 0;
        }
        
        if (this.fireButton1.isDown)
        {
            this.weapon1.fire();
        }
        //-------------------------------------------------------------
        
        //Player 2 Controls
        
        if (this.upButton.isDown)
        {
            this.game.physics.arcade.accelerationFromRotation(this.spaceship2.rotation, 300, this.spaceship2.body.acceleration);
        }
        else
        {
            this.spaceship2.body.acceleration.set(0);
        }
        
        
        if (this.leftButton.isDown)
        {
            this.spaceship2.body.angularVelocity = -300;
        }
        else if (this.rightButton.isDown)
        {
            this.spaceship2.body.angularVelocity = 300;
        }
        else
        {
            this.spaceship2.body.angularVelocity = 0;
        }
        
        if (this.fireButton2.isDown)
        {
            this.weapon2.fire();
        }
        }
        
        
        this.game.world.wrap(this.spaceship1, 16);
        this.game.world.wrap(this.spaceship2, 16);
        
        if (this.total == 0)
        {
            this.timer.destroy();
        }
      
    },
    
    render: function () {
        //this.game.debug.text('Time until event: ' + this.timer.duration.toFixed(0), 32, 32);
        if (this.total>0)
        {
        this.game.debug.text('' + this.total, 400, 300);
        }
        if (this.total == 0)
        {
         this.game.debug.text('', 400, 300);
        }
    },


    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
