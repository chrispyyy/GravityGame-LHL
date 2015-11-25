
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

  $('.container').on('click', '.main-menu', function() {
    var main = "<img class='title' src='./public/images/blackhole_title.png'>" +
                "<div class='box'>" +
                "<div class='new-game'>" +
                  "<img src='./public/images/new-game.png'>" +
                "</div>" +
                "<div class='load-level'>" +
                  "<img src='./public/images/load-level.png'>" +
                "</div>" +
                "<div class='end-game'>" +
                  "<img src='./public/images/end-game.png'>" +
                "</div>";
    $('.menu-box').html(main);
  });

  $('.container').on('click', '.load-level', function() {
    var levels = "<img class='main-menu' src='./public/images/main-menu.png'>" +
                 "<div class='level one'>" +
                    "<img src='./public/images/level-1.png'>" +
                  "</div>" +
                  "<div class='level two'>" +
                    "<img src='./public/images/level-2.png'>" +
                  "</div>" +
                  "<div class='level three'>" +
                    "<img src='./public/images/level-3.png'>" +
                  "</div>" +
                  "<div class='level four'>" +
                    "<img src='./public/images/level-4.png'>" +
                  "</div>" + 
                  "<div class='level five'>" +
                    "<img src='./public/images/level-5.png'>" +
                  "</div>" +
                  "<div class='level six'>" +
                    "<img src='./public/images/level-6.png'>" +
                  "</div>" +
                  "<div class='level seven'>" +
                    "<img src='./public/images/level-7.png'>" +
                  "</div>" + 
                  "<div class='level eight'>" +
                    "<img src='./public/images/level-8.png'>" +
                  "</div>" +
                  "<div class='level nine'>" +
                    "<img src='./public/images/level-9.png'>" +
                  "</div>";
    $('.menu-box').html(levels);
  }); 
    
  $('.container').on('click', '.end-game', function(){
    scene = null
  }); 

  function addContainer(cssClass, level){
    $('.container').on('click', cssClass, function(){
      currentLevel = level;
      $('.container').hide();
      $('#next-level button').text('Start Game');
      $('#next-level img').attr('src', scenes[currentLevel].image);
      $('#next-level').fadeIn();
      $('#menu-button').fadeIn();
    });
  }

  $('#menu-button').on('click', function(){
    $('.container').slideDown();
    $('#menu-button').hide();
  });


  addContainer('.new-game', 0);

  var cssClassArr = ['.one', '.two', '.three', '.four', '.five', '.six', '.seven', '.eight', '.nine'];

  for(var i=0; i < scenes.length; i++){
    addContainer(cssClassArr[i], i);
  }
 
  $('#next-level').on('click', 'button', function() {
    scene = createScene(engine, canvas, scenes[currentLevel].scene);
    $('#next-level').fadeOut();
    if(currentLevel == 0){
      var instruction = $('<div>');
      instruction.addClass('game-instruction');
      var instructionText = $('<span>').appendTo(instruction)
      instructionText.text('Click anywhere on the screen to generate Black Holes. The longer you press down, the larger they get.');
      instruction.appendTo('body')
      setTimeout(function(){
        instruction.fadeIn('slow').delay(4000);
        instruction.fadeOut();
      }, 500)
      setTimeout(function(){
        instructionText.text('The objective of the Game is to navigate to the Planet, watch out for obstacles on the way!!');
        instruction.fadeIn('slow').delay(4000);
        instruction.fadeOut();
      }, 6000)
      setTimeout(function(){
        instructionText.text('Hit the Space button to change the camera view!');
        instruction.fadeIn('slow').delay(4000);
        instruction.fadeOut();
      }, 11000)
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
      }, 3000);
      toggleFollowCamera = false
    }
  }

  var token = PubSub.subscribe('COLLISION EVENT', collisionSubscriber);
  
  var toggleFollowCamera = false

  $(document).on('keydown', function (e){
    if (e.keyCode == 32){
      if(toggleFollowCamera){
        toggleFollowCamera = false
        PubSub.publish('CAMERA BUTTON', 'static');
      }
      else{
        toggleFollowCamera = true 
        PubSub.publish('CAMERA BUTTON', 'tracker');
      }
    }
  });
  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
    engine.resize();
  });
});
})();