Game.Hero = Gust.Events.extend({

    init: function(spriteSheet, x, y){
        this.heroView = new createjs.BitmapAnimation(spriteSheet);
        this.body = new Game.Nodes.Body();

        this.posX(x);
        this.posY(y);
    },

    posX: function(){

    },

    posY: function(){

    },

    addToWorld: function(world){
        world.stage.addChild(this.heroView);
        world.addNode(this.collision);
    }

});