var BABYLON = require('babylonjs');

module.exports = function generateLight(scene){

  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(100, 25 , -100), scene);
  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;
  
  return light;
}