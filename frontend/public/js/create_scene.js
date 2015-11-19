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
    // BABYLON.SceneLoader.ImportMesh("", "./public/scenes/", "star-wars-x-wing.babylon", scene, function (newMeshes) {
    //     // Set the target of the camera to the first imported mesh
    //     var m = newMeshes[0];
    //     camera.target = m;
    // });


  var ground = generateGround(scene);


  // console.log(ship);

  var ship = new GameObject('ship', 6, .5, scene, -20, 1, -20);
  var shipMaterial = new BABYLON.StandardMaterial("pokeball", scene);
  shipMaterial.emissiveTexture = new BABYLON.Texture("./public/images/pokeball.png", scene);
  shipMaterial.diffuseTexture = new BABYLON.Texture("./public/images/pokeball.png", scene);
  ship.canvasObject.material = shipMaterial;
  var animateShip = new BABYLON.Animation("animateShip", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
  var keys = [];
  keys.push({
    frame:0,
    value:0
  });
  keys.push({
    frame:120,
    value:4
  });
  animateShip.setKeys(keys);
  ship.canvasObject.animations.push(animateShip);
  scene.beginAnimation(ship.canvasObject, 0, 120, true);
  var canvasObjects = [];

  camera.target = ship.position;

  for (var i=0; i<1; i++) {
    canvasObjects[i] = new GameObject('planet', 12, 30, scene, 25, 1, 25);
  }

  canvasObjects[0] = plutoTexture(scene, canvasObjects[0])

  generateParticleTrail(scene, ship.canvasObject);

  clickEvents(scene, ship, canvasObjects, camera, canvas);

    var skybox = BABYLON.Mesh.CreateBox("skyBox", 300, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./public/images/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

  return scene;
}

