var BABYLON = require('babylonjs');

module.exports = function(scene, planet){

  faceMaterial = new BABYLON.StandardMaterial("face_texture", scene);

  faceMaterial.diffuseTexture = new BABYLON.Texture("./public/images/green.jpg", scene);

  faceMaterial.bumpTexture = new BABYLON.Texture("./public/images/icebump.png", scene);

  faceMaterial.specularColor = new BABYLON.Color3(0,0,0);

  planet.canvasObject.material = faceMaterial;
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