/*
The Group class is an array of objects, usually nodes.

Example:

    var monsters = new Gust.Group();

    Gust.Monsters = Gust.Group.extend({

    });

*/
Gust.Group = Gust.Events.extend({

    init: function(nodes){
        this.nodes = [];

        if(nodes){
            this.add(nodes);
        }
    },

    add: function(nodes, options){
        nodes = [].concat(nodes);

        for(var i in nodes){
            this.nodes.push(nodes[i]);

            this.trigger("add", nodes[i]);
        }

        return this;
    },

    remove: function(nodes, options){
        nodes = [].concat(nodes);

        for(var i in nodes){
            var node = nodes[i];
            var index = this.nodes.indexOf(node);

            if(index != -1){
                this.nodes.splice(index, 1);

                this.trigger("remove", node);
            }
        }

        return this;
    },

    at: function(index){
        return this.nodes[index];
    },

    clear: function(){
        while(this.nodes.length){
            this.trigger("remove", this.nodes.pop());
        }

        return this;
    }

});