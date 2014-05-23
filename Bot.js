var Bot = function (options) {
    this.id = options.name || "bot";
    this.angle = options.angle || 0;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.speed = 30;
    this.lastTime = Date.now();
};

Bot.prototype = {

    move: function (ctx) {
        this.updateTimeBased(ctx, Date.now());
        this.render(ctx);
    },

    turn: function (angle) {
        this.angle = angle;
    },

    updateTimeBased: function (ctx, time) {
        var elapsedTime = time - this.lastTime;
        this.x += this.speed * (elapsedTime / 1000);
        this.lastTime = time;
    },

    render: function (ctx) {
        ctx.save();
        //if (this.angle) {
        ctx.rotate((Math.PI / 180) * this.angle);
        //}
        ctx.fillStyle = 'green';

        this.updateTimeBased(ctx, Date.now());
        ctx.fillRect(this.x, this.y, 50, 50);
        ctx.restore();
    }
};