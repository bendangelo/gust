Gust.AssetManager = Gust.Manager.extend({

    add: function(asset, key){
        if(!key){
            key = Gust.AssetManager.getSrcName(asset.src);
        }

        this.items[key] = asset;

        return this;
    }

});

Gust.AssetManager.srcName = function(src){
    var path = src.split("/");
    return path[path.length-1];
};