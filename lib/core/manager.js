Gust.Manager = Gust.Events.extend({

    init: function(){
        this.items = {};
    },

    add: function(key, value){
        this.items[key] = value;

        return this;
    },

    get: function(key){
        return this.items[key];
    },

    remove: function(key){
        delete this.items[key];

        return this;
    },

    clear: function(){
        this.items = {};
        return this;
    }

});