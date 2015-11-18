var BABYLON = require('babylonjs');

module.exports = function(scene, object){

  asteroidMaterial = new BABYLON.StandardMaterial("asteroid_texture", scene);

  asteroidMaterial.diffuseTexture = new BABYLON.Texture(require("./public/images/asteroid.jpg"), scene);
  asteroidMaterial.emissiveTexture = new BABYLON.Texture(require("./public/images/asteroid.jpg"), scene);
  asteroidMaterial.specularTexture = new BABYLON.Texture(require("./public/images/asteroid.jpg"), scene);
  object.canvasObject.material = asteroidMaterial;
  var animateAsts = new BABYLON.Animation("ast-an", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

  var keys = []

  keys.push({
    frame: 0,
    value: 0
  });  

  keys.push({
    frame: 30,
    value: 2
  });  

  keys.push({
    frame: 60,
    value: 4
  });  

  keys.push({
    frame: 120,
    value: 8
  });

  animateAsts.setKeys(keys);
  object.canvasObject.animations.push(animateAsts);
  scene.beginAnimation(object.canvasObject, 0, 120, true);

  return object;
}