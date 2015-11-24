var BABYLON = require('babylonjs');
var iceworldTexture = require('./iceworld_texture.js');
var asteroidTexture = require('./asteroid_texture.js');

module.exports.ship = function(scene){
  var spaceship = new Ship('ship', 2, .5, scene, -20, 1, -20);
  return spaceship;
}

module.exports.canvasObjects = function(scene){
  var canvasObjects = [];

  canvasObjects[0] = new GameObject('planet', 12, 30, scene, 25, 1, 25);
  

  canvasObjects[0] = iceworldTexture(scene, canvasObjects[0]);


  canvasObjects[1] = new GameObject('asteroid', 4, 5, scene, 10, 1, -6);
  canvasObjects[2] = new GameObject('asteroid', 4, 5, scene, -6, 1, 10)
  canvasObjects[3] = new GameObject('asteroid', 4, 5, scene, 4, 1, 4);
  canvasObjects[1] = asteroidTexture(scene, canvasObjects[1]);
  canvasObjects[2] = asteroidTexture(scene, canvasObjects[2]);
  canvasObjects[3] = asteroidTexture(scene, canvasObjects[3]);

  return canvasObjects
}

module.exports.image = 'public/images/levels/level_3.png'