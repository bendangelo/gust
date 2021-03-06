/* Gust 0.1.3 | MIT License */

(function(window){var Gust;

// export to nodejs or browser window
if(typeof exports != "undefined"){
    Gust = exports;
} else {
    Gust = window.Gust = {};
}

if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {

    define(function() {
      return Gust;
    });

}

Gust.$ = function(id){
    return document.getElementById(id.substr(1));
};
//     Fiber.js 1.0.5
//     @author: Kirollos Risk
//
//     Copyright (c) 2012 LinkedIn.
//     All Rights Reserved. Apache Software License 2.0
//     http://www.apache.org/licenses/LICENSE-2.0

(function() {
  /*jshint bitwise: true, camelcase: false, curly: true, eqeqeq: true,
    forin: false, immed: true, indent: 2, latedef: true, newcap: false,
    noarg: true, noempty: false, nonew: true, plusplus: false,
    quotmark: single, regexp: false, undef: true, unused: true, strict: false,
    trailing: true, asi: false, boss: false, debug: false, eqnull: true,
    es5: false, esnext: false, evil: true, expr: false, funcscope: false,
    iterator: false, lastsemic: false, laxbreak: false, laxcomma: false,
    loopfunc: false, multistr: true, onecase: false, proto: false,
    regexdash: false, scripturl: false, smarttabs: false, shadow: true,
    sub: true, supernew: true, validthis: false */

  /*global exports, global, define, module */

  (function(root, factory) {
    if (typeof exports === 'object') {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory(this);
    } else if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(function() {
        return factory(root);
      });
    } else {
      // Browser globals (root is window)
      root.Fiber = factory(root);
    }
  }(this, function(global) {

    // Baseline setup
    // --------------

    // Stores whether the object is being initialized. i.e., whether
    // to run the `init` function, or not.
    var initializing = false,

      // Keep a few prototype references around - for speed access,
      // and saving bytes in the minified version.
      ArrayProto = Array.prototype,

      // Save the previous value of `Fiber`.
      previousFiber = global.Fiber;

    // Helper function to copy properties from one object to the other.

    function copy(from, to) {
      var name;
      for (name in from) {
        if (from.hasOwnProperty(name)) {
          to[name] = from[name];
        }
      }
    }

    // The base `Fiber` implementation.

    function Fiber() {}

    // ###Extend
    //
    // Returns a subclass.
    Fiber.extend = function(fn) {
      // Keep a reference to the current prototye.
      var parent = this.prototype,

        // Invoke the function which will return an object literal used to
        // define the prototype. Additionally, pass in the parent prototype,
        // which will allow instances to use it.
        properties = (typeof fn === 'function') ? fn(parent) : fn,

        // Stores the constructor's prototype.
        proto;

      // The constructor function for a subclass.

      function child() {
        if (!initializing) {
          // Custom initialization is done in the `init` method.
          this.init.apply(this, arguments);
          // Prevent subsequent calls to `init`. Note: although a `delete
          // this.init` would remove the `init` function from the instance, it
          // would still exist in its super class' prototype.  Therefore,
          // explicitly set `init` to `void 0` to obtain the `undefined`
          // primitive value (in case the global's `undefined` property has
          // been re-assigned).
          this.init = void 0;
        }
      }

      // Instantiate a base class (but only create the instance, without
      // running `init`). And, make every `constructor` instance an instance
      // of `this` and of `constructor`.
      initializing = true;
      proto = child.prototype = new this;
      initializing = false;

      // Add default `init` function, which a class may override; it should
      // call the super class' `init` function (if it exists);
      proto.init = function() {
        if (typeof parent.init === 'function') {
          parent.init.apply(this, arguments);
        }
      };

      // Copy the properties over onto the new prototype.
      copy(properties, proto);

      // Enforce the constructor to be what we expect.
      proto.constructor = child;

      // Keep a reference to the parent prototype.
      // (Note: currently used by decorators and mixins, so that the parent
      // can be inferred).
      child.__base__ = parent;

      // Make this class extendable, this can be overridden by providing a
      // custom extend method on the proto.
      child.extend = child.prototype.extend || Fiber.extend;


      return child;
    };

    // Utilities
    // ---------

    // ###Proxy
    //
    // Returns a proxy object for accessing base methods with a given context.
    //
    // - `base`: the instance' parent class prototype.
    // - `instance`: a Fiber class instance.
    //
    // Overloads:
    //
    // - `Fiber.proxy( instance )`
    // - `Fiber.proxy( base, instance )`
    //
    Fiber.proxy = function(base, instance) {
      var name,
      iface = {},
      wrap;

      // If there's only 1 argument specified, then it is the instance,
      // thus infer `base` from its constructor.
      if (arguments.length === 1) {
        instance = base;
        base = instance.constructor.__base__;
      }

      // Returns a function which calls another function with `instance` as
      // the context.
      wrap = function(fn) {
        return function() {
          return base[fn].apply(instance, arguments);
        };
      };

      // For each function in `base`, create a wrapped version.
      for (name in base) {
        if (base.hasOwnProperty(name) && typeof base[name] === 'function') {
          iface[name] = wrap(name);
        }
      }
      return iface;
    };

    // ###Decorate
    //
    // Decorate an instance with given decorator(s).
    //
    // - `instance`: a Fiber class instance.
    // - `decorator[s]`: the argument list of decorator functions.
    //
    // Note: when a decorator is executed, the argument passed in is the super
    // class' prototype, and the context (i.e. the `this` binding) is the
    // instance.
    //
    //  *Example usage:*
    //
    //     function Decorator( base ) {
    //       // this === obj
    //       return {
    //         greet: function() {
    //           console.log('hi!');
    //         }
    //       };
    //     }
    //
    //     var obj = new Bar(); // Some instance of a Fiber class
    //     Fiber.decorate(obj, Decorator);
    //     obj.greet(); // hi!
    //
    Fiber.decorate = function(instance /*, decorator[s] */ ) {
      var i,
      // Get the base prototype.
      base = instance.constructor.__base__,
        // Get all the decorators in the arguments.
        decorators = ArrayProto.slice.call(arguments, 1),
        len = decorators.length,
        result;

      for (i = 0; i < len; i++) {

        result = (typeof decorators[i] === 'function') ? decorators[i].call(instance, base) : decorators[i];

        copy(result, instance);
      }
    };

    // ###Mixin
    //
    // Add functionality to a Fiber definition
    //
    // - `definition`: a Fiber class definition.
    // - `mixin[s]`: the argument list of mixins.
    //
    // Note: when a mixing is executed, the argument passed in is the super
    // class' prototype (i.e., the base)
    //
    // Overloads:
    //
    // - `Fiber.mixin( definition, mix_1 )`
    // - `Fiber.mixin( definition, mix_1, ..., mix_n )`
    //
    // *Example usage:*
    //
    //     var Definition = Fiber.extend(function(base) {
    //       return {
    //         method1: function(){}
    //       }
    //     });
    //
    //     function Mixin(base) {
    //       return {
    //         method2: function(){}
    //       }
    //     }
    //
    //     Fiber.mixin(Definition, Mixin);
    //     var obj = new Definition();
    //     obj.method2();
    //
    Fiber.mixin = function(definition /*, mixin[s] */ ) {
      var i,
      // Get the base prototype.
      base = definition.__base__,
        // Get all the mixins in the arguments.
        mixins = ArrayProto.slice.call(arguments, 1),
        len = mixins.length,
        result;

      for (i = 0; i < len; i++) {

        result = (typeof mixins[i] === 'function') ? mixins[i](base) : mixins[i];

        copy(result, definition.prototype);
      }
    };

    // ###noConflict
    //
    // Run Fiber.js in *noConflict* mode, returning the `fiber` variable to
    // its previous owner. Returns a reference to the Fiber object.
    Fiber.noConflict = function() {
      global.Fiber = previousFiber;
      return Fiber;
    };

    return Fiber;
  }));
}());
Gust.Class = Fiber;
Gust.Events = Gust.Class.extend({

    on: function(name, callback, context){
        if(!this._events){
            this._events = {};
        }

        if(!this._events[name]){
            this._events[name] = [];
        }

        if(!callback){
            throw "Event callback is null";
        }

        this._events[name].push({callback: callback, context: context || this});

        return this;
    },

    off: function(name, callback){

        if(callback){
            var types = this._events[name];

            if(types){
                var length = types.length;
                while(length--){
                    if(types[length].callback == callback){
                        types.splice(length, 1);
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
        if(!this._events || !this._events[type]) return this;

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

    stopListening: function(target, type, callback){
        if(!this._listens){
            return this;
        }

        var i = this._listens.length;
        while(i--){
            var e = this._listens[i];

            if(target && e.target != target ||
                type && e.type != type ||
                callback && e.callback != callback){
                continue;
            }

            e.target.off(e.type, e.callback);
            this._listens.splice(i, 1);
        }
        return this;
    }

});
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

    remove: function(key){
        delete this.items[key];

        return this;
    },

    clear: function(){
        this.items = {};
        return this;
    }

});
Gust.Timer = Gust.Class.extend({

});

Gust.Timer.lastTime = 0;

Gust.Timer.tick = function(){
    var wall = Date.now();
    var last = this.lastTime;

    this.lastTime = wall;

    return wall - last;
};
Gust.World = Gust.Class.extend({

    running: false,
    stepSize: 0.03,
    maxTick: 0.05,
    stepProgress: 0,

    init: function(canvas){
        if(canvas){
            this.setCanvas(canvas);
        }

        this.sceneManager = new Gust.SceneManager();
        this.groupManager = new Gust.GroupManager();
        this.assetManager = new Gust.AssetManager();

        this._requestAnimBind = this._requestAnim.bind(this);
    },

    setCanvas: function(canvas){
        if(typeof canvas == "string"){
            this.canvas = Gust.$(canvas);
        } else {
            // assuming its a canvas element
            this.canvas = canvas;
        }

        this.context = this.canvas.getContext('2d');

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        return this;
    },

    start: function(){
        if(!this.running){
            this.running = true;

            this._requestAnim();
        }
    },

    stop: function(){
        this.running = false;
        return this;
    },

    _requestAnim: function(){

        if(this.running){
            // must be called in context of window
            requestAnimationFrame.call(window, this._requestAnimBind, this.canvas);

            this.run();
        }
    },

    run: function(){

        var progress = Math.min(Gust.Timer.tick() / 1000, this.maxTick);

        this.stepProgress += progress;

        var count = 0;

        while(this.stepProgress >= this.stepSize){
            this.sceneManager.update(this.stepSize);

            this.stepProgress -= this.stepSize;

            if(count++ > 10){
                throw "Game loop stopped, too much lag";
            }
        }

        this.sceneManager.draw(this.context);
    },

    addNode: function(nodes){
        nodes = [].concat(nodes);

        this.groupManager.addNode(nodes);
    }

});
Gust.AssetManager = Gust.Manager.extend({

});

Gust.AssetManager.srcName = function(src){
    var path = src.split("/");
    return path[path.length-1];
};
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
Gust.SceneManager = Gust.Manager.extend({

    current: null,

    enter: function(name, options) {
        options = options || {};

        if (this.current) {
            if(this.current.exit(options) === false){
                // stop entering new scene
                return;
            }
        }

        this.current = this.items[name];

        this.current.enter(options);
    },

    update: function(tick) {
        if(this.current){
            this.current.update(tick);
        }
    },

    draw: function(context) {
        if(this.current){
            this.current.draw(context);
        }
    }

});
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
Gust.Map = Gust.Class.extend({

    lengthX: 0,
    lengthY: 0,
    defaultValue: 0,

    init: function(map) {
        this.copy(map || [
            []
        ]);
    },

    set: function(x, y, value) {

        //increate y length
        while (y >= this.data.length) {
            var m = new Array(this.data[0]);

            for (var l in m) {
                m[l] = this.defaultValue;
            }

            this.data.push(m);

        }

        //increase x length
        while (x >= this.data[this.data.length - 1].length) {

            for (var k = 0; k < this.data.length; k++) {
                if (this.data[k].length <= x) {
                    this.data[k].push(this.defaultValue);
                }
            }

        }

        this.lengthX = this.data[y].length;
        this.lengthY = this.data.length;

        this.data[y][x] = value;

        return this;
    },

    get: function(x, y) {
        if (this.within(x, y)) {
            return this.data[y][x];
        }
    },

    within: function(x, y) {
        return y >= 0 && y < this.lengthY && x >= 0 && x < this.lengthX;
    },

    clear: function() {
        this.data = [];
        this.lengthX = 0;
        this.lengthY = 0;
    },

    reset: function(value) {
        for (var y = 0; y < this.data.length; y++) {
            for (var x = 0; x < this.data[0].length; x++) {
                this.data[y][x] = (value !== undefined) ? value : this.defaultValue;
            }
        }

        return this;
    },

    copy: function(map) {
        this.data = [];

        for (var y = 0; y < map.length; y++) {
            this.data[y] = new Array(map.length);
            for (var x = 0; x < map[0].length; x++) {
                this.data[y][x] = map[y][x];
            }
        }

        this.lengthX = map[0].length;
        this.lengthY = map.length;

        return this;
    },

    forEach: function(callback, context) {
        for (var y = 0; y < this.data.length; y++) {
            for (var x = 0; x < this.data[0].length; x++) {

                var item = this.get(x, y);

                if (callback.call(context || this, item, x, y) === false) {
                    break;
                }

            }
        }

        return this;
    }

});
Gust.Node = Gust.Events.extend({

    init: function(){
        // this unique id can be used for groups
        this.id = ++Gust.Node._id;
    }

});

Gust.Node._id = 0;
Gust.Scene = Gust.Events.extend({

    init: function(world) {
        this.world = world;
    },

    enter: function(options) {

    },

    exit: function(options) {

    },

    update: function(tick) {

    },

    draw: function(context) {

    }

});
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
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
})(this);