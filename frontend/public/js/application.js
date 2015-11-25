
(function(){console.log('sup');
var BABYLON = require('babylonjs');
var createScene = require('./create_scene.js');
var level1 = require('./level_1.js')
var level2 = require('./level_2.js')
var level3 = require('./level_3.js')
var level4 = require('./level_4.js')
var level5 = require('./level_5.js')
var level6 = require('./level_6.js')
var level7 = require('./level_7.js')
var level8 = require('./level_8.js')
var level9 = require('./level_9.js')
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
    {scene: level4, image: level4.image},
    {scene: level5, image: level5.image},
    {scene: level6, image: level6.image},
    {scene: level7, image: level7.image},
    {scene: level8, image: level8.image},
    {scene: level9, image: level9.image},
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
    if(currentLevel == 0){
      var instruction1 = $('<div>');
      instruction1.addClass('game-instruction');
      instruction1.text('Click anywhere on the screen to generate Black Holes. The longer you press down, the larger they get.');

      var instruction2 = $('<div>');
      instruction2.addClass('game-instruction');
      instruction2.text('The objective of the Game is to navigate to the Planet, watch out for obstacles on the way!!');

      instruction1.appendTo('body');
      instruction2.appendTo('body');

      setTimeout(function(){
        instruction1.fadeIn('slow').delay(4000);
        instruction1.fadeOut();
      }, 500)
      setTimeout(function(){
        instruction2.fadeIn('slow').delay(4000);
        instruction2.fadeOut();
      }, 6000)
    }
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
      toggleFollowCamera = false
    }
    if (data == 'collided with other stuffs') {
      $('#game-over').slideDown(1500).delay(1000);
      $('#game-over').fadeOut('slow');
      setTimeout(function(){
        scene = createScene(engine, canvas, scenes[currentLevel].scene);
      }, 2600);
      toggleFollowCamera = false
    }
  }

  var token = PubSub.subscribe('COLLISION EVENT', collisionSubscriber);
  
  var toggleFollowCamera = false

  $('#camera-button').on('click', function (){
    if(toggleFollowCamera){
      toggleFollowCamera = false
      PubSub.publish('CAMERA BUTTON', 'static');
    }
    else{
      toggleFollowCamera = true 
      PubSub.publish('CAMERA BUTTON', 'tracker');
    }
  });
  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
    engine.resize();
  });
});
})();