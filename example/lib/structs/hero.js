Game.Hero = Gust.Events.extend({

    init: function(spriteSheet, x, y) {
        this.sprite = new createjs.BitmapAnimation(spriteSheet);

        this.body = new Game.Nodes.Body();

        this.posX(x);
        this.posY(y);
    },

    posX: function(x) {
        if (x != null) {
            this.sprite.x = x;
        }
        return this.sprite.x;
    },

    posY: function(y) {
        if (y != null) {
            this.sprite.y = y;
        }
        return this.sprite.y;
    },

    addToWorld: function(world) {
        world.stage.addChild(this.sprite);
        world.addNode(this.collision);
    }

});