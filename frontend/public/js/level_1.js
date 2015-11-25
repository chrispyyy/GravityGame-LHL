var BABYLON = require('babylonjs');
var planetTexture = require('./planet_texture.js');

module.exports.ship = function(scene) {
  var spaceship = new Ship('ship', 2, 1, scene, -20, 1, -20);
  return spaceship;
}

module.exports.canvasObjects = function(scene) {
  return [
    planetTexture(scene, new GameObject('planet', 12, 30, scene, 40, 1, 25), "./public/images/plutomap2k.jpg", "./public/images/plutonormalmap.png")
  ];
}

module.exports.image = 'public/images/levels/level_1.png'