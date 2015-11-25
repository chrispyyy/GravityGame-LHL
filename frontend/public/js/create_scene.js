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
  var canvasObjects = levelObject.canvasObjects(scene);

  var ship = levelObject.ship(scene);
  var planet = canvasObjects[0];

  scene.registerBeforeRender(function()
  {
    ship.orientTowards(planet);
  })

  var followCamera = generateFollowCamera(scene, canvas, ship);


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

  skybox.rotation = new BABYLON.Vector3(2,0,0);
  var animateSkyBox = new BABYLON.Animation("animateSkyBox", "rotation.z", 10, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

  var keys = []

  keys.push({
    frame: 0,
    value: 0
  });  

  keys.push({
    frame: 1000,
    value: 4
  });

  animateSkyBox.setKeys(keys);
  skybox.animations.push(animateSkyBox);
  scene.beginAnimation(skybox, 0, 30, true);


  // scene.debugLayer.show(false);
  // scene.debugLayer.axisRatio = 0.1;
  // scene.debugLayer.shouldDisplayAxis = function(mesh)
  // {
  //   // console.log(mesh);
  //   return mesh.name === "ship";
  // }


  return scene;
}

