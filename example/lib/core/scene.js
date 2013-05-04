Game.Scene = Gust.Scene.extend({

   color: "#D6F8FA",

   draw: function(context){
        context.fillStyle = this.color;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        this.world.stage.update();
   }

});