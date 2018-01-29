var menu = {

	preload: function() {

		game.load.image('lvl', 'assets/lvl.png');
		game.load.image('Level1', 'assets/Level1.png');
		game.load.image('Level2', 'assets/Level2.png');

	},
	
	create: function() {

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		var s = game.add.sprite(350, 80, 'lvl');
		

		var btn1 = game.add.button(490 , 320, "Level1", function(){
			game.state.start('pista1');
		});
		btn1.anchor.set(0.5, 0.5);


		var btn2 = game.add.button(490 , 400, "Level2", function(){
			game.state.start('pista2');
		});
		btn2.anchor.set(0.5, 0.5);

	}
}