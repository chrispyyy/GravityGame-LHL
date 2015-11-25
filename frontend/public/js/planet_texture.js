var BABYLON = require('babylonjs');

module.exports = function(scene, planet, diffusePath, bumpPath){

  planetMaterial = new BABYLON.StandardMaterial("planet_texture", scene);
  planetMaterial.diffuseTexture = new BABYLON.Texture(diffusePath, scene);
  if (bumpPath) { planetMaterial.bumpTexture = new BABYLON.Texture(bumpPath, scene); }
  planetMaterial.specularColor = new BABYLON.Color3(0,0,0);

  planet.canvasObject.material = planetMaterial;
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
  scene.beginAnimation(planet.canvasObject, 0, 50, true);

  return planet
}