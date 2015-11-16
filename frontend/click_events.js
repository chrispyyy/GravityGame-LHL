var BABYLON = require('babylonjs');

module.exports = function clickEvent(scene, ship, canvasObjects, camera, canvas){ 

  var isMouseDown = false;
  var eventStarted = null;
  var newBlackhole  = null;
  
  scene.onPointerDown = function (event, pickResult){
    isMouseDown = true;
    eventStarted = Date.now()
    camera.detachControl(canvas, true);

    if (pickResult.hit) {
      var xCoord = pickResult.pickedPoint.x;
      var zCoord = pickResult.pickedPoint.z;
      newBlackhole = new GameObject('canvasObject', 1, 5, scene, xCoord, 1, zCoord);
      canvasObjects.push(newBlackhole);
      window.newBlackhole = newBlackhole;
    }
  };

  scene.onPointerUp = function(event)
  {
    isMouseDown = false;
    newBlackhole = null;
    camera.attachControl(canvas, true);
  }

  scene.registerBeforeRender(function()
  {  

    if (ship.canvasObject.intersectsPoint(canvasObjects[0].canvasObject.position, true)) {
      ship.material.emissiveColor = new BABYLON.Color3(0, 1, 0);
    }

    for(var i = 1; i < canvasObjects.length; i ++){
      if (ship.canvasObject.intersectsPoint(canvasObjects[i].canvasObject.position, true)) {
      ship.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
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