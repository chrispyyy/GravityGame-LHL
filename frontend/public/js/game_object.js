var BABYLON = require('babylonjs');

function GameObject (name, size, mass, scene, x, y, z)
{
  this.canvasObject = BABYLON.Mesh.CreateSphere(name, 24, size, scene);
  this.material = this.canvasObject.material = new BABYLON.StandardMaterial(name, scene);
  this.mass = mass;
  this.size = size;
  this.position = this.canvasObject.position = new BABYLON.Vector3(x, y, z);
}

// GameObject.prototype.calculateForce = function calculateForce(magnetObject)
// {
//   var distanceVector = magnetObject.position.subtract(this.position);

//   var magnitude = distanceVector.length();
//   if (magnitude < 20) {
//     magnitude = 20;
//   } else if (magnitude > 100) {
//     magnitude = 100;
//   }

//   var forceDirection = distanceVector.normalize();

//   var strength = (10 * this.mass * magnetObject.mass)/(magnitude * magnitude);

//   var gForce = forceDirection.scale(strength);

//   return gForce;
// };

// GameObject.prototype.applyForce = function(obj)
// {
//   var force = this.calculateForce(obj);
//   this.canvasObject.position.addInPlace(force);
// };

module.exports = GameObject;
