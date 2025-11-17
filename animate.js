$(document).ready(function(){
  $("button").click(function(){
    var div = $("div");
    div.animate({left: '250',height: '500px', opacity: '0.4'}, 1000, function(){
        div.css("background-color", "#960000ff")
    });
    div.animate({width: '500px', opacity: '0.8'}, 1000, function(){
        div.css("background-color", "#009292ff")
    });
    div.animate({height: '200px', opacity: '0.4'}, 1000, function(){
        div.css("background-color", "#16476A")
    });
    div.animate({left: '0px',width: '200px', opacity: '0.8'}, 1000, function(){
        div.css("background-color", "#9B5DE0")
    });
  });
});