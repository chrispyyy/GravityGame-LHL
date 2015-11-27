var BABYLON = require('babylonjs');
var planetTexture = require('./planet_texture.js');
var asteroidTexture = require('./asteroid_texture.js');

module.exports.ship = function(scene){
  var spaceship = new Ship('ship', 2, .5, scene, -80, 1, 0, new BABYLON.Vector3(0.001, 0, 0));
  return spaceship;
}

module.exports.canvasObjects = function(scene){
  var canvasObjects = [];

  canvasObjects[0] = new GameObject('planet', 12, 30, scene, 80, 1, 0);
  

  canvasObjects[0] = planetTexture(scene, canvasObjects[0], "./public/images/beachball.jpg", null);

  for (var i = 1; i < 25; i++) {
    canvasObjects[i] = new GameObject('asteroid', 4, 0.05, scene, -20 - Math.random() * 20, 1, 50 - Math.random() * 100 );
    canvasObjects[i] = asteroidTexture(scene, canvasObjects[i]);
  }

  for (var i = 25; i < 50; i++) {
    canvasObjects[i] = new GameObject('asteroid', 4, 0.05, scene, Math.random() * 20 + 20, 1, 50 - Math.random() * 100 );
    canvasObjects[i] = asteroidTexture(scene, canvasObjects[i]);
  }

  return canvasObjects
}

module.exports.skybox = function(scene) {
  var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./public/images/TropicalSunnyDay", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;
  return skybox;
}

module.exports.image = 'public/images/levels/level_9.png'