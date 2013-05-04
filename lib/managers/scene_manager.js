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

        console.assert(this.current, "Scene selected is null");

        this.current.enter(options);
    },

    update: function(tick) {
        this.current.update(tick);
    },

    draw: function(context) {
        this.current.draw(context);
    }

});