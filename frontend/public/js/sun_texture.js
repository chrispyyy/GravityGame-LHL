var BABYLON = require('babylonjs');

module.exports = function(scene, planet){

  sunMaterial = new BABYLON.StandardMaterial("sun_texture", scene);

  sunMaterial.diffuseTexture = new BABYLON.Texture("./public/images/sunmap.jpg", scene);

  //sunMaterial.bumpTexture = new BABYLON.Texture("./public/images/plutonormalmap.png", scene);

  sunMaterial.specularColor = new BABYLON.Color3.Yellow();
  sunMaterial.specularPower = 64;
  sunMaterial.emissiveColor = new BABYLON.Color3.White();
  sunMaterial.ambientColor = new BABYLON.Color3.White();
  sunMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
  sunMaterial.reflectionFresnelParameters.leftColor = BABYLON.Color3.White();
  sunMaterial.reflectionFresnelParameters.rightColor = BABYLON.Color3.Yellow();
  //var sunlight = new BABYLON.HemisphericLight("sunlight", new BABYLON.Vector3(25, 1, 25), scene);

  planet.canvasObject.material = sunMaterial;
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