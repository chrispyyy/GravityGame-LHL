var BABYLON = require('babylonjs');

module.exports = function GameObject (name, size, mass, scene, x, y, z){

  this.canvasObject = BABYLON.Mesh.CreateSphere(name, 16, size, scene);

  // this.material = this.canvasObject.material = new BABYLON.StandardMaterial(name, scene);

  this.mass = mass; 

  this.size = size;

  this.position = this.canvasObject.position = new BABYLON.Vector3(x, y, z);

  var plutoMaterial = new BABYLON.StandardMaterial("pluto_texture", scene);
  plutoMaterial.diffuseTexture = new BABYLON.Texture(require("./public/images/plutomap2k.jpg"), scene);
  plutoMaterial.bumpTexture = new BABYLON.Texture(require("./public/images/plutonormalmap.png"), scene);
  plutoMaterial.specularColor = new BABYLON.Color3(0,0,0);

   this.material = plutoMaterial;

  this.calculateForce = function(magnetObject){

    var distanceVector = magnetObject.position.subtract(this.position);

    var magnitude = distanceVector.length();
    if (magnitude < 20) {
      magnitude = 20;
    } else if (magnitude > 100) {
      magnitude = 100;
    }

    // if (magnitude < 1) {
    //   // return alert("GAME OVER");
    //   console.info("Game Over")
    // }
    var forceDirection = distanceVector.normalize();

    var strength = (10 * this.mass * magnetObject.mass)/(magnitude * magnitude);

    var gForce = forceDirection.scale(strength);
 
    return gForce;
  }
}
