var stage2State = {
    create: function(){
        this.onGame = true;
       
		this.music = game.add.audio('VioletCity');
		this.music.loop = true;
		this.music.volume = .5;
		this.music.play();


        this.raryCandySound = game.add.audio('getitem');
        this.raryCandySound.volume = .5;

        this.combatSound = game.add.audio('BattleOpen');
        this.combatSound.volume = .5;


        game.add.sprite(0,0,'grama');

        this.maze = this.createMaze();
        this.raryCandyPosition = [];
        this.blocks= game.add.group();
        this.blocks.enableBody = true;

        for(var row in this.maze){
            for(var col in this.maze[row]){
                var tile = this.maze[row][col];

                var x = col * 50;
                var y = row * 50;

                if(tile === 1){
                    var block = this.blocks.create(x, y, 'gramaAlta');
                    block.body.immovable = true;
                    
                }else if(tile === 2){
                    this.player = game.add.sprite(x + 25,y + 25,'Eevee');
					this.player.anchor.set(.5);
					game.physics.arcade.enable(this.player);
                    this.player.animations.add('goDown', [0,1,2,3], 12, true );
                    this.player.animations.add('goUp', [12,13,14,15], 12, true);
                    this.player.animations.add('goRight', [8,9,10,11], 12, true);
                    this.player.animations.add('goLeft', [4,5,6,7], 12, true);

                }else if(tile === 3){
                    var position={
                        x: x+25,
                        y: y+25
                    };
                    this.raryCandyPosition.push(position);

                }else if(tile === 4){
                        //criar Stone
                                        
                        this.stone = game.add.sprite(x, y, 'fireStone');
                        this.stone.anchor.set(.5);
                        game.physics.arcade.enable(this.stone);
                        this.stone.visible = false; // torna o sprite visível quando o nível for maior ou igual a 10
                    
                }
            }
        }

        //criar inimigo
        this.inimigo = game.add.sprite(75,75, 'Raticate');
        this.inimigo.anchor.set(.5);
        game.physics.arcade.enable(this.inimigo);
        this.inimigo.animations.add('goDown', [0,1,2,3], 12, true );
        this.inimigo.animations.add('goUp', [12,13,14,15], 12, true);
        this.inimigo.animations.add('goRight', [8,9,10,11], 12, true);
        this.inimigo.animations.add('goLeft', [4,5,6,7], 12, true);
        this.inimigo.direction = 'DOWN';

        //criarRaryCandy
        this.raryCandy = {};
        this.raryCandy.position = this.newPosition();
        this.raryCandy = game.add.sprite(this.raryCandy.position.x, this.raryCandy.position.y, 'candy');
        this.raryCandy.anchor.set(.5);
        game.physics.arcade.enable(this.raryCandy);

        //coletar candys
        this.niveis = 0;
        this.evolutions = 0;
        this.touchInimigo = 0;
        this.textRaryCandys = game.add.text(15,15,'Nivel: ' +this.getText(this.niveis), {font:'15px emulogic', fill:'#fff'});


        //controles
		this.controls = game.input.keyboard.createCursorKeys();

        //timer
        this.time = 0;
		this.txtTimer = game.add.text(game.world.width - 15,15,'TIME: ' + this.getText(this.time),{font:'15px emulogic',fill:'#fff'});
		this.txtTimer.anchor.set(1,0);
		this.timer = game.time.events.loop(1000,function(){
			this.time++;
			this.txtTimer.text = 'TIME: ' + this.getText(this.time);
		},this);

    },

    
    createMaze: function(){

        const num = Math.floor(Math.random() * 5) + 1;
        
        switch(num) {
            case 1:

              return  [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,3,0,0,0,3,0,0,0,0,0,3,1],
                [1,0,1,1,0,1,0,1,1,1,0,1,1,0,1],
                [1,0,1,1,0,1,1,0,0,1,0,1,1,0,1],
                [1,0,0,0,1,1,1,1,0,1,0,1,1,0,1],
                [1,3,0,0,0,1,0,2,0,3,0,0,3,0,1],
                [1,0,1,0,0,0,0,0,1,0,0,1,1,0,1],
                [1,0,1,1,1,1,0,1,1,0,1,1,1,0,1],
                [1,0,0,0,3,0,0,0,1,0,0,0,0,4,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ];
            
            case 2:
              return  [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,1,3,0,0,0,0,0,3,1],
                [1,0,1,3,1,0,1,1,0,1,1,1,1,4,1],
                [1,0,1,1,1,0,2,0,0,1,3,1,0,0,1],
                [1,0,0,0,0,0,1,1,3,1,0,0,0,1,1],
                [1,1,0,1,0,0,3,1,1,1,0,1,0,1,1],
                [1,0,0,1,0,0,0,0,0,0,0,1,3,0,1],
                [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
                [1,0,3,0,0,1,3,0,3,1,0,0,0,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ];
            
            case 3:
              return  [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,3,0,3,0,0,1,0,0,3,0,0,3,1],
                [1,1,1,0,1,0,0,1,1,1,1,0,0,0,1],
                [1,0,1,1,3,0,0,1,1,0,1,0,0,0,1],
                [1,0,0,0,0,0,0,0,1,0,0,3,0,0,1],
                [1,1,1,1,0,0,0,2,0,0,0,0,0,0,1],
                [1,0,3,1,1,1,0,0,1,1,1,1,0,0,1],
                [1,0,1,1,0,0,0,1,1,1,0,0,0,3,1],
                [1,4,0,0,3,3,0,0,0,0,0,0,3,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ];
            
            case 4:
              return [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,3,0,0,3,0,1,0,1,0,0,1],
                [1,0,3,0,1,0,0,0,0,1,0,0,0,0,1],
                [1,1,1,1,0,0,0,0,1,1,1,1,3,0,1],
                [1,3,0,0,0,1,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,1,0,2,4,0,0,3,1,0,1],
                [1,1,0,1,1,1,1,1,1,0,0,0,1,0,1],
                [1,3,0,1,0,0,3,0,0,0,1,1,1,1,1],
                [1,0,0,1,0,0,0,1,0,0,3,0,0,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ];
            
            case 5:
              return  [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,4,0,0,1,3,0,0,1,0,3,0,0,1],
                [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
                [1,3,1,0,0,1,1,1,0,1,1,1,1,0,1],
                [1,0,1,1,0,0,0,0,0,0,0,0,1,0,1],
                [1,0,1,0,0,3,0,2,0,3,0,0,1,0,1],
                [1,0,1,0,1,1,0,0,1,1,1,0,1,0,1],
                [1,0,0,0,0,1,0,0,1,0,1,0,1,0,1],
                [1,0,0,3,0,1,0,0,3,0,1,3,0,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ];
            
            default:
              return null;
          }
        },
       


    update: function(){
        if(this.onGame){
            game.physics.arcade.collide(this.player,this.blocks);
            game.physics.arcade.overlap(this.player, this.raryCandy, this.getRaryCandy, null, this);
            game.physics.arcade.overlap(this.player, this.stone, this.getStone, this.requerimentoNivel, this);
            game.physics.arcade.overlap(this.player, this.inimigo, this.encostouInimigo, null, this);


		    this.movePlayer();
            this.moveInimigo();

            if(this.touchInimigo > 0){
				this.gameOver();
			}
        }
		

	},

    encostouInimigo: function(){
        this.combatSound.play();
        this.touchInimigo++;

     },


    gameOver:function(){
        this.onGame = false;
        this.music.stop();

        game.time.events.remove(this.timer);

        this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		this.player.animations.stop();
		this.player.frame = 0;

        this.inimigo.animations.stop();
		this.inimigo.frame = 0;

 
		if(this.evolutions > 0){//Passou de fase
            this.inimigo.destroy();
            var txtLvlComplet = game.add.text(game.world.centerX,150,'VENCEU',{font:'20px emulogic',fill:'#fff'});
                txtLvlComplet.anchor.set(.5);
             
		} else { 
			var txtGameOver = game.add.text(game.world.centerX,150,'GAME OVER',{font:'20px emulogic',fill:'#fff'});
				txtGameOver.anchor.set(.5);
		}
		
		var txtBestScore = game.add.text(game.world.centerX,350,'Tempo de Jogo: ' + this.getText(this.time),{font:'20px emulogic',fill:'#fff'});
			txtBestScore.anchor.set(.5);
			
		game.time.events.add(3000,function(){
						
            if(this.evolutions > 0){
                game.state.start('stage3');
				
			} else {
				game.state.start('end');
			}
		},this);
    },
	

    getStone: function(){
        this.raryCandySound.play();
        this.evolutions++;

        this.player.loadTexture('Flarion');
        this.stone.visible = false;
        this.stone.destroy();
    },


    requerimentoNivel: function(){
        var nivelRequerido = false;

        if(this.niveis >= 7){
            nivelRequerido = true;
        }

        return nivelRequerido;
    },


    getRaryCandy: function(){

        this.raryCandySound.play();

        this.niveis++;
        this.textRaryCandys.text = 'Nivel: ' + this.getText(this.niveis);

        this.raryCandy.position = this.newPosition();
        if(this.niveis >= 7 && this.evolutions < 1){
            this.stone.visible = true;
        }
    },
	
	movePlayer: function(){
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
    
		if(this.controls.left.isDown && !this.controls.right.isDown){
			this.player.body.velocity.x = -100;
            this.player.direction = "Left";
		} else if(this.controls.right.isDown && !this.controls.left.isDown){
			this.player.body.velocity.x = 100;
            this.player.direction = "Right";

		}

		if(this.controls.up.isDown && !this.controls.down.isDown){
			this.player.body.velocity.y = -100;
            this.player.direction = "Up";

		} else if(this.controls.down.isDown && !this.controls.up.isDown){
			this.player.body.velocity.y = 100;
            this.player.direction = "Down";

		}

        switch(this.player.direction){
            case"Left":
                this.player.animations.play('goLeft');
                break;
            case"Right":
                this.player.animations.play('goRight');
            break;
            case"Up":
                this.player.animations.play('goUp');
            break;
            case"Down":
                this.player.animations.play('goDown');
            break;

    
        }

        if(this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0){
            this.player.animations.stop();
        }
	},

    moveInimigo: function(){
		if(Math.floor(this.inimigo.x -25)%50 === 0 && Math.floor(this.inimigo.y -25)%50 === 0){
			var inimigoCol = Math.floor(this.inimigo.x/50);
			var inimigoRow = Math.floor(this.inimigo.y/50);
			var validPath = [];
			
			if(this.maze[inimigoRow][inimigoCol-1] !== 1 && this.inimigo.direction !== 'RIGHT'){
				validPath.push('LEFT');
			}
			if(this.maze[inimigoRow][inimigoCol+1] !== 1 && this.inimigo.direction !== 'LEFT'){
				validPath.push('RIGHT');
			}
			if(this.maze[inimigoRow-1][inimigoCol] !== 1 && this.inimigo.direction !== 'DOWN'){
				validPath.push('UP');
			}
			if(this.maze[inimigoRow+1][inimigoCol] !== 1 && this.inimigo.direction !== 'UP'){
				validPath.push('DOWN');
			}
			
			this.inimigo.direction = validPath[Math.floor(Math.random()*validPath.length)];
		}
		
		switch(this.inimigo.direction){
			case 'LEFT':
				this.inimigo.x -= 1;
				this.inimigo.animations.play('goLeft');
				break;
			case 'RIGHT':
				this.inimigo.x += 1;
				this.inimigo.animations.play('goRight');
				break;
			case 'UP':
				this.inimigo.y -= 1;
				this.inimigo.animations.play('goUp');
				break;
			case 'DOWN':
				this.inimigo.y += 1;
				this.inimigo.animations.play('goDown');
				break;
			
		}
	},

    newPosition: function(){
        var pos = this.raryCandyPosition[Math.floor(Math.random()* this.raryCandyPosition.length)];
    
        while(this.raryCandy.position == pos){
            var pos = this.raryCandyPosition[Math.floor(Math.random()* this.raryCandyPosition.length)];

        }
        return pos;
    },

    	
	getText: function(value){
		if(value < 10){
			return '00' + value.toString();
		}
		if(value < 100){
			return '0' + value.toString();
		}
		return value.toString();
	}


};

