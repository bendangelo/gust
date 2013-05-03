Gust.SceneManager = Gust.Class.extend({

    current: null,

    init: function() {
        this.scenes = {};
    },

    add: function(name, scene) {
        this.scenes[name] = scene;
    },

    enter: function(name, options) {
        if (this.current) {
            this.current.exit();
        }

        this.current = this.scenes[name];

        this.current.enter(options);
    },

    update: function() {
        this.current.update();
    },

    draw: function() {
        this.current.draw();
    }

});