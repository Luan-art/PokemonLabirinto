var stage1State = {
    create: function(){
        game.add.sprite(0,0,'grama');

        this.maze = [
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
                                        
                        this.stone = game.add.sprite(x, y, 'waterStone');
                        this.stone.anchor.set(.5);
                        game.physics.arcade.enable(this.stone);
                        this.stone.visible = false; // torna o sprite visível quando o nível for maior ou igual a 10
                    
                }
            }
        }


  

        //criarRaryCandy
        this.raryCandy = {};
        this.raryCandy.position = this.newPosition();
        this.raryCandy = game.add.sprite(this.raryCandy.position.x, this.raryCandy.position.y, 'thunderStone');
        this.raryCandy.anchor.set(.5);
        game.physics.arcade.enable(this.raryCandy);

        //coletar candys
        this.niveis = 0;
        this.textRaryCandys = game.add.text(15,15,'Nivel: ' +this.niveis, {font:'15px emulogic', fill:'#fff'});


        //controles
		this.controls = game.input.keyboard.createCursorKeys();

    },

    update: function(){
		game.physics.arcade.collide(this.player,this.blocks);
        game.physics.arcade.overlap(this.player, this.raryCandy, this.getRaryCandy, null, this);
        game.physics.arcade.overlap(this.player, this.stone, this.getStone, this.requerimentoNivel, this);


		this.movePlayer();

	},

    getStone: function(){

        this.player.loadTexture('Vaporeon');
        this.stone.visible = false;

    },


    requerimentoNivel: function(){
        var nivelRequerido = false;

        if(this.niveis >= 5){
            nivelRequerido = true;
        }

        return nivelRequerido;
    },


    getRaryCandy: function(){

        this.niveis++;
        this.textRaryCandys.text = 'Nivel: ' + this.niveis;

        this.raryCandy.position = this.newPosition();
        if(this.niveis >= 5){
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

    newPosition: function(){
        var pos = this.raryCandyPosition[Math.floor(Math.random()* this.raryCandyPosition.length)];
    
        while(this.raryCandy.position == pos){
            var pos = this.raryCandyPosition[Math.floor(Math.random()* this.raryCandyPosition.length)];

        }
        return pos;
    }


};
