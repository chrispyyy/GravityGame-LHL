var BABYLON = require('babylonjs');
var planetTexture = require('./planet_texture.js');
var asteroidTexture = require('./asteroid_texture.js');

module.exports.ship = function(scene){
  var spaceship = new Ship('ship', 2, 1, scene, -40, 1, -30, new BABYLON.Vector3(0.008, 0, 0.008));
  return spaceship;
}

module.exports.canvasObjects = function(scene){
  var canvasObjects = [];

  canvasObjects[0] = new GameObject('planet', 12, 15, scene, 40, 1, 35);
  
  canvasObjects[0] = planetTexture(scene, canvasObjects[0], "./public/images/goldmap.jpg", "./public/images/goldbump.jpg");

  canvasObjects[1] = new GameObject('asteroid', 4, 15, scene, 25, 1, 25);
  canvasObjects[2] = new GameObject('asteroid', 4, 15, scene, 55, 1, 45);
  canvasObjects[3] = new GameObject('asteroid', 4, 2, scene, 10, 1, 10);
  canvasObjects[4] = new GameObject('asteroid', 4, 2, scene, -10, 1, -10);

  
  var animateAsteroids1x = new BABYLON.Animation("animateAsteroids1x", "position.x", 120, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
  var keys1x = [];
  keys1x.push({
    frame: 0,
    value: canvasObjects[1].canvasObject.position.x
  });

  keys1x.push({
    frame: 30,
    value: canvasObjects[1].canvasObject.position.x + 30
  });

  keys1x.push({
    frame: 60,
    value: canvasObjects[1].canvasObject.position.x + 30
  });

  keys1x.push({
    frame: 90,
    value: canvasObjects[1].canvasObject.position.x
  });

  keys1x.push({
    frame: 120,
    value: canvasObjects[1].canvasObject.position.x
  });

  var animateAsteroids1z = new BABYLON.Animation("animateAsteroids1z", "position.z", 120, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
  var keys1z = [];  
  keys1z.push({
    frame: 0,
    value: canvasObjects[1].canvasObject.position.z
  });

  keys1z.push({
    frame: 30,
    value: canvasObjects[1].canvasObject.position.z
  });

  keys1z.push({
    frame: 60,
    value: canvasObjects[1].canvasObject.position.z + 20
  });

  keys1z.push({
    frame: 90,
    value: canvasObjects[1].canvasObject.position.z + 20
  });

  keys1z.push({
    frame: 120,
    value: canvasObjects[1].canvasObject.position.z
  });

    animateAsteroids1x.setKeys(keys1x);
    animateAsteroids1z.setKeys(keys1z);
    canvasObjects[1].canvasObject.animations.push(animateAsteroids1z);
    canvasObjects[1].canvasObject.animations.push(animateAsteroids1x);
    scene.beginAnimation(canvasObjects[1].canvasObject, 0, 120, true);

  var animateAsteroids2x = new BABYLON.Animation("animateAsteroids2x", "position.x", 120, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
  var keys2x = [];
  keys2x.push({
    frame: 0,
    value: canvasObjects[2].canvasObject.position.x
  });

  keys2x.push({
    frame: 30,
    value: canvasObjects[2].canvasObject.position.x - 30
  });

  keys2x.push({
    frame: 60,
    value: canvasObjects[2].canvasObject.position.x - 30
  });

  keys2x.push({
    frame: 90,
    value: canvasObjects[2].canvasObject.position.x
  });

  keys2x.push({
    frame: 120,
    value: canvasObjects[2].canvasObject.position.x
  });

  var animateAsteroids2z = new BABYLON.Animation("animateAsteroids2z", "position.z", 120, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
  var keys2z = [];  
  keys2z.push({
    frame: 0,
    value: canvasObjects[2].canvasObject.position.z
  });

  keys2z.push({
    frame: 30,
    value: canvasObjects[2].canvasObject.position.z
  });

  keys2z.push({
    frame: 60,
    value: canvasObjects[2].canvasObject.position.z - 20
  });

  keys2z.push({
    frame: 90,
    value: canvasObjects[2].canvasObject.position.z - 20
  });

  keys2z.push({
    frame: 120,
    value: canvasObjects[2].canvasObject.position.z
  });

    animateAsteroids2x.setKeys(keys2x);
    animateAsteroids2z.setKeys(keys2z);
    canvasObjects[2].canvasObject.animations.push(animateAsteroids2z);
    canvasObjects[2].canvasObject.animations.push(animateAsteroids2x);
    scene.beginAnimation(canvasObjects[2].canvasObject, 0, 120, true);


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

module.exports.image = 'public/images/levels/level_8.png'