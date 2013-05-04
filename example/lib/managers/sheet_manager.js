Game.SheetManager = Gust.Manager.extend({

    add: function(name, data) {
        this.items[name] = new createjs.SpriteSheet(data);
    }

});