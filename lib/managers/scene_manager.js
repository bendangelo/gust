Gust.SceneManager = Gust.Manager.extend({

    current: null,

    enter: function(name, options) {
        if (this.current) {
            if(this.current.exit && this.current.exit(options) === false){
                // stop entering new scene
                return;
            }
        }

        this.current = this.items[name];

        this.current.enter(options);
    },

    update: function(tick) {
        this.current.update(tick);
    },

    draw: function(context) {
        this.current.draw(context);
    }

});