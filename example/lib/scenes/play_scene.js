Game.Scenes.Play = Game.Scene.extend({

  init: function(){
    Game.Scene.prototype.init.apply(this, arguments);

    this.level = new Game.Level(this.world);
    this.counter = new createjs.Text("Total: 0", "15px Ariel");
  },

  enter: function(options) {
    this.count = 0;

    var levelData = Game.Levels[options.level];

    this.level.build(levelData);

    this.listenTo(this.level.collectables, "remove", this.onRemove);

  },

  exit: function() {
    this.level.teardown();
  },

  onRemove: function(){
    this.count++;

    this.counter.text = "Total: " + this.count;
  },

  update: function(tick){
    this.level.update(tick);
  }

});
/*
re.scene('play')
.enter(function(level){

  //create group
  this.items = re.g('items').create();

  //offset screen because all tiles are centered..
  //checkout tsprite.js
  re.screen().pos(-re.tile.sizeX * 0.5, -re.tile.sizeY * 0.5);

  //display coin text
  var counter = this.counter = re.e('counter');

  //find level
  this.level = re('level').load(level)

  //let the player collect coins
  //listen for collect events from all coins
  re('items').coins().invoke('on', 'collect', function(){
    counter.add(1);
  });

})
.exit(function(){
  this.items.dispose();

  this.counter.dispose();

  //teardown level
  if(this.level)
  this.level.teardown();

});*/