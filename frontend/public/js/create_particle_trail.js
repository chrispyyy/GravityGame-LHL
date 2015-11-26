var BABYLON = require('babylonjs');

module.exports = function createParticleTrail(scene, mesh) {
  var particleTrail = new BABYLON.ParticleSystem("particles", 200, scene);
  particleTrail.emitter = mesh;

  var fireTexture = new BABYLON.FireProceduralTexture("fire", 1024, scene);
  fireTexture.speed = new BABYLON.Vector2(0.00001, 0.00001);
  //console.log(fireTexture.fireColors);
  //console.log(fireTexture.alphaThreshold);
  
  // Thanks to Iiceman: http://www.html5gamedevs.com/topic/6557-babylon-projects/?p=90834
  fireTexture.fireColors = [
  new BABYLON.Color3(1,0.3,0),
  new BABYLON.Color3(1,0.9,0),
  new BABYLON.Color3(1,0.8,0),
  new BABYLON.Color3(1,0.9,0.0),
  new BABYLON.Color3(1,0.9,0),
  new BABYLON.Color3(1,0.7,0)
  ];


  
  particleTrail.particleTexture = new BABYLON.FireProceduralTexture("texture", 1024, scene);
  particleTrail.minEmitBox = new BABYLON.Vector3(-0.5, 0, -3);
  particleTrail.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0);
  particleTrail.emitRate = 500;
  particleTrail.minSize = 0.1;
  particleTrail.maxSize = 0.5;
  particleTrail.minLifeTime = 0.5;
  particleTrail.maxLifeTime = 1.5;
  particleTrail.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
  particleTrail.direction1 = new BABYLON.Vector3(-2, 0 , 3);
  particleTrail.minEmitPower = 1;
  particleTrail.updateSpeed = 0.005;
  particleTrail.maxEmitPower = 3;
  particleTrail.color1 = new BABYLON.Color4(1.0, 0.2, 0.4, 1.0);
  particleTrail.color2 = new BABYLON.Color4(0.5, 0.1, 0.2, 1.0);
  particleTrail.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
  particleTrail.start();
}