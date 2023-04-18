var endState = {
    create: function(){
        this.music = game.add.audio('CeladonSound');
		this.music.loop = true;
		this.music.volume = .5;
		this.music.play();
        
        var txtLabirinto = game.add.text(game.world.centerX,150,'Obrigado por Jogar',{font:'40px emulogic',fill:'#fff'});
			txtLabirinto.anchor.set(.5);

        var txtPressStart = game.add.text(game.world.centerX,250,'PRESS ENTER',{font:'20px emulogic',fill:'#fff'});
            txtPressStart.anchor.set(.5);
        
        game.time.events.add(1000,function(){
            game.add.tween(txtPressStart).to({y:250},1000).start();

        
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            enterKey.onDown.addOnce(this.backToMenu,this);
    },this);
},

backToMenu: function(){
    game.state.start('menu');
}
};