Game.Loader = Gust.Events.extend({

    path: "/assets/",

    images: [
      "images/bit.png",
      "images/hero.png",
      "images/items.png",
      "images/tiles.png"
    ],

    sounds: [

    ],

    init: function(assetManager){
        this.pxloader = new PxLoader();
        this.assetManager = assetManager;

        // add all assets
        for(var i in this.images){
            this.pxloader.addImage(this.path + this.images[i]);
        }

        // TOODO
        for(var s in this.sounds){

        }

        this.pxloader.addCompletionListener(this._onComplete.bind(this));
        this.pxloader.addProgressListener(this._onProgress.bind(this));
    },

    _onComplete: function(e){
        this.assetManager.add(e.resource.img);

        this.trigger("complete");
    },

    _onProgress: function(e){
        this.trigger("progress", e);
    },

    start: function(){
        this.pxloader.start();
    }

});