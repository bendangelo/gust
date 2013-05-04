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

    remove: function(){

    }

});