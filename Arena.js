var Arena = function (ctx) {
    this.ctx = ctx;
    this.Bots = [];
};

Arena.prototype = {
    addBot: function (bot) {
        this.Bots.push(bot);
    },

    renderBackground: function () {
        this.ctx.font = '38pt Arial';
        this.ctx.fillStyle = 'darkgray';
        this.ctx.strokeStyle = 'gray';
        this.ctx.fillText('BotJS', board.width / 2 - 50, board.height / 2 + 15);
        this.ctx.strokeText('BotJS', (board.width / 2) - 50, board.height / 2 + 15);
    },

    render: function () {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (var bot in this.Bots) {
            //console.log(this.Bots[bot].id + ", " + this.Bots[bot].rotate);
            this.Bots[bot].move(this.ctx);
        }
    }
};