var BABYLON = require('babylonjs');
var blackholeMaterial = require('./blackhole_material.js');
var PubSub = require('pubsub-js');

module.exports.clickEvent = function(scene, ship, canvasObjects, camera, canvas, engine){ 

  var isMouseDown = false;
  var eventStarted = null;
  var newBlackhole = null;

  var running = true;

  scene.onPointerDown = function (event, pickResult)
  {
    if(!running) { return; }
    isMouseDown = true;
    eventStarted = Date.now()
    camera.detachControl(canvas, true);

    if (pickResult.hit) {
      var xCoord = pickResult.pickedPoint.x;
      var zCoord = pickResult.pickedPoint.z;
      newBlackhole = blackholeMaterial(scene, new GameObject('canvasObject', 1, 5, scene, xCoord, 1, zCoord));
      canvasObjects.push(newBlackhole);
      // window.newBlackhole = newBlackhole;
    }
  };

  scene.onPointerUp = function(event)
  {
    if(!running) { return; }
    isMouseDown = false;
    newBlackhole = null;
    camera.attachControl(canvas, true);
  }

  scene.registerBeforeRender(function()
  {
    if(!running) { return; }

    //Collision Detection

    canvasObjects.forEach(function(obj)
    {
      ship.applyForce(obj);

      if(ship.canvasObject.intersectsPoint(obj.canvasObject.position, true))
      {
        running = false;
        var payload = "";
        var color;
        if(obj.canvasObject.name === "planet")
        {
          // PubSub.publish("collision:planet", { target: obj });
          payload = "collided";
          color = new BABYLON.Color3(0,1,0);
        }
        else
        {
          // PubSub.publish("collision:asteroid", { target: obj });
          payload = "collided with other stuffs";
          color = new BABYLON.Color3(1,0,0);
        }
        ship.material.emissiveColor = color;
        PubSub.publish('COLLISION EVENT', payload);
      }
    });

    if(isMouseDown && newBlackhole)
    {
      var delta = Date.now() - eventStarted;
      newBlackhole.canvasObject.scaling.addInPlace(new BABYLON.Vector3(.05,.05,.05));
      newBlackhole.mass = newBlackhole.mass + (delta/10000);
    }
  });
}