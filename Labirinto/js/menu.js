var menuState = {
	create: function(){
		this.music = game.add.audio('CeladonSound');
		this.music.loop = true;
		this.music.volume = .5;
		this.music.play();

		var txtLabirinto = game.add.text(game.world.centerX,150,'LABIRINTO',{font:'40px emulogic',fill:'#fff'});
			txtLabirinto.anchor.set(.5);
			
		//var txtPressStart = game.add.text(game.world.centerX,550,'PRESS START',{font:'20px emulogic',fill:'#fff'});
		//	txtPressStart.anchor.set(.5);
			
		//game.add.tween(txtPressStart).to({y:250},1000).start();

		// Adiciona um botão ao jogo
		var button = game.add.sprite(game.world.centerX, game.world.centerY, 'Button');
			button.anchor.set(0.5);
			button.inputEnabled = true;
			button.events.onInputDown.add(this.startGame, this);

	},
	
	startGame: function(){
		this.music.stop();
		game.state.start('stage1');
	}
};
