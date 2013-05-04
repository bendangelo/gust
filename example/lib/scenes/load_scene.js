Game.Scenes.Load = Game.Scene.extend({

  enter: function() {
    this.loader = new Game.Loader(Game.world.assetManager);

    this.listenTo(this.loader, "complete", this.onComplete);
    this.listenTo(this.loader, "progress", this.onProgress);

    this.text = new createjs.Text("Loading", "20px Ariel", "#000000");
    this.text.y = this.world.height - this.text.getMeasuredHeight();

    this.world.stage.addChild(this.text);

    this.loader.start();
  },

  exit: function() {
    this.world.stage.removeChild(this.text);
  },

  onComplete: function() {
    Game.sceneManager.enter("home");
  },

  onProgress: function(e) {
    this.text.text = "Loading " + (e.completedCount / e.totalCount) * 100 + "%";
  }

});
/*
re.scene('load')
.enter(function(){

  re.tile.sizeX = re.tile.sizeY = 25;

  re.loop().clearColor = '#D6F8FA';

  //setup gravity
  re.force.graY = 30 * re.loop().stepSize;

  re.load(re.assets)
  .complete(function(){

    //move to home
    re.scene('home').enter();
  })
  .error(function(e){

  })
  .progress(function(i){

  });

})
.exit(function(){
  //exit load scene
});
*/