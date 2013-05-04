Game.Tile = Gust.Events.extend({

    walkable: 1,

    init: function(spriteSheet, tileId, tileX, tileY) {
        this.tileView = new createjs.BitmapAnimation(spriteSheet);

        this.setTileId(tileId);

        this.tileX(tileX);
        this.tileY(tileY);
    },

    setTileId: function(tileId) {

        this.walkable = tileId == -1;
        this.tileView.gotoAndStop(tileId);

        // tile -1 is invisible
        this.tileView.visible = tileId != -1;
    },

    tileX: function(x) {
        if (x != null) {
            this._tileX = x;
            this.tileView.x = x * Game.tileSize;

            return this;
        }

        return this._tileX;
    },

    tileY: function(y) {
        if (y != null) {
            this._tileY = y;
            this.tileView.y = y * Game.tileSize;

            return this;
        }

        return this._tileY;
    }

});
