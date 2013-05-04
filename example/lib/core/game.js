Game = {

    Scenes: {},
    Levels: [],
    Items: {},
    Sprites: {},

    init: function() {
        this.tileSize = 25;

        this.world = new Game.World();
        this.sceneManager = this.world.sceneManager;

        for (var i in this.Scenes) {
            this.sceneManager.add(i.toLowerCase(), new this.Scenes[i](this.world));
        }

        // start running nodes
        this.enter("load");

        this.world.start();
    },

    enter: function(name) {
        this.sceneManager.enter(name);
    }

};