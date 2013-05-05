Game.Loader = Gust.Events.extend({

    imagePath: "/assets/images/",

    images: {
      // "images/bit.png",
      "hero.png": {
        animations: {
            idle: [0, 1],
            run: [2, 3],
            jump: [4, 5],
            climb: [6, 7]
        }
      },
      "items.png": {
      },
      "tiles.png": {
      }
    },

    sounds: [

    ],

    init: function(assetManager, sheetManager){
        this.pxloader = new PxLoader();
        this.assetManager = assetManager;
        this.sheetManager = sheetManager;

        // add all assets
        for(var i in this.images){
            this.pxloader.addImage(this.imagePath + i);
        }

        // TODO
        for(var s in this.sounds){

        }

        this.pxloader.addCompletionListener(this._onComplete.bind(this));
        this.pxloader.addProgressListener(this._onProgress.bind(this));
    },

    _onComplete: function(e){
        this.trigger("complete", e);
    },

    _onProgress: function(e){

        var image = e.resource.img;
        var srcName = Gust.AssetManager.srcName(image.src);

        this.assetManager.add(image, srcName);

        var sheetData = this.images[srcName];
        sheetData.images = [image];
        sheetData.frames = {
            width: 25, height: 25
        };

        this.sheetManager.add(srcName, sheetData);

        this.trigger("progress", e);
    },

    start: function(){
        this.pxloader.start();
    }

});