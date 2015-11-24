var BABYLON = require('babylonjs');
var plutoTexture = require('./pluto_texture.js');

module.exports.ship = function(scene) {
  return new Ship('ship', 2, .5, scene, -50, 1, -30);
}

module.exports.canvasObjects = function(scene) {
  return [
    plutoTexture(scene, new GameObject('planet', 12, 30, scene, 40, 1, 25))
  ];
}

module.exports.image = 'public/images/levels/level_1.png'