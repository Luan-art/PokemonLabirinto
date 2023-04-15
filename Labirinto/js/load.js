var loadState = {
	preload: function(){
		var txtLoading = game.add.text(game.world.centerX,150,'LOADING...',{font:'15px emulogic',fill:'#fff'});
			txtLoading.anchor.set(.5);
	
		var progressBar = game.add.sprite(game.world.centerX,250,'progressBar');
			progressBar.anchor.set(.5);
			
		game.load.setPreloadSprite(progressBar);
		
        game.load.image('fireStone', 'img/fireStone.png');
        game.load.image('waterStone', 'img/waterStone.png');
        game.load.image('thunderStone', 'img/thunderStone.png');
        game.load.image('gameOver', 'img/gameOver.png');
		game.load.image('grama', 'img/grama.png');



		game.load.spritesheet('Eevee','  img/Eevee.png',64,64);
        game.load.spritesheet('Jolteon','img/Jolteon.png',64,64);
        game.load.spritesheet('Flarion','img/Flarion.png',64,64);
		game.load.spritesheet('Vaporeon','img/Vaporeon.png',64,64);
        game.load.spritesheet('Light grass','img/Light grass.png',32,32);
		game.load.spritesheet('gramaAlta','img/gramaAlta.png',32,32);

		
		game.load.audio('CeladonSound','sfx/CeladonSound.ogg');
		game.load.audio('Evolution','sfx/Evolution.ogg');
		game.load.audio('Violet City','sfx/Violet City.ogg');
	},

	create: function(){
		game.state.start('menu');
	}
};
