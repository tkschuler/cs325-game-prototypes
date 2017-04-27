"use strict";

BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('titlePage', 'assets/title.jpg');
		this.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
		this.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);

        this.load.image( 'logo', 'assets/phaser.png' );
        
        this.load.image( 'blacksquare', 'assets/blacksquare.png' );
        this.load.image( 'redsquare', 'assets/redsquare.png' );
        this.load.image( 'greensquare', 'assets/greensquare.png' );
        this.load.image( 'solidblack', 'assets/solidblack.png' );
        
        this.load.audio('swoosh', ['assets/swoosh.mp3']);
        this.load.audio('win', ['assets/win.mp3']);
        
        this.load.image( 'background2', 'assets/background2.jpg' );
        this.load.image( 'greybg', 'assets/greybg.jpg' );
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
