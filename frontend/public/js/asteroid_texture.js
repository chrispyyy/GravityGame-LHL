var BABYLON = require('babylonjs');

module.exports = function(scene, asteroid){

  asteroidMaterial = new BABYLON.StandardMaterial("asteroid_texture", scene);
 
  asteroidMaterial.specularColor = new BABYLON.Color3(0,0,0);
  
// ==================

// The size of the asteroid
var sizeBranch = 5;

    // The color of the asteroid using the randomColor library
var branchColor = randomColor({hue: 'yellow', luminosity: 'light', format: 'rgbArray'});
asteroidMaterial = new BABYLON.StandardMaterial("mat", scene);
asteroidMaterial.diffuseColor = BABYLON.Color3.FromInts(branchColor[0],branchColor[1],branchColor[2]);
asteroidMaterial.diffuseTexture = new BABYLON.Texture("./public/images/asteroidbump.jpg", scene);
asteroidMaterial.specularColor = new BABYLON.Color3(0,0,0);

// Sphere shape creation
var vertexData = BABYLON.VertexData.CreateSphere(1,sizeBranch);
// Apply the shape to our asteroid
vertexData.applyToMesh(asteroid.canvasObject, false);

var positions = asteroid.canvasObject.getVerticesData(BABYLON.VertexBuffer.PositionKind);
var numberOfPoints = positions.length/3;

// Build a map containing all vertices at the same position
var map = [];
for (var i=0; i<numberOfPoints; i++) {
    var p = new BABYLON.Vector3(positions[i*3], positions[i*3+1], positions[i*3+2]);

    var found = false;
    for (var index=0; index<map.length&&!found; index++) {
        var array = map[index];
        var p0 = array[0];
        if (p0.equals (p) || (p0.subtract(p)).lengthSquared() < 0.01){
            array.push(i*3);
            found = true;
        }
    }
    if (!found) {
        var array = [];
        array.push(p, i*3);
        map.push(array);
    }
}

// For each vertex at a given position, move it with a random value
map.forEach(function(array) {

    var index, min = -1.5, max = 2;
      var randomNumber = function (min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
      };
    var rx = randomNumber(min,max);
    var ry = randomNumber(min,max);
    var rz = randomNumber(min,max);

    for (index = 1; index<array.length; index++) {
        var i = array[index];
        positions[i] += rx;
        positions[i+1] += ry;
        positions[i+2] += rz;
    }
});
 //asteroid.canvasObject.convertToFlatShadedMesh();

//===========
  
  asteroid.canvasObject.material = asteroidMaterial;
  asteroid.canvasObject.rotation = new BABYLON.Vector3(2,2,0);
  var animateAsteroid = new BABYLON.Animation("animateAsteroid", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

  var keys = []

  keys.push({
    frame: 0,
    value: 0
  });  

  keys.push({
    frame: 100,
    value: 2
  });

  animateAsteroid.setKeys(keys);
  asteroid.canvasObject.animations.push(animateAsteroid);
  scene.beginAnimation(asteroid.canvasObject, 0, 120, true);

  return asteroid
}