/*
The GroupManager will add / remove nodes from groups.

Example:
    this.groupManager = new GroupManager();

    this.groupManager.track(new Gust.Monsters(), function(e){
        return e instanceof Monster;
    });

*/
Gust.GroupManager = Gust.Class.extend({

    init: function() {
        this.groups = {};
    },

    add: function(group, condition) {

    },

    addNode: function(node) {

    }

});