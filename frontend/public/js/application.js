
(function(){console.log('sup');
var BABYLON = require('babylonjs');
var createScene = require('./create_scene.js');
var createScene2 = require('./create_scene2.js');
var createScene3 = require('./create_scene3.js');
var checkLevel = require('./click_events.js');
var PubSub = require('pubsub-js')

window.addEventListener('DOMContentLoaded', function(){
  // get the canvas DOM element
  var canvas = document.getElementById('renderCanvas');

  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  var scenes = [createScene, createScene2, createScene3]

  currentLevel = 0;
  var scene = scenes[currentLevel](engine, canvas);

  var collisionSubscriber = function(msg, data){
    if (data == 'collided') {
      currentLevel++;
      return scene = scenes[currentLevel](engine, canvas);
    } 
    if (data == 'collided with other stuffs') {
      return scene = scenes[currentLevel](engine, canvas)
    }
  }

  var token = PubSub.subscribe( 'COLLISION EVENT', collisionSubscriber );
  
  collisionSubscriber

  engine.runRenderLoop(function(){
    scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
    engine.resize();
  });
});
})();