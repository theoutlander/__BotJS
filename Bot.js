var Bot = function (options) {
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

    move: function (distance) {
        this.instructions.push({move: distance});
	    return this;
    },

    turn: function (angle) {
	    this.instructions.push({turn: angle});
	    return this;
    },

    updateTimeBased: function (ctx, time) {
	    if(this.instructions.length > 0) {
		    var elapsedTime = time - this.lastTime;

		    var command = this.instructions[0];

		    if(command.move) {
			    var distance = this.speed * (elapsedTime / 1000);

			    command.move -= distance;
			    this.x += distance;

			    if (command.move <= 0) {
				    this.instructions.shift();
			    }

			    ctx.translate(this.translateX, this.translateY);
			    ctx.rotate((Math.PI / 180) * this.angle);

			    ctx.fillStyle = 'green';
			    ctx.fillRect(this.x, this.y, this.width, this.height);

			    ctx.fillStyle = 'yellow';
			    ctx.font = '12pt Arial';
			    ctx.strokeStyle = 'red';

			    ctx.fillText(this.id, this.x, this.y + 20);

			    //this.ctx.strokeText('BotJS', (board.width / 2) - 50, board.height / 2 + 15);
		    }
		    else if(command.turn)
		    {
			    this.angle += command.turn;

			    this.translateX = this.x;

			    if(command.turn < 90)
			    {
				    this.translateX += this.width;
			    }

			    this.translateY += this.y;

			    if(command.turn >= 90)
			    {
				    this.translateY += this.height;
			    }

			    this.x = this.y = 0; // reset both axis to the upper left of the translated canvas

			    //ctx.translate(this.translateX, this.translateY);
			    //console.log("translateX: " + this.translateX + " translateY: " + this.translateY);

			    //ctx.rotate((Math.PI / 180) * command.turn);
			    //console.log("rotating to: " + command.turn);

			    this.instructions.shift();
		    }

		    this.lastTime = time;
	    }
    },

    render: function (ctx) {
        this.updateTimeBased(ctx, Date.now());
/*
	    ctx.fillStyle = 'green';
	    ctx.fillRect(this.x, this.y, this.width, this.height);

	    ctx.fillStyle = 'yellow';
	    ctx.font = '12pt Arial';
	    ctx.strokeStyle = 'red';

	    ctx.fillText(this.id, this.x, this.y + 20);

	    //this.ctx.strokeText('BotJS', (board.width / 2) - 50, board.height / 2 + 15);
	    */
    }
};