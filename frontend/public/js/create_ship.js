var BABYLON = require('babylonjs');
 
function Ship (name, size, mass, scene, x, y, z, acc){

  var blankmesh = new BABYLON.Mesh("blank", scene);

  var positions = [
    -2, -1, -1,    
    -2, -1, 1, 
    2, -1, -1, 
    2, -1, 1,  
    -2, 1, -1, 
    2, 1, -1,  
    2, 1, 1,   
    -2, 1, 1,  
    -1, 0.5, 1,
    1, 0.5, 1,
    -1, -0.5, 1,
    1, -0.5, 1,
    -1, 0.5, -1,
    1, 0.5, -1,
    -1, -0.5, -1,
    1, -0.5, -1,
    -2.33, -1.33, -1, 
    -2.33, 1.33, -1,
    -2.33, -1, -1,
    -2.33, 1, -1,
    -2, -1.33, -1,
    -2, 1.33, -1,
    2.33, 1.33, -1,
    2.33, 1, -1,
    2, 1.33, -1,
    2.33, -1.33, -1,
    2.33, -1, -1,
    2, -1.33, -1,
    -2, -1, 4,
    -2, 1, 4,
    2, -1, 4,
    2, 1, 4,
  ];

  var indices = [];

  indices.push(15, 13, 12);
  indices.push(15, 12, 14);
  indices.push(14, 12, 8);
  indices.push(14, 8, 10);
  indices.push(8, 12, 13);
  indices.push(13, 9, 8);
  indices.push(10, 8, 9);
  indices.push(10, 9, 11);
  indices.push(11, 9, 13);
  indices.push(11, 13, 15);
  indices.push(11, 15, 14);
  indices.push(11, 14, 10);
  indices.push(1, 0, 5);
  indices.push(1, 5, 6);
  indices.push(3, 7, 4);
  indices.push(3, 4, 2);
  indices.push(4, 21, 17);
  indices.push(4, 17, 19);
  indices.push(23, 22, 24);
  indices.push(23, 24, 5);
  indices.push(20, 0, 18);
  indices.push(20, 18, 16);
  indices.push(25, 26, 2);
  indices.push(25, 2, 27);
  indices.push(4, 21, 29);
  indices.push(4, 19, 29);
  indices.push(19, 17, 29);
  indices.push(21, 29, 17);
  indices.push(5, 24, 31);
  indices.push(23, 31, 5);
  indices.push(23, 5, 22);
  indices.push(24, 22, 31); 
  indices.push(20, 28, 16);
  indices.push(0, 28, 20);
  indices.push(0, 28, 18);
  indices.push(16, 18, 28);
  indices.push(25, 30, 26);
  indices.push(26, 30, 2);
  indices.push(27, 2, 30);
  indices.push(25, 30, 27);
   
  var normals = [
    1, 1, 1,  
    1, 1, 1,  
    1, 1, 1,  
    1, 1, 1,  
    1, 1, 1,  
    1, 1, 1,  
    1, 1, 1,  
    1, 1, 1,  
    1, 1, 1,
    1, 1, 1, 
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
  ];

    // colors per vertex
  var colors = [
    1, 1, 1,     
    1, 1, 1,     
    1, 1, 1,     
    1, 1, 1,     
    1, 1, 1,     
    1, 1, 1,     
    1, 1, 1,     
    1, 1, 1,     
    1, 1, 1, 
    1, 1, 1, 
    1, 1, 1, 
    1, 1, 1, 
    1, 1, 1, 
    1, 1, 1, 
    1, 1, 1, 
    1, 1, 1, 
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
  ];

  var uvs = [
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0,
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0,
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0,
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0,
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0,
  ];

  var uv2s = [
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0,       
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0,
    1.0, 0.0,
    1.0, 0.0,
    1.0, 0.0,
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0,
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0,
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0,
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0, 
    1.0, 0.0,
  ];

  var vertexData = new BABYLON.VertexData();

  vertexData.positions = positions;
  vertexData.indices = indices;
  vertexData.normals = normals;

  vertexData.applyToMesh(blankmesh, 1);
  this.canvasObject = blankmesh;
  this.material = this.canvasObject.material = new BABYLON.StandardMaterial(name, scene);
  this.canvasObject.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
  this.mass = mass; 
  this.size = size;
  this.position = this.canvasObject.position = new BABYLON.Vector3(x, y, z);
  this.acceleration = acc;
}
Ship.prototype.calculateForce = function calculateForce(magnetObject)
{
  var distanceVector = magnetObject.position.subtract(this.position);

  var magnitude = distanceVector.length();
  if (magnitude < 20) {
    magnitude = 20;
  } else if (magnitude > 100) {
    magnitude = 100;
  }

  var forceDirection = distanceVector.normalize();
  this.canvasObject.rotation = forceDirection;

  var strength = (10 * this.mass * magnetObject.mass)/(magnitude * magnitude);

  var gForce = forceDirection.scale(strength);

  return gForce;
};

Ship.prototype.applyForce = function(obj)
{
  var force = this.calculateForce(obj);
  this.canvasObject.position.addInPlace(this.acceleration);
  this.canvasObject.position.addInPlace(force);

};

module.exports = Ship;


