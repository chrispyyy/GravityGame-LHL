function GameObject (name, size, mass, scene, x, y, z){

  this.canvasObject = BABYLON.Mesh.CreateSphere(name, 16, size, scene);

  this.mass = mass; 

  this.position = this.canvasObject.position = new BABYLON.Vector3(x, y, z);

  this.calculateForce = function(magnetObject){

    var distanceVector = magnetObject.position.subtract(this.position);

    var magnitude = distanceVector.length();

    var forceDirection = distanceVector.normalize();

    var strength = (10 * this.mass * magnetObject.mass)/(magnitude * magnitude);

    var gForce = forceDirection.scale(strength);
 
    return gForce;
  }
}
