/*
The GroupManager will add / remove nodes from groups.

Example:
    this.groupManager = new GroupManager();

    this.groupManager.track(new Gust.Monsters(), function(e){
        return e instanceof Monster;
    });

*/
Gust.GroupManager = Gust.Manager.extend({

    init: function() {
        this.groups = {};
    },

    add: function(key, group, condition) {
        if(typeof condition == "object"){
            var type = condition;
            // default to instanceof
            condition = function(node){
              return node instanceof type;
            };
        }

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
    }

});