"use strict";

BasicGame.MainMenu = function (game) {

    var distance = 300;
    var speed = 6;
    var max = 400;
    this.star = null;
    this.texture = null;
    
    var xx = [];
    var yy = [];
    var zz = [];

};

BasicGame.MainMenu.prototype = {

	create: function () {
        
        this.star = this.game.make.sprite(0, 0, 'star');
        this.texture = this.game.add.renderTexture(800, 600, 'texture');
        
        this.game.add.sprite(0, 0, this.texture);
        
        for (var i = 0; i < this.max; i++)
        {
            this.xx[i] = Math.floor(Math.random() * 800) - 400;
            this.yy[i] = Math.floor(Math.random() * 600) - 300;
            this.zz[i] = Math.floor(Math.random() * 1700) - 100;
        }

	},

	update: function () {
        
        this.texture.clear();
        
        for (var i = 0; i < this.max; i++)
        {
            var perspective = this.distance / (this.distance - this.zz[i]);
            var x = this.game.world.centerX + this.xx[i] * this.perspective;
            var y = this.game.world.centerY + this.yy[i] * this.perspective;
            
            this.zz[i] += this.speed;
            
            if (this.zz[i] > 300)
            {
                this.zz[i] -= 600;
            }
            
            //  Swap this for a standard drawImage call
            this.texture.renderXY(star, x, y);
        }


	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
