var BABYLON = require('babylonjs');

module.exports = function(scene, planet){

  jupiterMaterial = new BABYLON.StandardMaterial("jupiter_texture", scene);

  jupiterMaterial.diffuseTexture = new BABYLON.Texture("./public/images/jupitermap.jpg", scene);

  jupiterMaterial.specularColor = new BABYLON.Color3(0,0,0);

  planet.canvasObject.material = jupiterMaterial;
  planet.canvasObject.rotation = new BABYLON.Vector3(2,2,0);
  var animatePlanet = new BABYLON.Animation("animatePlanet", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

  var keys = []

  keys.push({
    frame: 0,
    value: 0
  });  

  keys.push({
    frame: 120,
    value: 4
  });

  animatePlanet.setKeys(keys);
  planet.canvasObject.animations.push(animatePlanet);
  scene.beginAnimation(planet.canvasObject, 0, 120, true);

  return planet
}