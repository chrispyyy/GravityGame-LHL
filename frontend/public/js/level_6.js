var BABYLON = require('babylonjs');
var planetTexture = require('./planet_texture.js');
var asteroidTexture = require('./asteroid_texture.js');

module.exports.ship = function(scene){
  var spaceship = new Ship('ship', 2, .5, scene, -75, 1, -30, new BABYLON.Vector3(0.008, 0, 0.008));
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

module.exports.skybox = function(scene) {
  var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./public/images/spacelvl0", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;
  return skybox;
}
module.exports.image = 'public/images/levels/level_6.png'