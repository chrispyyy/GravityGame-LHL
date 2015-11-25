var BABYLON = require('babylonjs');
var planetTexture = require('./planet_texture.js');
var asteroidTexture = require('./asteroid_texture.js');

module.exports.ship = function(scene){
  var spaceship = new Ship('ship', 2, 0.5, scene, -30, 1, -30, new BABYLON.Vector3(0.008, 0, 0.008));
  return spaceship;
}

module.exports.canvasObjects = function(scene){
  var canvasObjects = [];

  canvasObjects[0] = new GameObject('planet', 12, 30, scene, 30, 1, 30);
  

  canvasObjects[0] = planetTexture(scene, canvasObjects[0], "./public/images/iceworld.jpg", "./public/images/icebump.png");

  canvasObjects[1] = new GameObject('asteroid', 4, 5, scene, 20, 1, -20);
  canvasObjects[2] = new GameObject('asteroid', 4, 5, scene, -20, 1, 20)
  canvasObjects[3] = new GameObject('asteroid', 4, 5, scene, 6, 1, 6);

  for (var i = 1; i < canvasObjects.length; i++) {
    canvasObjects[i] = asteroidTexture(scene, canvasObjects[i]);
  }

  return canvasObjects
}

module.exports.image = 'public/images/levels/level_3.png'