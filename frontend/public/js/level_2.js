var BABYLON = require('babylonjs');
var planetTexture = require('./planet_texture.js');
var asteroidTexture = require('./asteroid_texture.js');

module.exports.ship = function(scene){
  var spaceship = new Ship('ship', 2, .5, scene, -30, 1, -20);
  return spaceship;
}

module.exports.canvasObjects = function(scene){
  var canvasObjects = [];
  canvasObjects[0] = new GameObject('planet', 12, 30, scene, 40, 1, 25);
  canvasObjects[1] = new GameObject('asteroid', 4, 8, scene, 5, 1, 2.5);
  canvasObjects[1] = asteroidTexture(scene, canvasObjects[1]);
  canvasObjects[0] = planetTexture(scene, canvasObjects[0], "./public/images/plutomap2k.jpg", "./public/images/plutonormalmap.png");
  return canvasObjects
}

module.exports.image = 'public/images/levels/level_2.png'