var BABYLON = require('babylonjs');
var blackholeMaterial = require('./blackhole_material.js');
var PubSub = require('pubsub-js');

module.exports.clickEvent = function(scene, ship, canvasObjects, camera, canvas){ 

  var isMouseDown = false;
  var eventStarted = null;
  var newBlackhole  = null;


  function myShip (name, size, mass, scene, x, y, z) {
    var bodyMaterial = new BABYLON.StandardMaterial("normal", scene);
    var wingMaterial = new BABYLON.StandardMaterial("normal", scene);
    wingMaterial.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    bodyMaterial.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    var leftWing = BABYLON.Mesh.CreateCylinder("leftWing", 7, 0.1, 1, 12, false, scene);
    leftWing.position = new BABYLON.Vector3(x - 6, y, z- 3);
    leftWing.material = wingMaterial;
    var leftWing2 = BABYLON.Mesh.CreateCylinder("leftWing2", 7, 0.1, 1, 12, false, scene);
    leftWing2.position = new BABYLON.Vector3(x - 6, y, z +3);
    leftWing2.material = wingMaterial;
    var rightWing = BABYLON.Mesh.CreateCylinder("rightWing", 7, 0.1, 1, 12, false, scene);
    rightWing.position = new BABYLON.Vector3(x + 6, y, z - 3);
    rightWing.material = wingMaterial;
    var rightWing2 = BABYLON.Mesh.CreateCylinder("rightWing2", 7, 0.1, 1, 12, false, scene);
    rightWing2.position = new BABYLON.Vector3(x + 6, y, z+3);
    rightWing2.material = wingMaterial;
    var wing1 = BABYLON.Mesh.CreateLines("lines", [
      new BABYLON.Vector3(x + 6, y - 2, z - 3),
      new BABYLON.Vector3(x - 6, y - 2, z + 3),
      new BABYLON.Vector3(x - 6, y - 1.5, z + 3),
      new BABYLON.Vector3(x + 6, y - 1.5, z - 3),
      new BABYLON.Vector3(x + 6, y - 1, z - 3),
      new BABYLON.Vector3(x - 6, y - 1, z + 3),
      new BABYLON.Vector3(x - 6, y - 0.5, z + 3),
      new BABYLON.Vector3(x + 6, y - 0.5, z - 3),
      new BABYLON.Vector3(x + 6, y, z - 3),
      new BABYLON.Vector3(x - 6, y, z + 3),
      new BABYLON.Vector3(x - 6, y + 0.5, z + 3),
      new BABYLON.Vector3(x + 6, y + 0.5, z - 3),
      new BABYLON.Vector3(x + 6, y +1, z - 3),
      new BABYLON.Vector3(x - 6, y+1, z + 3),
      new BABYLON.Vector3(x - 6, y+1.5, z + 3),
      new BABYLON.Vector3(x + 6, y+1.5, z - 3),
      new BABYLON.Vector3(x + 6, y+2, z - 3),
      new BABYLON.Vector3(x - 6, y + 2, z + 3)
    ], scene);
    wing1.color = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    var wing2 = BABYLON.Mesh.CreateLines("lines2", [
      new BABYLON.Vector3(x - 6, y -2, z - 3),
      new BABYLON.Vector3(x + 6, y-2, z + 3),
      new BABYLON.Vector3(x + 6, y-1.5, z + 3),
      new BABYLON.Vector3(x - 6, y-1.5, z - 3),
      new BABYLON.Vector3(x - 6, y-1, z - 3),
      new BABYLON.Vector3(x + 6, y-1, z + 3),
      new BABYLON.Vector3(x + 6, y-0.5, z + 3),
      new BABYLON.Vector3(x - 6, y-0.5, z - 3),
      new BABYLON.Vector3(x - 6, y, z - 3),
      new BABYLON.Vector3(x + 6, y, z + 3),
      new BABYLON.Vector3(x + 6, y+0.5, z + 3),
      new BABYLON.Vector3(x - 6, y+0.5, z - 3),
      new BABYLON.Vector3(x - 6, y+1, z - 3),
      new BABYLON.Vector3(x + 6, y+1, z + 3),
      new BABYLON.Vector3(x + 6, y+1.5, z + 3),
      new BABYLON.Vector3(x - 6, y+1.5, z - 3),
      new BABYLON.Vector3(x - 6, y+2, z - 3),
      new BABYLON.Vector3(x + 6, y+2, z + 3)
    ], scene);
    wing2.color = new BABYLON.Color3(Math.random(), Math.random(), Math.random());;
    var shipBody = new BABYLON.Mesh.CreateCylinder("body", 12, 0.1, 3, 6, true, scene);
    shipBody.position = new BABYLON.Vector3(x, y + 3, z);
    shipBody.material = bodyMaterial;
  }

  myShip("ship", 4, 0, scene, ship.canvasObject.position.x, ship.canvasObject.position.y, ship.canvasObject.position.z);

    // BABYLON.SceneLoader.ImportMesh("", '../public/images/spaceship/', 'spaceship.babylon', scene, function(newMeshes) {
    //   var m = newMeshes[1];
    //   m.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    //   m.position = ship.canvasObject.position;
    // });

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



  scene.registerBeforeRender(function()
  {  
    if (ship.canvasObject.intersectsPoint(canvasObjects[0].canvasObject.position, true)) {
      ship.material.emissiveColor = new BABYLON.Color3(0, 1, 0);
      PubSub.publish('COLLISION EVENT', 'collided')
      
    }

    for(var i = 1; i < canvasObjects.length; i ++){
      if (ship.canvasObject.intersectsPoint(canvasObjects[i].canvasObject.position, true)) {
        ship.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
        PubSub.publish('COLLISION EVENT', 'collided with other stuffs')
      }
    }

    var forces = new BABYLON.Vector3(0, 0, 0);
    canvasObjects.forEach(function(canvasObject){
      forces = forces.add(ship.calculateForce(canvasObject));
    });
    ship.position.addInPlace(forces);
    if(isMouseDown)
    {
      if(newBlackhole)
      {
        var delta = Date.now() - eventStarted;
        newBlackhole.canvasObject.scaling.addInPlace(new BABYLON.Vector3(.05,.05,.05));
        newBlackhole.mass = newBlackhole.mass + (delta/10000);
      }
    }
  });
}