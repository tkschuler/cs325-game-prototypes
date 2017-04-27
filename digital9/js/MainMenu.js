"use strict";

BasicGame.MainMenu = function (game) {
    
    this.background = null;
};

BasicGame.MainMenu.prototype = {
    
create: function () {
    
    this.background = this.game.add.sprite(0, 0, 'background2');
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add( function() { this.state.start('Game'); }, this );
    
    this.game.stage.backgroundColor = 0xD3D3D3;
},
    
    
update: function () {
    
    
    
},
    
quitGame: function (pointer) {
    
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
    
    //  Then let's go back to the main menu.
    this.state.start('Game');
    
}
    
};
