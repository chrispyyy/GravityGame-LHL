var BABYLON = require('babylonjs');
GameObject = require('./game_object.js');
var clickEvents = require('./click_events.js');
var generateStars = require('./stars.js');
var generateGround = require('./ground.js');
var generateCamera = require('./camera.js');
var generateLight = require('./light.js');
var generateParticleTrail = require('./create_particle_trail.js');

module.exports = function createScene(engine, canvas){
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);
  scene.clearColor = BABYLON.Color3.Black();
  // This creates and positions a free camera (non-mesh)
  var camera = generateCamera(scene, canvas);
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = generateLight(scene);

  var stars = generateStars(scene);

  var ground = generateGround(scene);

  var ship = new GameObject('ship', 2, .5, scene, -20, 1, -20);

  var canvasObjects = [];

  for (var i=0; i<1; i++) {
    canvasObjects[i] = new GameObject('planet', 12, 30, scene, 25, 1, 25);
  }

  var plutoMaterial = new BABYLON.StandardMaterial("pluto_texture", scene);
  plutoMaterial.diffuseTexture = new BABYLON.Texture(require("./public/images/plutomap2k.jpg"), scene);
  plutoMaterial.bumpTexture = new BABYLON.Texture(require("./public/images/plutonormalmap.png"), scene);
  plutoMaterial.specularColor = new BABYLON.Color3(0,0,0);

  canvasObjects[0].canvasObject.material = plutoMaterial;

  generateParticleTrail(scene, ship.canvasObject);

  clickEvents(scene, ship, canvasObjects, camera, canvas);

  return scene;
}

