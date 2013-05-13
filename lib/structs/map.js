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