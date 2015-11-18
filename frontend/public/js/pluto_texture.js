var BABYLON = require('babylonjs');

module.exports = function(scene, planet){

  plutoMaterial = new BABYLON.StandardMaterial("pluto_texture", scene);

  plutoMaterial.diffuseTexture = new BABYLON.Texture("./public/images/plutomap2k.jpg", scene);

  plutoMaterial.bumpTexture = new BABYLON.Texture("./public/images/plutonormalmap.png", scene);

  plutoMaterial.specularColor = new BABYLON.Color3(0,0,0);

  planet.canvasObject.material = plutoMaterial;

  return planet
}