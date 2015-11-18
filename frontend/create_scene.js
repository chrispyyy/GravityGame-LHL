var BABYLON = require('babylonjs');
GameObject = require('./game_object.js');
var clickEvents = require('./click_events.js');
var generateStars = require('./stars.js');
var generateGround = require('./ground.js');
var generateCamera = require('./camera.js');
var generateLight = require('./light.js');
var generateParticleTrail = require('./create_particle_trail.js');
var plutoTexture = require('./pluto_texture.js');
var asteroidTex = require('./asteroids.js');

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

  canvasObjects[0] = new GameObject('planet', 12, 30, scene, 25, 1, 25);

  canvasObjects[1] = new GameObject('asteroid', 10, 3, scene, 2, 1, 2);

  canvasObjects[0] = plutoTexture(scene, canvasObjects[0]);

  canvasObjects[1] = asteroidTex(scene, canvasObjects[1]);
  

  generateParticleTrail(scene, ship.canvasObject);

  clickEvents(scene, ship, canvasObjects, camera, canvas);

  var serializedScene = BABYLON.SceneSerializer.Serialize(scene);
  console.log(serializedScene);



  // $.ajax({
  //   type: 'POST',
  //   url: '/levels',
  //   data: JSON.stringify(serializedScene),

  //   contentType: 'application/json; charset=UTF',
  //   success: function(result){
  //     console.log(result);
  //   }
  // });

  return scene;
}
