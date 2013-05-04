Gust.AssetManager = Gust.Class.extend({

    init: function(){
        this.assets = {};
    },

    add: function(asset){
        var path = asset.src.split("/");
        var name = path[path.length-1];

        this.assets[name] = asset;

        return this;
    },

    get: function(name){
        return this.assets[name];
    }

});