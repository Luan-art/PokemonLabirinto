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
		game.load.image('candy', 'img/candy.png');
		game.load.image('Button', 'img/Button.png');

		game.load.spritesheet('Eevee','  img/Eevee.png',64,64);
		game.load.spritesheet('rattata','  img/rattata.png',64,64);
		game.load.spritesheet('Raticate','  img/Raticate.png',64,64);
		game.load.spritesheet('Persian','  img/Persian.png',64,64);
        game.load.spritesheet('Jolteon','img/Jolteon.png',64,64);
        game.load.spritesheet('Flarion','img/Flarion.png',64,64);
		game.load.spritesheet('Vaporeon','img/Vaporeon.png',64,64);
        game.load.spritesheet('Light grass','img/Light grass.png',32,32);
		game.load.spritesheet('gramaAlta','img/gramaAlta.png',32,32);

		
		game.load.audio('CeladonSound','sfx/CeladonSound.ogg');
		game.load.audio('EvolutionSuccess','sfx/EvolutionSuccess.ogg');
		game.load.audio('VioletCity','sfx/VioletCity.ogg');
		game.load.audio('getitem','sfx/getitem.ogg');
		game.load.audio('BattleOpen','sfx/BattleOpen.WAV');

	},

	create: function(){
		game.state.start('menu');
	}
};
