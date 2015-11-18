var BABYLON = require('babylonjs');

module.exports.renderFrame = function(scene, ship, canvasObjects, isMouseDown, newBlackhole, eventStarted){

scene.registerBeforeRender(function()
  {  
    
    if (ship.canvasObject.intersectsPoint(canvasObjects[0].canvasObject.position, true)) {
      ship.material.emissiveColor = new BABYLON.Color3(0, 1, 0);
      console.log('yay')
    }

    for(var i = 1; i < canvasObjects.length; i ++){
      if (ship.canvasObject.intersectsPoint(canvasObjects[i].canvasObject.position, true)) {
      ship.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
      console.log('sheet')
      }
    }

    var forces = new BABYLON.Vector3(0, 0, 0);
    canvasObjects.forEach(function(canvasObject){
      forces = forces.add(ship.calculateForce(canvasObject));
    });
    ship.position.addInPlace(forces);
    if(isMouseDown)
    {
      if(newBlackhole)
      {
        var delta = Date.now() - eventStarted;
        newBlackhole.canvasObject.scaling.addInPlace(new BABYLON.Vector3(.05,.05,.05));
        newBlackhole.mass = newBlackhole.mass + (delta/10000);
        console.log(newBlackhole.mass);
      }
    }
  });
}