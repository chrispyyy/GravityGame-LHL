var BABYLON = require('babylonjs');

module.exports = function generateCamera(scene, canvas){
  
  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 75, -0.0000000000000001), scene);
  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  return camera;
}
