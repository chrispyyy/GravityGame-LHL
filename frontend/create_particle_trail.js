var BABYLON = require('babylonjs');

module.exports = function createParticleTrail(scene, mesh) {
  var particleTrail = new BABYLON.ParticleSystem("particles", 200, scene);
  particleTrail.emitter = mesh;
  particleTrail.particleTexture = new BABYLON.FireProceduralTexture("texture", 1024, scene);
  particleTrail.minEmitBox = new BABYLON.Vector3(-0.5, 0, -0.5);
  particleTrail.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0.5);
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