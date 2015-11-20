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

    canvasObjects[0
    ] = new GameObject('planet', 12, 30, scene, 25, 1, 25);

  canvasObjects[0] = plutoTexture(scene, canvasObjects[0])

  canvasObjects[1] = new GameObject('obstacle', 4, 5, scene, 10, 1, -6);
  canvasObjects[2] = new GameObject('obstacle', 4, 5, scene, 2, 1, 2);
  canvasObjects[3] = new GameObject('obstacle', 4, 5, scene, -6, 1, 10);

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