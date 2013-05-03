Gust.Timer = Gust.Class.extend({

});

Gust.Timer.lastTime = 0;

Gust.Timer.tick = function(){
    var wall = Date.now();
    var last = this.lastTime;

    this.lastTime = wall;

    return wall - last;
};