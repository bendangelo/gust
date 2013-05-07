Gust.System = Gust.Class.extend({

    init: function(group) {
        this.group = group;
    },

    processAll: function() {
        var nodes = this.group.nodes;
        for (var i in nodes) {
            // process must be implemented
            this.process(nodes[i]);
        }
    }

});