var BABYLON = require('babylonjs');
var planetTexture = require('./planet_texture.js');
var asteroidTexture = require('./asteroid_texture.js');

module.exports.ship = function(scene){
  var spaceship = new Ship('ship', 2, .5, scene, 30, 1, 30);
  return spaceship;
}

module.exports.canvasObjects = function(scene){
  var canvasObjects = [];

  canvasObjects[0] = new GameObject('planet', 12, 125, scene, -30, 1, -30);
  
  canvasObjects[0] = planetTexture(scene, canvasObjects[0], "./public/images/jupitermap.jpg", null);

  canvasObjects[1] = new GameObject('asteroid', 4, 1, scene, 30, 1, 55);
  canvasObjects[2] = new GameObject('asteroid', 4, 1, scene, 30, 1, 5)
  canvasObjects[3] = new GameObject('asteroid', 4, 1, scene, 20, 1, 45);
  canvasObjects[4] = new GameObject('asteroid', 4, 1, scene, 20, 1, -5);
  canvasObjects[5] = new GameObject('asteroid', 4, 1, scene, 10, 1, 35);
  canvasObjects[6] = new GameObject('asteroid', 4, 1, scene, 10, 1, -15);
  canvasObjects[7] = new GameObject('asteroid', 4, 1, scene, 0, 1, 25);
  canvasObjects[8] = new GameObject('asteroid', 4, 1, scene, 0, 1, -25);
  canvasObjects[9] = new GameObject('asteroid', 4, 1, scene, -10, 1, 15);
  canvasObjects[10] = new GameObject('asteroid', 4, 1, scene, -10, 1, -35);
  canvasObjects[11] = new GameObject('asteroid', 4, 1, scene, -20, 1, 5);
  canvasObjects[12] = new GameObject('asteroid', 4, 1, scene, -20, 1, -45);
  canvasObjects[14] = new GameObject('asteroid', 4, 1, scene, -30, 1, -5);
  canvasObjects[13] = new GameObject('asteroid', 4, 1, scene, -30, 1, -55);

  for (var i = 1; i < canvasObjects.length; i++) {
    canvasObjects[i] = asteroidTexture(scene, canvasObjects[i]);
  }

  return canvasObjects
}

module.exports.image = 'public/images/levels/level_5.png'