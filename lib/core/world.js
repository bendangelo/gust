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
            console.assert(this.sceneManager.current, "Current scene is null");
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