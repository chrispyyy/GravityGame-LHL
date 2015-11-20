var BABYLON = require('babylonjs');
var plutoTexture = require('./pluto_texture.js');

module.exports.ship = function(scene){
  var ship = new GameObject('ship', 2, .5, scene, -20, 1, -20);
  return ship
}

module.exports.canvasObjects = function(scene){
  var canvasObjects = [];
  canvasObjects[0] = new GameObject('planet', 12, 30, scene, 25, 1, 25);
  canvasObjects[0] = plutoTexture(scene, canvasObjects[0])
  return canvasObjects
}

module.exports.image = 'public/images/levels/level_1.png'