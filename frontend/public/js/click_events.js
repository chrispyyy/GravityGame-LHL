var BABYLON = require('babylonjs');
var blackholeMaterial = require('./blackhole_material.js');
var PubSub = require('pubsub-js');
var generateExplosion = require('./create_explosions.js');

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

  var spaceShip = new BABYLON.Sound("Music", "./public/sounds/shortinterstellar.mp3", scene, null, { loop: true, autoplay: true });
  
  var cameraTracker = false
  
  scene.registerBeforeRender(function()
  {
    if(!running) { return; }

    var cameraSubscriber = function(msg, data){
      if (data == 'tracker') {
        cameraTracker = true;
      }
    }

    if(cameraTracker){
      camera.setTarget(ship.canvasObject.position);
    }

    var token = PubSub.subscribe('CAMERA EVENT', cameraSubscriber);

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
          spaceShip.stop();
          ship.magnitude = 0;
          var winGame = new BABYLON.Sound("Music", "./public/sounds/winning.mp3", scene, null, { loop: false, autoplay: true });
          payload = "collided";
          color = new BABYLON.Color3(0,1,0);
        }
        else if (obj.canvasObject.name === "asteroid")
        {
          // PubSub.publish("collision:asteroid", { target: obj });
          spaceShip.stop();
          //backgroundmusic.stop();
          ship.magnitude = 0;
          var explosion = new BABYLON.Sound("Music", "./public/sounds/explosion.mp3", scene, null, { loop: false, autoplay: true });
          generateExplosion(scene, ship.canvasObject);
          payload = "collided with other stuffs";
          color = new BABYLON.Color3(1,0,0);
        }
        else if (obj.canvasObject.name === "canvasObject")
        {
          // PubSub.publish("collision:asteroid", { target: obj });
          spaceShip.stop();
          //backgroundmusic.stop();
          ship.magnitude = 0;
          var spiral = new BABYLON.Sound("Music", "./public/sounds/spiral.wav", scene, null, { loop: false, autoplay: true });
          generateExplosion(scene, ship.canvasObject);
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