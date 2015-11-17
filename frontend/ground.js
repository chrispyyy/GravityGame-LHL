var BABYLON = require('babylonjs');

module.exports = function generateGround(scene){

  var ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 0, scene, false);

  groundMaterial =  new BABYLON.StandardMaterial("ground", scene);

  ground.material = groundMaterial;

  groundMaterial.alpha  = 0;

  return ground;
}