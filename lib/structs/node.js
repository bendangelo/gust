Gust.Node = Gust.Events.extend({

    init: function(){
        // this unique id can be used for groups
        this.id = ++Gust.Node._id;
    }

});

Gust.Node._id = 0;