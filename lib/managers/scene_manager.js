Gust.SceneManager = Gust.Manager.extend({

    current: null,

    enter: function(name, options) {
        if (this.current) {
            this.current.exit();
        }

        this.current = this.items[name];

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