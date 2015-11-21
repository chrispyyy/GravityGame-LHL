var BABYLON = require('babylonjs');

module.exports = function(scene, blackHole) {
    
  material = new BABYLON.StandardMaterial("black", scene);
  material.diffuseColor = new BABYLON.Color3(0, 0, 0);
  material.reflectionTexture = new BABYLON.CubeTexture("./public/images/spacelvl0", scene);
  material.reflectionTexture.level = 1;

  // material.reflectionTexture = new BABYLON.MirrorTexture("mirror", 512, scene, true);
  // material.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -10.0);
  // material.reflectionTexture.renderList = canvasObjects;

  material.specularPower = 600;
  material.emissiveColor = new BABYLON.Color3(0.05, 0.05, 0.05);
  
  material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
  material.emissiveFresnelParameters.bias = 0.4;
  material.emissiveFresnelParameters.power = 2;
  material.emissiveFresnelParameters.leftColor = BABYLON.Color3.Black();
  material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

  blackHole.canvasObject.material = material
  blackHole.canvasObject.rotation = new BABYLON.Vector3(2,0,0);
  var animateBlackHole = new BABYLON.Animation("animateBlackHole", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

  var keys = []

  keys.push({
    frame: 0,
    value: 0
  });  

  keys.push({
    frame: 50,
    value: 4
  });

  animateBlackHole.setKeys(keys);
  blackHole.canvasObject.animations.push(animateBlackHole);
  scene.beginAnimation(blackHole.canvasObject, 0, 30, true);

  return blackHole
}