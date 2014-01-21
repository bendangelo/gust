Gust.SceneManager = Gust.Manager.extend({

    current: null,

    enter: function(name, options) {
        options = options || {};

        if (this.current) {
            if(this.current.exit(options) === false){
                // stop entering new scene
                return;
            }
        }

        this.current = this.items[name];

        this.current.enter(options);
    },

    update: function(tick) {
        if(this.current){
            this.current.update(tick);
        }
    },

    draw: function(context) {
        if(this.current){
            this.current.draw(context);
        }
    }

});