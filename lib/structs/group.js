/*
The Group class is an array of objects, usually nodes.

Example:

    var monsters = new Gust.Group();

    Gust.Monsters = Gust.Group.extend({

    });

*/
Gust.Group = Gust.Events.extend({

    length: 0,

    init: function(nodes) {
        this.nodes = [];

        if (nodes) {
            this.add(nodes);
        }
    },

    add: function(nodes) {
        nodes = [].concat(nodes);

        for (var i in nodes) {
            this.nodes.push(nodes[i]);
            this.length++;

            this.trigger("add", nodes[i]);
        }

        return this;
    },

    remove: function(nodes) {
        nodes = [].concat(nodes);

        for (var i in nodes) {
            var node = nodes[i];
            var index = this.nodes.indexOf(node);

            if (index != -1) {
                this.nodes.splice(index, 1);
                this.length--;

                this.trigger("remove", node);
            }
        }

        return this;
    },

    get: function(id) {
        for (var i in this.nodes) {
            var node = this.nodes[i];

            if (node.id == id) return node;
        }
    },

    at: function(index) {
        return this.nodes[index];
    },

    clear: function() {
        while (this.nodes.length) {
            this.trigger("remove", this.nodes.pop());
        }
        this.length = 0;

        return this;
    }

});