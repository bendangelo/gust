Gust.Events = Gust.Class.extend({

    on: function(name, callback, context){
        if(!this._events){
            this._events = {};
        }

        if(!this._events[name]){
            this._events[name] = [];
        }

        console.assert(callback, "Event callback is null");

        this._events[name].push({callback: callback, context: context || this});

        return this;
    },

    off: function(name, callback){

        if(callback){
            var types = this._events[name];

            if(types){
                for(var i in types){
                    if(types[i].callback == callback){
                        types.splice(i, 1);
                    }
                }
            }

        } else if(name){
            this._events[name] = [];
        } else {
            this._events = {};
        }
    },

    trigger: function(type){
        if(!this._events[type]) return this;

        var events = this._events[type], e;

        for(var i=0, l = events.length; i<l; i++){
            e = events[i];

            if(!e) break;

            e.callback.apply(e.context, Array.prototype.slice.call(arguments, 1));
        }

        return this;
    },

    listenTo: function(target, type, callback){
        if(!this._listens){
            this._listens = [];
        }

        target.on(type, callback, this);

        this._listens.push({target: target, type: type, callback: callback});

        return this;
    },

    stopListening: function(){
        // remove all for now
        var e;
        for(var i in this._listens){
            e = this._listens[i];

            e.target.off(e.type, e.callback);
        }
        return this;
    }

});