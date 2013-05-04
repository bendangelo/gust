Game.Map = Gust.Class.extend({

    lengthX: 0,
    lengthY: 0,
    defaultValue: 0,

    init: function() {
        this.map = [];
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