var BABYLON = require('babylonjs');

function GameObject (name, size, mass, scene, x, y, z)
{
  this.canvasObject = BABYLON.Mesh.CreateSphere(name, 24, size, scene);
  this.material = this.canvasObject.material = new BABYLON.StandardMaterial(name, scene);
  this.mass = mass;
  this.size = size;
  this.position = this.canvasObject.position = new BABYLON.Vector3(x, y, z);
}

module.exports = GameObject;
