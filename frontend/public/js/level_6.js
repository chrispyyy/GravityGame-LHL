var BABYLON = require('babylonjs');
var planetTexture = require('./planet_texture.js');
var asteroidTexture = require('./asteroid_texture.js');

module.exports.ship = function(scene){
  var spaceship = new Ship('ship', 2, .5, scene, -75, 1, -30);
  return spaceship;
}

module.exports.canvasObjects = function(scene){
  var canvasObjects = [];

  canvasObjects[0] = new GameObject('planet', 12, 50, scene, 75, 1, 30);
  
  canvasObjects[0] = planetTexture(scene, canvasObjects[0], "./public/images/venusmap.jpg", "./public/images/venusbump.png");

  canvasObjects[1] = new GameObject('asteroid', 4, 3, scene, -30, 1, 36);
  canvasObjects[2] = new GameObject('asteroid', 4, 3, scene, -30, 1, 12);
  canvasObjects[3] = new GameObject('asteroid', 4, 3, scene, -30, 1, 24);
  canvasObjects[4] = new GameObject('asteroid', 4, 3, scene, 0, 1, -36);
  canvasObjects[5] = new GameObject('asteroid', 4, 3, scene, 0, 1, -24);
  canvasObjects[6] = new GameObject('asteroid', 4, 3, scene, 30, 1, 36)
  canvasObjects[7] = new GameObject('asteroid', 4, 3, scene, 30, 1, 24)
  canvasObjects[8] = new GameObject('asteroid', 4, 3, scene, 30, 1, 12);
  canvasObjects[9] = new GameObject('asteroid', 4, 3, scene, -30, 1, 48);
  canvasObjects[10] = new GameObject('asteroid', 4, 3, scene, 0, 1, -48);
  canvasObjects[11] = new GameObject('asteroid', 4, 3, scene, 30, 1, 48);

  for (var i = 1; i < canvasObjects.length; i++) {
    canvasObjects[i] = asteroidTexture(scene, canvasObjects[i]);
  }

  return canvasObjects
}

module.exports.image = 'public/images/levels/level_6.png'