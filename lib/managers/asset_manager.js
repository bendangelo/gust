Gust.AssetManager = Gust.Manager.extend({

});

Gust.AssetManager.srcName = function(src){
    var path = src.split("/");
    return path[path.length-1];
};