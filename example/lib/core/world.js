Game.World = Gust.World.extend({

   init: function(){
        Gust.World.prototype.init.call(this, document.getElementById("game-canvas"));
   }

});