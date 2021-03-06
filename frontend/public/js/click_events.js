var BABYLON = require('babylonjs');
var blackholeMaterial = require('./blackhole_material.js');
var PubSub = require('pubsub-js');
var generateExplosion = require('./create_explosions.js');

module.exports.clickEvent = function(scene, ship, canvasObjects, camera, followCamera, canvas, engine){ 

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
      newBlackhole = blackholeMaterial(scene, new GameObject('blackhole', 1, 5, scene, xCoord, 1, zCoord));
      canvasObjects.push(newBlackhole);
    }
  };

  scene.onPointerUp = function(event)
  {
    if(!running) { return; }
    isMouseDown = false;
    newBlackhole = null;
    camera.attachControl(canvas, true);
  }

  //var snd = new BABYLON.Sound("Music", "./public/sounds/shortinterstellar.mp3", scene, null, { loop: false, autoplay: true });
  
  scene.registerBeforeRender(function()
  {
    if(!running) { return; }

    var cameraSubscriber = function(msg, data){
      if (data == 'tracker') {
        scene.activeCamera = followCamera;
      }
      else if (data == 'static') {
        scene.activeCamera = camera;
      }
    }

    var token = PubSub.subscribe('CAMERA BUTTON', cameraSubscriber);

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
          snd.pause();
          ship.magnitude = 0;
          var winGame = new BABYLON.Sound("Music", "./public/sounds/winning.mp3", scene, null, { loop: false, autoplay: true });
          payload = "collided";
          color = new BABYLON.Color3(0,1,0);
        }
        else if (obj.canvasObject.name === "asteroid")
        {
          // PubSub.publish("collision:asteroid", { target: obj });
          snd.pause();
          //backgroundmusic.stop();
          ship.magnitude = 0;
          var explosion = new BABYLON.Sound("Music", "./public/sounds/explosion.mp3", scene, null, { loop: false, autoplay: true });
          generateExplosion(scene, ship.canvasObject);
          payload = "collided with other stuffs";
          color = new BABYLON.Color3(1,0,0);
        }
        else if (obj.canvasObject.name === "blackhole")
        {
          // PubSub.publish("collision:asteroid", { target: obj });
          snd.pause();
          //backgroundmusic.stop();
          ship.magnitude = 0;
          var spiral = new BABYLON.Sound("Music", "./public/sounds/spiral.mp3", scene, null, { loop: false, autoplay: true });
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