module.exports = function generateLight(scene){

  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(30, 25 , 30), scene);
  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;
  
  return light;
}