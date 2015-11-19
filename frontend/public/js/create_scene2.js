var BABYLON = require('babylonjs');
GameObject = require('./game_object.js');
var clickEvents = require('./click_events.js');
var generateStars = require('./stars.js');
var generateGround = require('./ground.js');
var generateCamera = require('./camera.js');
var generateLight = require('./light.js');
var generateParticleTrail = require('./create_particle_trail.js');
var plutoTexture = require('./pluto_texture.js');

module.exports = function createScene(engine, canvas){
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);
  scene.clearColor = BABYLON.Color3.Black();
  // This creates and positions a free camera (non-mesh)
  var camera = generateCamera(scene, canvas);
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = generateLight(scene);

  // var stars = generateStars(scene);

  var ground = generateGround(scene);

  var ship = new GameObject('ship', 2, .5, scene, -20, 1, -20);

  var canvasObjects = [];

  canvasObjects[0] = new GameObject('planet', 12, 30, scene, 25, 1, 25);

  canvasObjects[1] = new GameObject('obstacle', 12, 30, scene, 10, 1, 10);

  canvasObjects[0] = plutoTexture(scene, canvasObjects[0])

  generateParticleTrail(scene, ship.canvasObject);

  clickEvents.clickEvent(scene, ship, canvasObjects, camera, canvas);

    var skybox = BABYLON.Mesh.CreateBox("skyBox", 300, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./public/images/spacelvl0", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

  return scene;
}