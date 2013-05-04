Game.Scenes.Home = Game.Scene.extend({

    enter: function(){

        var levelNum = 0;

        Game.enter("play", {level: levelNum});

    }

});