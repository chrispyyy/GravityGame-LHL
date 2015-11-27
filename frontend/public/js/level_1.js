var BABYLON = require('babylonjs');
var planetTexture = require('./planet_texture.js');

module.exports.ship = function(scene) {
  var spaceship = new Ship('ship', 2, 1, scene, -60, 1, -30, new BABYLON.Vector3(0.008, 0, 0.008));
  return spaceship;
}

module.exports.canvasObjects = function(scene) {
  return [
    planetTexture(scene, new GameObject('planet', 12, 40, scene, 60, 1, 30), "./public/images/plutomap2k.jpg", "./public/images/plutonormalmap.png")
  ];
}

module.exports.image = 'public/images/levels/level_1.png'

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