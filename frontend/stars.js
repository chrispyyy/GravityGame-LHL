module.exports = function generateStars(scene){

  var stars = []
  
  for (var i=0; i< 500; i++) {
    stars.push(new GameObject('stars', 2 + Math.random() * 7, 30, scene, -1000 + Math.random() * 2000, -1000, -500 + Math.random() * 1000));
  }

  for (var i=0; i < stars.length; i++){
    stars[i]
  }

  return stars
}