console.log('sup')

GameObject = require('../game_object.js');
createScene = require('../create_scene.js');

window.addEventListener('DOMContentLoaded', function(){
  // get the canvas DOM element
  var canvas = document.getElementById('renderCanvas');

  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  // createScene function that creates and return the scene

  // call the createScene function
  var scene = createScene(engine, canvas);

  // run the render loop
  engine.runRenderLoop(function(){
    scene.render();
  });

// the canvas/window resize event handler
  window.addEventListener('resize', function(){
    engine.resize();
  });
});