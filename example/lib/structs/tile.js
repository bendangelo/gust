Game.Tile = Gust.Events.extend({

    walkable: 1,

    init: function(spriteSheet, tileId, tileX, tileY) {
        this.sprite = new createjs.BitmapAnimation(spriteSheet);

        this.setTileId(tileId);

        this.tileX(tileX);
        this.tileY(tileY);
    },

    setTileId: function(tileId) {

        this.walkable = tileId == Game.Tile.BLANK;
        this.sprite.gotoAndStop(tileId);

        // tile -1 is invisible
        this.sprite.visible = tileId != Game.Tile.BLANK;
    },

    tileX: function(x) {
        if (x != null) {
            this._tileX = x;
            this.sprite.x = x * Game.tileSize;

            return this;
        }

        return this._tileX;
    },

    tileY: function(y) {
        if (y != null) {
            this._tileY = y;
            this.sprite.y = y * Game.tileSize;

            return this;
        }

        return this._tileY;
    },

    addToWorld: function(world){
        world.stage.addChild(this.sprite);
    }

});

Game.Tile.BLANK = -1;