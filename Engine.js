define(['Arena'], function(ArenaModule) {
	var Engine = function (options) {

		this.ctx = options.gameBoard.getContext('2d');
		this.arena = new ArenaModule.Arena(this.ctx);

		this.paused = true;
		this.lastTime = 0;
		this.showFps = options.showFps || false;

		this.arena.renderBackground();
	};

	Engine.prototype = {

		lastFpsUpdateTime: 0,
		lastFpsUpdate: 0,

		calculateFps: function () {
			var now = (+new Date()),
				fps = 1000 / (now - this.lastTime);

			this.lastTime = now;

			return fps;
		},

		animate: function () {
			//if (time === undefined) {
			//    time = (+new Date());
			//}

			if (!this.paused) {
				this.arena.render();

				if (this.showFps) {
					var fps = this.calculateFps().toFixed();
					var now = Date.now();

					if (now - this.lastFpsUpdateTime > 1000) {
						this.lastFpsUpdateTime = now;
						this.lastFpsUpdate = fps;
					}

					this.ctx.fillStyle = 'blue';
					this.ctx.fillText(this.lastFpsUpdate + ' fps', 20, 50);
				}

				this.animationId = requestAnimationFrame(this.animate.bind(this));
				//console.log(this.calculateFps().toFixed() + ' fps');
			}
		},

		run: function () {
			this.paused = false;
			this.animationId = requestAnimationFrame(this.animate.bind(this));
		},

		pause: function () {
			this.paused = true;
		}
	};

	return {
		Engine: Engine
	}
});