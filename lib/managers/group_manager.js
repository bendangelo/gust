/*
The GroupManager will add / remove nodes from groups.

Example:
    this.groupManager = new GroupManager();

    this.groupManager.add("monsters", new Gust.Monsters(), function(e){
        return e instanceof Monster;
    });

*/
Gust.GroupManager = Gust.Manager.extend({

    init: function() {
        Gust.Manager.prototype.init.apply(this, arguments);
        this.groups = {};
    },

    add: function(key, group, condition) {

        this.groups[key] = condition;

        return Gust.Manager.prototype.add.call(this, key, group);
    },

    addNode: function(node) {
        for (var i in this.items) {
            var group = this.items[i];
            var condition = this.groups[i];

            if (condition.call(this, node, group)) {
                group.add(node);
            }
        }

        return this;
    },

    removeNode: function(node){
        // this could become really slow
        for(var i in this.items){
            var group = this.items[i];

            group.remove(node);
        }

        return this;
    }

});