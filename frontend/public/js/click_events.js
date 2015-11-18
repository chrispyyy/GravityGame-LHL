var BABYLON = require('babylonjs');
var blackholeMaterial = require('./blackhole_material.js');
var frameRenderer = require('./frame_renderer.js')
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
      newBlackhole = blackholeMaterial(scene, newBlackhole)
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

  frameRenderer.renderFrame(scene, ship, canvasObjects, isMouseDown, newBlackhole, eventStarted)
}