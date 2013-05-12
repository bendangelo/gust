# Gust

> Structure your javascript games.

## Getting Started

    sudo npm install gust -g
    gust new mygame

    cd newgame
    npm install
    sudo npm install grunt -g
    grunt server

## Syntax

```javascript
var world = new Gust.World("#game-canvas");

var Monster = Class.extend({

   init: function(){
      Class.prototype.init.call(this);

      this.sprite = new Sprite();
   }

});

var monster = new Monster();

world.start();
```

## About

Gust provides the ground work for setting up your javascript games. It does not provide, asset preloading, sound effects, canvas drawing, input support. The goal is to be a bare bones and extensible game framework showing you how to best setup your game.

Of course you'll need sprites, sound effects and asset preloading. Checkout the links below.

Gust uses a entity-system like architecture to handle updating / drawing logic. See the example game for usage.

## Feature List

* **Grunt** is used for task running
* [Fiber](https://github.com/linkedin/Fiber) used for class creation, aliased to **Class**
* `Events` class for handling events
* `Scene` and `SceneManager` class deal with scene managment
* `World` class that creates a canvas context and controls main loop
* `Map` class to deal with multi-dimensional arrays
* `Group` class contains nodes
* `Node` class creates a connection between an entity and a system
* `System` class is used to run actions on all nodes

## Libraries

Gust is not a game engine and does not provide support for graphics, sounds, preloading, input. Gust is felxible enough to work with almost every library, so its easy to plugin whatever you like. Here is a list of awesome libraries you can use:

### 2D Graphics

* [EaselJS](http://www.createjs.com/#!/EaselJS)
* [KineticJS](http://kineticjs.com/)
* [pixi.js](https://github.com/GoodBoyDigital/pixi.js)

### 3D Graphics

* [three.js](https://github.com/mrdoob/three.js/)

### Math

* [rift](https://github.com/bendangelo/rift)

### Sound

* [SoundJS](http://www.createjs.com/#!/SoundJS)
* [SoundManager2](http://www.schillmania.com/projects/soundmanager2/)
* [Buzz](http://buzz.jaysalvat.com/)

### Preloading

* [pxloader](http://thinkpixellab.com/pxloader/)
* [PreloadJS](http://www.createjs.com/#!/PreloadJS)

### Input

* [keymaster](https://github.com/madrobby/keymaster)
* [mousetrap](http://craig.is/killing/mice)
* [KeyboardJS](https://github.com/RobertWHurst/KeyboardJS/)

### Physics

* [box2dweb](https://code.google.com/p/box2dweb/)

### Tasks

* [grunt-preload-assets](https://github.com/gunta/grunt-preload-assets)
* [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit)

### Animation

* [TweenJS](http://www.createjs.com/#!/TweenJS)
* [GreenSock](http://www.greensock.com/get-started-js/)
* [shifty](https://github.com/jeremyckahn/shifty)

### Utilities

* [lodash](https://github.com/bestiejs/lodash)
* [underscore](http://underscorejs.org/)
* [sugar](http://sugarjs.com/)

### Testing

* [js-factories](https://github.com/matthijsgroen/js-factories)

### Other

* [PathFinding.js](https://github.com/qiao/PathFinding.js)
* [Modernizr](http://modernizr.com/)

Find more tiny libraries here: [microjs](http://microjs.com/#)

## Support

IE9+

## Contributing

`npm test` will run the tests or `grunt server` to run tests in the browser. Fork and make a pull request.

## MIT License

Copyright (C) 2013 Ben D'Angelo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.