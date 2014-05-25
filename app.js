requirejs.config({
	//By default load any module IDs from js/lib
	//baseUrl: 'js/lib',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		app: './'
	}
});

// Start the main app logic.
requirejs(['Engine', 'Bot'],
	function   (EngineModule, BotModule) {
		//jQuery, canvas and the app/sub module are all
		//loaded and can be used here now.

		var engine = new EngineModule.Engine({
			gameBoard: document.getElementById('board'),
			showFps: false
		});

		var count = 0;

		document.getElementById('addBot').addEventListener('click', function() {
			var bot = new BotModule.Bot({
				id: "bot: " + count++,
				x: Math.random() * 100,
				y: Math.random() * 100,
				//x: 0,
				//y: 0,
				angle: Math.random() * 0
			});

			document.body.insertBefore(bot.getCanvas(), document.getElementById('menu'));

			bot
				.move(300)
				.turn(45)
				.move(200)
				.turn(-45)
				.move(200)
				.turn(45)
				.move(200)
				.turn(45)
				.move(300)
				.turn(90)
				.move(500)

			engine.arena.addBot(bot);
		});

		document.getElementById('run').addEventListener('click', function(e) {
			if(e.target.value == 'Run')
			{
				e.target.value = "Pause";
				engine.run();
			}
			else
			{
				e.target.value = "Run";
				engine.pause();
			}
		});
	});