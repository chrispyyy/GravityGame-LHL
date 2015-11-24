var BABYLON = require('babylonjs');
GameObject = require('./game_object.js');
Ship = require('./create_ship.js');
var clickEvents = require('./click_events.js');
var generateGround = require('./ground.js');
var generateCamera = require('./camera.js');
var generateFollowCamera = require('./follow_camera.js');
var generateLight = require('./light.js');
var generateParticleTrail = require('./create_particle_trail.js');

module.exports = function createScene(engine, canvas, levelObject)
{
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  scene.clearColor = BABYLON.Color3.Black();

  var camera = generateCamera(scene, canvas);

  var light = generateLight(scene);

  var ground = generateGround(scene);

  var ship = levelObject.ship(scene);

  var followCamera = generateFollowCamera(scene, canvas, ship);

  var canvasObjects = levelObject.canvasObjects(scene);

  generateParticleTrail(scene, ship.canvasObject);

  clickEvents.clickEvent(scene, ship, canvasObjects, camera, followCamera, canvas, engine);

  var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000, scene);
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

