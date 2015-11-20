var BABYLON = require('babylonjs');
 
  
module.exports = function createShip (name, size, mass, scene, x, y, z){

  this.canvasObject = new BABYLON.Mesh.CreateSphere("body", 0, size, scene);

  this.material = this.canvasObject.material = new BABYLON.StandardMaterial(name, scene);
  this.canvasObject.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
  this.mass = mass; 
  this.size = size;
  this.position = this.canvasObject.position = new BABYLON.Vector3(x, y, z);

  this.calculateForce = function(magnetObject){

    var distanceVector = magnetObject.position.subtract(this.position);

    var magnitude = distanceVector.length();
    if (magnitude < 20) {
      magnitude = 20;
    } else if (magnitude > 100) {
      magnitude = 100;
    }

    var forceDirection = distanceVector.normalize();
    var strength = (10 * this.mass * magnetObject.mass)/(magnitude * magnitude);

    var gForce = forceDirection.scale(strength);
 
    return gForce;
  }
}
