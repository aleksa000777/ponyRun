$(document).ready(function(){
  main();
})

$(window).on('beforeunload', function(){
  $(window).scrollTop(0);
  $('.field').css('height',height+'px');
});


function main(){
  $('.field').css('height',height+'px');
  scrollIt();
  timer();
}


function finish(){
  on=null;
  window.clearInterval(intervalID);

}

function scrollIt(){
  $(document).scroll(function(e) {
    var pos = $(window).scrollTop();
    if(pos>20){
      start();
      pony(pos);
      $('.welcoming').css('display','none');
      var red = Math.floor((pos*256)/($(document).height()));
      var green = Math.floor(256-red/5 - 10);
      var blue = Math.floor(256 - red/4 - 30);
      $('.field').css('background-color', 'rgb('+red+','+green+','+blue+')');
      var end = $(document).height()-$(window).height()*1.5;
      if(pos > end){
        finish();
        $('.finish').css('display','inline-block');
        $('.field').css('background-color', 'rgb('+random()+','+random()+','+random()+')');
        $('.field').css('height', $(window).height());
      }

    }

});
}

function random(){
  var min = 0;
  var max = 256;
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

function timer(){
  // start();
  stop();
  reset();
};


var hour = 0;
var min = 0;
var sec = 0;
var intervalID;
var on = null;
var height = 30000;

function start(){
    if(!on){
        on = 1;
        intervalID = window.setInterval(function(){
          sec++;
          if(sec===60){
            sec=0;
            min++;
            if(min===60){
              min=0;
              hour++;
            }
          }
          mytimer();
        }, 10);
      }
}

function stop(){
  $('#stop').on('click', function(){
    on=null;
    window.clearInterval(intervalID)
  })
}

function reset(){
  $('#reset').on('click', function(){
    on=null;
    hour = 0;
    min = 0;
    sec = 0;
    mytimer();
    window.clearInterval(intervalID);
    $(window).scrollTop(0);
    $('.welcoming').css('display','inline-block');
    $('.finish').css('display','none');
    $('.field').css('height',height+'px');
    $('.field').css('background-color', 'rgb(255,255,255)');
    $("#pony").css({left: '10px'});
    $("#pony img").attr('src','ponyStay.png');

  })
}

function mytimer(){
  $('#stopwatch').text(pad(min)+":"+pad(sec))
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}


function pony(pos){
  var width = $( window ).width() - 200;
  console.log(width);
  var move = Math.floor((pos * width)/($(document).height()));
  console.log(move);
    $("#pony").css({left: ""+move+"px"});
    $("#pony img").attr('src','ponyRun.gif');
}