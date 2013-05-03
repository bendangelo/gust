/*
The Group class is an array of objects, usually nodes.

Example:

    var monsters = new Gust.Group();

    Gust.Monsters = Gust.Group.extend({

    });

*/
Gust.Group = Gust.Class.extend({

    init: function(nodes){
        this.nodes = [];

        if(nodes){
            this.add(nodes);
        }
    },

    add: function(nodes){
        this.nodes = this.nodes.concat(nodes);

        return this;
    }

});