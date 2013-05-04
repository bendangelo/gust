Game.World = Gust.World.extend({

    init: function(){
        Gust.World.prototype.init.call(this, document.getElementById("game-canvas"));

        this.sheetManager = new Game.SheetManager();
        this.soundManager = soundManager;

        this.soundManager.setup({
            url: "/assets/vendor/soundmanager2"
        });

        this.stage = new createjs.Stage(this.canvas);
        this.stage.autoClear = false;
    }

});