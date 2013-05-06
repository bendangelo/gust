Gust.Map = Gust.Class.extend({

    lengthX: 0,
    lengthY: 0,
    defaultValue: 0,

    init: function() {
        this.clear();
    },

    clear: function(){
        this.map = [];
        this.lengthX = 0;
        this.lengthY = 0;
    },

    reset: function(value){
        for(var y = 0; y < this.map.length; y++){
            for(var x = 0; x < this.map[0].length; x++){
                this.map[y][x] = (value !== undefined) ? value : this.defaultValue;
            }
        }

        return this;
    },

    copy: function(map){
        this.map = [];

        for(var y=0; y< map.length; y++){
            this.map[y] = new Array(map.length);
            for(var x = 0; x < map[0].length; x++){
                this.map[y][x] = map[y][x];
            }
        }

        this.lengthX = map[0].length;
        this.lengthY = map.length;

        return this;
    },

    set: function(x, y, value) {

        //increate y length
        while (y >= this.map.length) {
            var m = new Array(this.map[0]);

            for (var l in m) {
                m[l] = this.defaultValue;
            }

            this.map.push(m);

        }

        //increase x length
        while (x >= this.map[this.map.length - 1].length) {

            for (var k = 0; k < this.map.length; k++) {
                if (this.map[k].length <= x) {
                    this.map[k].push(this.defaultValue);
                }
            }

        }

        this.lengthX = this.map[y].length;
        this.lengthY = this.map.length;

        this.map[y][x] = value;

        return this;
    },

    get: function(x, y) {
        if (this.within(x, y)) {
            return this.map[y][x];
        }
    },

    within: function(x, y) {
        return y >= 0 && y < this.lengthY && x >= 0 && x < this.lengthX;
    }

});