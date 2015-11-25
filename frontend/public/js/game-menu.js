$(function() {
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
    console.log(main);
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
});