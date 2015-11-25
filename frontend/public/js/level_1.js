var BABYLON = require('babylonjs');
var planetTexture = require('./planet_texture.js');

module.exports.ship = function(scene) {
  var spaceship = new Ship('ship', 2, 1, scene, -60, 1, -30, new BABYLON.Vector3(0.008, 0, 0.008));
  return spaceship;
}

module.exports.canvasObjects = function(scene) {
  return [
    planetTexture(scene, new GameObject('planet', 12, 40, scene, 60, 1, 30), "./public/images/plutomap2k.jpg", "./public/images/plutonormalmap.png")
  ];
}

module.exports.image = 'public/images/levels/level_1.png'
