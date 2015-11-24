var BABYLON = require('babylonjs');

module.exports = function generateCamera(scene, canvas, ship){

  var followCamera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 15, -45), scene);
  followCamera.target = ship.canvasObject; // target any mesh or object with a "position" Vector3

  followCamera.radius = 30; // how far from the object to follow
  followCamera.heightOffset = 8; // how high above the object to place the camera
  followCamera.rotationOffset = 180; // the viewing angle
  followCamera.cameraAcceleration = 0.05 // how fast to move
  followCamera.maxCameraSpeed = 20 // speed limit

  return followCamera;
}