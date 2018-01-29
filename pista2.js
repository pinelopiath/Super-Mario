var pista2 = {

		preload: function() {


			this.load.spritesheet('tiles', 'assets/super_.png', 16,16);
			this.load.spritesheet('goomba', 'assets/goomba-3.png', 16, 16);
			this.load.spritesheet('mario', 'assets/mario-3.png', 16, 16);
			this.load.spritesheet('coin', 'assets/coin-3.png', 16, 16);
			this.load.spritesheet('glass', 'assets/glasses.png', 16, 16);
			

			game.load.tilemap('level', 'assets/super_mario_map2.json', null, Phaser.Tilemap.TILED_JSON);


			this.load.image('diamond', 'assets/diamond.png', 16,16);
			this.load.image('sword', 'assets/sword.png',16,16);
			this.load.image('swords', 'assets/sword2.png',16,16);


			this.load.audio('theme','audio/star.mp3');
			this.load.audio('koins','audio/coin.wav');
			this.load.audio('stomp','audio/stomp.wav');
			this.load.audio('diam', 'audio/diam.wav');


		},


		create: function() {

			var stomp;
			theme = game.add.audio('theme');
			theme.play('',0,1,true);

			Phaser.Canvas.setImageRenderingCrisp(game.canvas)
			var style = { font: "bold 14px Arial", fill: "#C5E72B", boundsAlignH: "center", boundsAlignV: "middle" };
			text = game.add.text(10, 5, "SCORE:  "+score, style);
			var style2 = { font: "bold 14px Arial", fill: "#340026", boundsAlignH: "center", boundsAlignV: "middle" };
			livestext = game.add.text(10, 30, "LIVES: "+lives, style2);

			
			

			game.stage.backgroundColor = '#FCE7CC';


			map = game.add.tilemap('level');
			map.addTilesetImage('tiles', 'tiles');
			map.setCollisionBetween(3, 12, true, 'solid');
			map.createLayer('background');


			layer = map.createLayer('solid');
			layer.resizeWorld();


			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 1, 2 ], 3, true);
			coins.callAll('animations.play', 'animations', 'spin');

			diamond = game.add.sprite(1664, game.world.height - 300,'diamond');
			diamonds = game.add.group();
			diamond.enableBody = true;
			game.physics.arcade.enable(diamond);

			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);

			sword = game.add.sprite(1504, game.world.height - 80,'sword');
			swords = game.add.group(); 
			sword.enableBody = true;
			game.physics.arcade.enable(sword);

			swords = game.add.sprite(2832, game.world.height - 80,'swords');
			swordss = game.add.group(); 
			swords.enableBody = true;
			game.physics.arcade.enable(swords);

			glass = game.add.group();
			glass.enableBody = true;
			map.createFromTiles(3, null, 'glass', 'stuff', glass);
			glass.callAll('animations.add', 'animations', 'walk', [0, 1], 2, true);
			glass.callAll('animations.play', 'animations', 'walk');
			glass.setAll('body.bounce.x', 1);
			glass.setAll('body.velocity.x', -20);
			glass.setAll('body.gravity.y', 500);

			player = game.add.sprite(16, game.world.height - 150, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
			player.goesRight = true;

			game.camera.follow(player);

			text.fixedToCamera=true;
			livestext.fixedToCamera=true;
			cursors = game.input.keyboard.createCursorKeys();
		},

		update: function() {
			game.physics.arcade.collide(player, diamond, diamondCollide);
			game.physics.arcade.collide(player, swords, swordscollide);
			game.physics.arcade.collide(player, sword, swordCollide);
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.collide(glass, layer);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, glass, glasseOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);

			if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -90;
					player.animations.play('walkLeft');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 7;
				}

				if (cursors.up.isDown && player.body.onFloor()) {
					player.body.velocity.y = -190;
					player.animations.stop();
				}

				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 5;
					else
						player.frame = 12;
				}
			}
		}
	}