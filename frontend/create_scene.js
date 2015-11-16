clickEvents = require('./click_events.js');
generateStars = require('./stars.js');
generateGround = require('./ground.js');
generateCamera = require('./camera.js');
generateLight = require('./light.js');

module.exports = function createScene(engine, canvas){
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);
  // This creates and positions a free camera (non-mesh)
  var camera = generateCamera(scene, canvas);
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = generateLight(scene);

  var stars = generateStars(scene);

  var ground = generateGround(scene);

  var ship = new GameObject('ship', 2, .5, scene, -20, 1, -20);

  var canvasObjects = [];

  for (var i=0; i<1; i++) {
    canvasObjects[i] = new GameObject('planet', 6, 30, scene, 25, 1, 25);
  }


  clickEvents(scene, ship, canvasObjects)

  return scene;
}

