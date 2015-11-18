var BABYLON = require('babylonjs');

module.exports = function generateStars(scene){

  var stars = []
  
  for (var i=0; i< 1000; i++) {
    stars.push(new GameObject('stars', 2 + Math.random() * 4, 30, scene, -1440 + Math.random() * 2880, -1000, -1440 + Math.random() * 2880));
  }


  return stars
}