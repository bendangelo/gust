Game.Scenes.Home = Gust.Scene.extend({

    enter: function(){

        var levelNum = 0;

        Game.enter("play", {level: levelNum});

    }

});