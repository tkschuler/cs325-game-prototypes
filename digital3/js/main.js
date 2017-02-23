window.onload = function() {
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'player', 'assets/player.png' );
        game.load.image( 'monster', 'assets/monster.png' );
        game.load.image( 'bg', 'assets/background.jpg' );
        
        game.load.image( 'ice', 'assets/ice.png' );
        game.load.audio('music', 'assets/GameMusic.mp3');
        game.load.audio('beep', 'assets/beep.wav');
        game.load.audio('over', 'assets/over.wav');
        
    }
    
    var player;
    var monster;
    var cursors;
    var stateText;
    var icepatches;
    var bg;
    
    var music;
    var beep;
    var over;
    
    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        music = game.add.audio('music');
        beep = game.add.audio('beep');
        over = game.add.audio('over');
        
        music.play();
        
        bg = game.add.tileSprite(0, 0, 800, 600, 'bg');
        
        icepatches = game.add.group();
        icepatches.enableBody = true;
        
        for (var i = 0; i < 7; i++)
        {
            var p = icepatches.create(game.rnd.integerInRange(50, 750), game.rnd.integerInRange(50, 550), 'ice');
            game.physics.enable(p, Phaser.Physics.ARCADE);
        }
        
        monster = game.add.sprite(500, 500, 'monster');
        game.physics.arcade.enable(monster, Phaser.Physics.ARCADE);
        monster.body.collideWorldBounds = true;
        monster.body.bounce.y = 1;
        monster.body.bounce.x = 1;
        
        monster.body.velocity.x = 200;
        monster.body.velocity.y = -100;
        
        player = game.add.sprite(game.rnd.integerInRange(50, 750), game.rnd.integerInRange(50, 550), 'player');
        game.physics.arcade.enable(player, Phaser.Physics.ARCADE);;
        player.body.collideWorldBounds = true;
        
        cursors = game.input.keyboard.createCursorKeys();
        
        //Gamestates Text
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', {font: '70px Arial', fill: '0x00008B' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
    }
    
    function kill (player, monster) {
        game.time.events.stop();
        game.debug.text('');
        monster.kill();
        stateText.text = "It took you " + game.time.totalElapsedSeconds() + " sec";
        stateText.visible = true;
        player.alpha = 1;
        over.play();
    }
    
    function onIce (player, icepatches) {
        player.alpha = .5;
        beep.play();
    }
    
    function update() {
        
        game.physics.arcade.overlap(player, monster, kill, null, this);
        
        player.body.velocity.setTo(0, 0);
        
        if (cursors.left.isDown){
            player.body.velocity.x = -150;
        }
        if (cursors.right.isDown){
            player.body.velocity.x = 150;
        }
        if (cursors.up.isDown)
        {
            player.body.velocity.y = -150;
        }
        if (cursors.down.isDown)
        {
            player.body.velocity.y = 150;
        }
        
        //monster simple AI ----------------------------------------------------------
        
        if (game.physics.arcade.distanceBetween(player, monster) < 150 && player.body.velocity.x > 0){
            monster.body.velocity.x = 250;
        }
        
        else if (game.physics.arcade.distanceBetween(player, monster) < 150 && player.body.velocity.x < 0){
            monster.body.velocity.x = -250;
        }
        
        else if (game.physics.arcade.distanceBetween(player, monster) < 150 && player.body.velocity.y > 0){
            monster.body.velocity.y = 250;
        }
        
        else if (game.physics.arcade.distanceBetween(player, monster) < 250 && player.body.velocity.y < 0){
            monster.body.velocity.y = -250;
        }
        
        
        if (game.physics.arcade.distanceBetween(player, monster) < 100){
            monster.body.velocity.x = 250;
        }
        
        if (game.physics.arcade.distanceBetween(player, monster) < 100){
            monster.body.velocity.y = 250;
        }
        
        //----------------------------------------------------------------------------
        
        player.alpha = 0;
        game.physics.arcade.overlap(player, icepatches, onIce, null, this);
        
        game.debug.text('Elapsed seconds: ' + game.time.totalElapsedSeconds(), 32, 32, 'rgba(255,0,0,1)');
        
    }
};
