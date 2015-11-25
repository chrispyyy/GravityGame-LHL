var BABYLON = require('babylonjs');
var planetTexture = require('./planet_texture.js');
var asteroidTexture = require('./asteroid_texture.js');

module.exports.ship = function(scene){
  var spaceship = new Ship('ship', 2, .5, scene, 0, 1, 0);
  return spaceship;
}

module.exports.canvasObjects = function(scene){
  var canvasObjects = [];

  canvasObjects[0] = new GameObject('planet', 12, 10, scene, -40, 1, 40);
  

  canvasObjects[0] = planetTexture(scene, canvasObjects[0], "./public/images/green.jpg", "./public/images/icebump.png");

  canvasObjects[1] = new GameObject('asteroid', 4, 5, scene, 20, 1, 20);
  canvasObjects[2] = new GameObject('asteroid', 4, 5, scene, -20, 1, 20)
  canvasObjects[3] = new GameObject('asteroid', 4, 5, scene, 20, 1, -20);
  canvasObjects[4] = new GameObject('asteroid', 4, 5, scene, -20, 1, -20);

  for (var i = 1; i < canvasObjects.length; i++) {
    canvasObjects[i] = asteroidTexture(scene, canvasObjects[i]);
  }

  return canvasObjects
}

module.exports.image = 'public/images/levels/level_4.png'