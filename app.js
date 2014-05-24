var Arena = function(ctx) {
    this.ctx = ctx;
    this.Bots = [];
};

Arena.prototype = {
    addBot: function(bot) {
        this.Bots.push(bot);
        return bot;
    },
    renderBackground: function() {
        this.ctx.font = "38pt Arial";
        this.ctx.fillStyle = "darkgray";
        this.ctx.strokeStyle = "gray";
        this.ctx.fillText("BotJS", board.width / 2 - 50, board.height / 2 + 15);
        this.ctx.strokeText("BotJS", board.width / 2 - 50, board.height / 2 + 15);
    },
    render: function() {
        this.renderBackground();
        for (var bot in this.Bots) {
            this.ctx.save();
            this.Bots[bot].render(this.ctx);
            this.ctx.restore();
        }
    }
};

var Bot = function(options) {
    this.id = options.id || "bot";
    this.angle = options.angle || 0;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.speed = 300;
    this.lastTime = Date.now();
    this.instructions = [];
    this.width = 50;
    this.height = 50;
    this.translateX = 0;
    this.translateY = 0;
};

Bot.prototype = {
    move: function(distance) {
        this.instructions.push({
            move: distance
        });
        return this;
    },
    turn: function(angle) {
        this.instructions.push({
            turn: angle
        });
        return this;
    },
    updateTimeBased: function(ctx, time) {
        if (this.instructions.length > 0) {
            var elapsedTime = time - this.lastTime;
            var command = this.instructions[0];
            if (command.move) {
                var distance = this.speed * (elapsedTime / 1e3);
                command.move -= distance;
                this.x += distance;
                if (command.move <= 0) {
                    this.instructions.shift();
                }
                ctx.translate(this.translateX, this.translateY);
                ctx.rotate(Math.PI / 180 * this.angle);
                ctx.fillStyle = "green";
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = "yellow";
                ctx.font = "12pt Arial";
                ctx.strokeStyle = "red";
                ctx.fillText(this.id, this.x, this.y + 20);
            } else if (command.turn) {
                this.angle += command.turn;
                this.translateX = this.x;
                if (command.turn < 90) {
                    this.translateX += this.width;
                }
                this.translateY += this.y;
                if (command.turn >= 90) {
                    this.translateY += this.height;
                }
                this.x = this.y = 0;
                this.instructions.shift();
            }
            this.lastTime = time;
        }
    },
    render: function(ctx) {
        this.updateTimeBased(ctx, Date.now());
    }
};

var Engine = function(options) {
    this.ctx = options.gameBoard.getContext("2d");
    this.arena = new Arena(this.ctx);
    this.paused = true;
    this.lastTime = 0;
    this.showFps = options.showFps || false;
    this.arena.renderBackground();
};

Engine.prototype = {
    lastFpsUpdateTime: 0,
    lastFpsUpdate: 0,
    calculateFps: function() {
        var now = +new Date(), fps = 1e3 / (now - this.lastTime);
        this.lastTime = now;
        return fps;
    },
    animate: function() {
        if (!this.paused) {
            this.arena.render();
            if (this.showFps) {
                var fps = this.calculateFps().toFixed();
                var now = Date.now();
                if (now - this.lastFpsUpdateTime > 1e3) {
                    this.lastFpsUpdateTime = now;
                    this.lastFpsUpdate = fps;
                }
                this.ctx.fillStyle = "blue";
                this.ctx.fillText(this.lastFpsUpdate + " fps", 20, 50);
            }
            this.animationId = requestAnimationFrame(this.animate.bind(this));
        }
    },
    run: function() {
        this.paused = false;
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    },
    pause: function() {
        this.paused = true;
    }
};