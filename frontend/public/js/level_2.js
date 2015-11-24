var BABYLON = require('babylonjs');
var plutoTexture = require('./pluto_texture.js');

module.exports.ship = function(scene){
  return new Ship('ship', 2, .5, scene, -20, 1, -20);
}

module.exports.canvasObjects = function(scene){
  var canvasObjects = [];
  canvasObjects[0] = new GameObject('planet', 12, 30, scene, 25, 1, 25);

  canvasObjects[1] = new GameObject('asteroid', 4, 8, scene, 10, 1, 10);

  canvasObjects[0] = plutoTexture(scene, canvasObjects[0])
  return canvasObjects
}

module.exports.image = 'public/images/levels/level_2.png'