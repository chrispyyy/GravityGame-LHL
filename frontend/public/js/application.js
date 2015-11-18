
(function(){console.log('sup');
var BABYLON = require('babylonjs');
var createScene = require('./create_scene.js');
var createScene2 = require('./create_scene2.js');
var currentLevel = 0;
window.addEventListener('DOMContentLoaded', function(){
  // get the canvas DOM element
  var canvas = document.getElementById('renderCanvas');

  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  // createScene function that creates and return the scene

  // call the createScene function
  function callScene(){
    if (currentLevel == 0) {
      return scene = createScene(engine, canvas);
    } else {
      return scene = createScene2(engine, canvas);
    }
  }

  callScene();
  setTimeout(function(){
    currentLevel++;
    callScene();
  }, 4000);

// var scene = createScene2(engine, canvas);

  // run the render loop
  engine.runRenderLoop(function(){
    scene.render();
  });

// the canvas/window resize event handler
  window.addEventListener('resize', function(){
    engine.resize();
  });
});
})();