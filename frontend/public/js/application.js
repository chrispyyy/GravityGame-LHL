
(function(){console.log('sup');
var BABYLON = require('babylonjs');
var createScene = require('./create_scene.js');
var level1 = require('./level_1.js')
var level2 = require('./level_2.js')
var level3 = require('./level_3.js')
var PubSub = require('pubsub-js');
var $ = require("jquery");

window.addEventListener('DOMContentLoaded', function()
{
  // get the canvas DOM element
  var canvas = document.getElementById('renderCanvas');

  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  var scenes = [
    {scene: level1, image: level1.image}, 
    {scene: level2, image: level2.image},
    {scene: level3, image: level3.image},
  ];

  
  var currentLevel = 0;

  var scene = null;

  engine.runRenderLoop(function()
  {
    if(scene !== null)
    {
      scene.render();
      document.title = "FPS: " + engine.getFps().toFixed().toString();
    }
  });

  $('<button>Start Game</button>').appendTo('#next-level')
  $('#next-level img').attr('src', scenes[currentLevel].image)

  $('#next-level').on('click', 'button', function() {
    scene = createScene(engine, canvas, scenes[currentLevel].scene);

    $('#next-level').fadeOut();
  });

  var collisionSubscriber = function(msg, data){
    if (data == 'collided') {
      currentLevel++;
      $('#next-level button').text('Level ' + (currentLevel + 1));
      $('#next-level img').attr('src', scenes[currentLevel].image)
      $('#next-level').fadeIn('slow');
      $('#next-level').on('click', 'button', function(){
        scene = createScene(engine, canvas, scenes[currentLevel].scene);
        $('#next-level').fadeOut('slow');
      });
    }
    if (data == 'collided with other stuffs') {
      $('#game-over').slideDown(1500).delay(1000);
      $('#game-over').fadeOut('slow');
      setTimeout(function(){
        scene = createScene(engine, canvas, scenes[currentLevel].scene);
      }, 1500);
    }
  }

  var token = PubSub.subscribe('COLLISION EVENT', collisionSubscriber);
  
  // collisionSubscriber

  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
    engine.resize();
  });
});
})();