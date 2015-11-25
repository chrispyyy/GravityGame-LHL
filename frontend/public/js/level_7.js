var BABYLON = require('babylonjs');
var planetTexture = require('./planet_texture.js');
var asteroidTexture = require('./asteroid_texture.js');

module.exports.ship = function(scene){
  var spaceship = new Ship('ship', 2, .5, scene, -70, 1, -30, new BABYLON.Vector3(0.008, 0, 0.008));
  return spaceship;
}

module.exports.canvasObjects = function(scene){
  var canvasObjects = [];

  canvasObjects[0] = new GameObject('planet', 12, 30, scene, 60, 1, 30);
  

  // canvasObjects[0] = planetTexture(scene, canvasObjects[0]);

  canvasObjects[1] = new GameObject('asteroid', 4, 5, scene, -50, 1, 0);
  canvasObjects[2] = new GameObject('asteroid', 4, 5, scene, 40, 1, -10)
  canvasObjects[3] = new GameObject('asteroid', 4, 5, scene, 30, 1, 42);
  canvasObjects[4] = new GameObject('asteroid', 4, 5, scene, -35, 1, -30);
  canvasObjects[5] = new GameObject('asteroid', 4, 5, scene, 18, 1, -20);
  canvasObjects[6] = new GameObject('asteroid', 4, 5, scene, -18, 1, 22);
  canvasObjects[7] = new GameObject('asteroid', 4, 5, scene, 0, 1, 10);
  canvasObjects[8] = new GameObject('asteroid', 4, 5, scene, 4, 1, 4);

  for (var i = 1; i < canvasObjects.length; i++) {
    canvasObjects[i] = asteroidTexture(scene, canvasObjects[i]);
  
    var animateAsteroidsX = new BABYLON.Animation("animateAsteroids", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    var keys = []
    keys.push({
      frame: 0,
      value: canvasObjects[i].canvasObject.position.x
    });  
    keys.push({
      frame: 60,
      value: canvasObjects[i].canvasObject.position.x + (Math.random() * 30 + 15)
    });
    keys.push({
      frame: 120,
      value: canvasObjects[i].canvasObject.position.x
    });

    var animateAsteroidsZ = new BABYLON.Animation("animateAsteroidsZ", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    var zKeys = []
    zKeys.push({
      frame: 0,
      value: canvasObjects[i].canvasObject.position.z
    });  
    zKeys.push({
      frame: 30,
      value: canvasObjects[i].canvasObject.position.z + (Math.random() * 10 + 15)
    });
    zKeys.push({
      frame: 60,
      value: canvasObjects[i].canvasObject.position.z
    });

    animateAsteroidsX.setKeys(keys);
    animateAsteroidsZ.setKeys(zKeys);
    canvasObjects[i].canvasObject.animations.push(animateAsteroidsX);
    canvasObjects[i].canvasObject.animations.push(animateAsteroidsZ);
    scene.beginAnimation(canvasObjects[i].canvasObject, 0, 120, true);
  }

  return canvasObjects
}

module.exports.image = 'public/images/levels/level_7.png'