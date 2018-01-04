"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = 0;
var height = 0;

var iBubbles = 10;

var aBubblesX = [];
var aBubblesY = [];
var aBubblesSize = [];
var aBubblesSpeed = [];
var aZeroOrOne = [];

var random = function random(min, max) {
  if (typeof max === 'undefined') {
    return Math.random() * (min[1] - min[0]) + min[0];
  } else {
    return Math.random() * (max - min) + min;
  }
};

var NumberElementConfig = function NumberElementConfig(values, xMinMax, yMinMax, sizeMinMax, speedMinMax) {
  _classCallCheck(this, NumberElementConfig);

  this.values = values;
  this.x = xMinMax;
  this.y = yMinMax;
  this.size = sizeMinMax;
  this.speed = speedMinMax;
};

var NumberElement = function () {
  function NumberElement(numberElementConfig) {
    _classCallCheck(this, NumberElement);

    this.config = numberElementConfig;
    this.spawn();
  }

  NumberElement.prototype.spawn = function spawn() {
    this.value = this.config.values[Math.floor(random(0, 2))];
    this.size = random(this.config.size);
    this.speed = random(this.config.speed);
    this.x = random(this.config.x);
    this.y = random(this.config.y);

    this.viewportOffset = this.config.size[1] + 20;

    if (Math.abs(this.speed) < 1) {
      this.speed += this.speed < 0 ? -1 : 1;
    }

    this.setSpawnPosition();
  };

  NumberElement.prototype.respawn = function respawn() {
    this.spawn();
  };

  NumberElement.prototype.setSpawnPosition = function setSpawnPosition() {
    if (this.speed < 0) {
      var key = ['x', 'y'][Math.floor(random(0, 2))];
      var value = key === 'x' ? innerWidth : innerHeight;
      this[key] = value + this.size;
    } else {
      var key = ['x', 'y'][Math.floor(random(0, 2))];
      this[key] = 0 - this.size;
    }
  };

  NumberElement.prototype.isInViewport = function isInViewport() {
    if (this.x < 0 - this.viewportOffset || this.y < 0 - this.viewportOffset || this.x > innerWidth + this.viewportOffset || this.y > innerHeight + this.viewportOffset) {
      return false;
    } else {
      return true;
    }
  };

  NumberElement.prototype.move = function move() {
    this.x += this.speed;
    this.y += this.speed;
  };

  return NumberElement;
}();

var NumberElementCollector = function () {
  function NumberElementCollector() {
    var _this = this;

    var count = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];
    var spawnTimeout = arguments.length <= 1 || arguments[1] === undefined ? 20 : arguments[1];

    _classCallCheck(this, NumberElementCollector);

    this.numberElements = [];

    var generator = function generator() {
      if (count != _this.numberElements.length) {
        _this.numberElements.push(_this.generateNumberElement());
        setTimeout(generator, spawnTimeout);
      }
    };
    generator();
  }

  NumberElementCollector.prototype.get = function get() {
    return this.numberElements;
  };

  NumberElementCollector.prototype.moveAll = function moveAll() {
    for (var i = 0; i < this.numberElements.length; ++i) {
      var element = this.numberElements[i];
      element.move();
      if (!element.isInViewport()) {
        element.respawn();
      }
    }
  };

  NumberElementCollector.prototype.generateNumberElement = function generateNumberElement() {
    return new NumberElement(new NumberElementConfig(['0', '1'], [0, innerWidth], // x
    [0, innerHeight], // y
    [15, 50], // size
    [-12, 12] // speed
    ));
  };

  return NumberElementCollector;
}();

var numberElementCollector = new NumberElementCollector();

var draw = function draw() {
  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  for (var _iterator = numberElementCollector.get(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var numberElement = _ref;

    ctx.font = numberElement.size / 1.5 + 'px arial black';
    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'left';
    ctx.fillText(numberElement.value, numberElement.x, numberElement.y);
  }
  ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
  ctx.stroke();
};

var process = function process() {
  width = canvas.width = innerWidth;
  height = canvas.height = innerHeight;

  numberElementCollector.moveAll();
  draw();

  requestAnimationFrame(process);
};
process();