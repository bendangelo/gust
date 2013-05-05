Game.Level = Gust.Class.extend({

  init: function(world) {
    this.world = world;

    this.collectables = new Game.Groups.Collectables();
    this.tilemap = new Game.Groups.Tilemap(this.map);
    this.hitmap = new Game.Groups.Hitmap(this.map);
    this.bodies = new Game.Groups.Bodies();

    this.hitmapSystem = new Game.Systems.Hitmap(this.hitmap, this.bodies);

    this.world.groupManager.add("bodies", this.bodies, function(node){
      return node instanceof Game.Nodes.Body;
    });

  },

  build: function(levelData) {
    this.buildTiles(levelData.map);

    this.buildHero(levelData.hero);

    this.buildItems();
  },

  teardown: function() {

  },

  buildTiles: function(mapData) {

    var spriteSheet = this.world.sheetManager.get("tiles.png");
    var tileId;

    for (var y = 0; y < mapData.length; y++) {

      for (var x = 0; x < mapData[0].length; x++) {
        tileId = mapData[y][x] - 1;

        if (tileId == Game.Tile.BLANK) continue;

        var tile = new Game.Tile(spriteSheet, tileId, x, y);

        this.tilemap.set(x, y, tile);

        this.hitmap.set(x, y, tile.walkable);

        tile.addToWorld(this.world);
      }

    }

  },

  buildItems: function(itemsData) {

  },

  buildHero: function(heroData) {
    var spriteSheet = this.world.sheetManager.get("hero.png");
    debugger

    this.hero = new Game.Hero(spriteSheet, heroData.x, heroData.y);

    this.hero.addToWorld(this.world);
  },

  draw: function() {

  },

  update: function() {
    this.hitmapSystem.processAll();
  }

});

/*re.c('level')
.defines({

  build:function(){
    if(re.hitmap){
      re.hitmap.dispose();
    }

    re.hitmap = re.e('hitmap');

    this.placeTiles();

    this.placeHero();

    //items requires hero to be defined first
    this.placeItems();

  },

  teardown:function(){
    //todo
  },

  placeTiles:function(){

    var map = this.map;

    for(var y=0; y<map.length; y++){

      for(var x=0; x<map[0].length; x++){

        var v = map[y][x];

        if(v){
          v--;

         re.e('tile').set({
          tileX:x,
          tileY:y,
          frame:v
          });

          //add to hitmap
          re.hitmap.automap(x, y, 1);

        }

      }

    }

  },

  placeItems:function(){

    var gid = 27;
    var items = this.items;

    for(var i in items){
      var it = items[i];

      var frame = items[i].id - gid;

      re.e('t'+frame).set({
        posX:it.x,
        posY:it.y - re.tile.sizeY,
        frame:frame
      });

    }

    //update hero last
    re('update').remove(this.hero).add(this.hero);
  },

  placeHero:function(){

    var pos = this.hero;

    this.hero = re.e('hero')
    .set({
      posX:pos.x,
      posY:pos.y - re.tile.sizeY //tiled editor adds an extra tile to y
    });

  }

});*/