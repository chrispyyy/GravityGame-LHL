var BABYLON = require('babylonjs');


module.exports = function createExplosion(scene, mesh) {
 var explosion = new BABYLON.ParticleSystem("particles", 2000, scene);
 explosion.emitter = mesh;
 explosion.particleTexture = new BABYLON.FireProceduralTexture("texture", 1024, scene);
 explosion.minEmitBox = new BABYLON.Vector3(-0.5, 0, -0.5);
 explosion.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0.5);
 explosion.emitRate = 500;
 explosion.minSize = 0.1;
 explosion.maxSize = 0.5;
 explosion.minLifeTime = 0.5;
 explosion.maxLifeTime = 1.5;
 explosion.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
 explosion.direction1 = new BABYLON.Vector3(-10, 10 , 10);
 explosion.direction2 = new BABYLON.Vector3(10, 10 , 10);
 explosion.direction3 = new BABYLON.Vector3(-10, 10 , -10);
 explosion.direction4 = new BABYLON.Vector3(10, 10 , -10);
 explosion.minEmitPower = 1;
 explosion.updateSpeed = 0.005;
 explosion.maxEmitPower = 3;
 explosion.color1 = new BABYLON.Color4(1.0, 0.2, 0.4, 1.0);
 explosion.color2 = new BABYLON.Color4(0.5, 0.1, 0.2, 1.0);
 explosion.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
 explosion.start();
}