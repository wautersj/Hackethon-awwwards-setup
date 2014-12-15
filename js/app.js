$(document).ready(init);

var _CANVAS;
var _CONTEXT;
var bikeCan;
var bikeCtx;
var trailCan;
var trailCtx;
var imgContainerCan;
var imgContainerCtx;

var _FPS;
var _OBJECTS;
var bikeOne;
var bikeTwo

var bikeImg;
var trailImg;

function init() {
  _FPS = 90;
  _OBJECTS = [];

  _CANVAS = document.getElementById('myCanvas');
  _CONTEXT = _CANVAS.getContext('2d');

  imgContainerCan = document.getElementById("imgCanvas");
  imgContainerCtx = imgContainerCan.getContext("2d");

  bikeCan = document.createElement("canvas");
  bikeCtx = bikeCan.getContext("2d");

  trailCan = document.createElement("canvas");
  trailCtx = trailCan.getContext("2d");

  bikeImg = new Image();
  bikeImg.onload = function() {
    bikeCan.width = this.width*0.2;
    bikeCan.height = this.height*0.2;
    bikeCtx.drawImage(this,0,0, this.width, this.height, 0, 0, bikeCan.width, bikeCan.height);

  };

  bikeImg.src = "img/lightBike.svg";

  trailImg = new Image();
  trailImg.onload = function() {
    trailCan.width = this.width*0.1;
    trailCan.height = this.height*0.1;
    trailCtx.drawImage(this,0,0, this.width, this.height, 0, 0, trailCan.width, trailCan.height);

    gameStart();
  };

  trailImg.src = "img/trail.svg";


  // _CONTEXT.drawImage(imgContainerCan,0,0);
}

function gameStart(){
  borders = getBorders()

  bikeOne = new Bike(53, 44, 0, 5, 5,'#FFFFFF');
  bikeTwo = new Bike(borders[1] - 35, borders[0] + 27, 90, 5, 5,'#19a497');
  bikeThree = new Bike(borders[1] - 35, borders[2] - 27, 180, 5, 5,'#24e0c9');
  bikeFour = new Bike(borders[3] + 35, borders[2] - 27, 270, 5, 5,'#105b50');
  // bikeThree = new Bike(298, 314, 0, 5, 5,'#55b5');
  // bikeFour = new Bike(263, 233, 0, 5, 5,'#19a497');
  // bikeFive = new Bike(228, 179, 0, 5, 5,'#FFFFFF');
  // bikeSix = new Bike(298, 260, 0, 5, 5,'#24e0c9');
  // bikeSeven = new Bike(298, 314, 0, 5, 5,'#55b5');
  // bikeEight = new Bike(263, 233, 0, 5, 5,'#19a497');

  _OBJECTS.push(bikeOne);
  _OBJECTS.push(bikeTwo);
  _OBJECTS.push(bikeThree);
  _OBJECTS.push(bikeFour);
  // _OBJECTS.push(bikeFive);
  // _OBJECTS.push(bikeSix);
  // _OBJECTS.push(bikeSeven);
  // _OBJECTS.push(bikeEight);
  // console.log(_OBJECTS);



  // var colors = [ "#19a497", "#24e0c9", "#105b50", "#FFFFFF" ]

  // for (var i = 2; i > 0; i--) {
  //   color = colors[Math.floor(Math.random()*colors.length)];
  //   bikeOne = new Bike(228, 179, 0, 5, 5,color);
  //   _OBJECTS.push(bikeOne);
  // }
  render();
}

function render() {
  setTimeout(function(){
    window.requestAnimationFrame(function(){
      updateCanvas();
      updateObjects();

      drawObjects();
      render();
    });
  }, 1000/_FPS);
}

function updateCanvas() {
  if(_CANVAS.width!==window.innerWidth){
  	_CANVAS.width = imgContainerCan.width = window.innerWidth;
  }
  if(_CANVAS.height!==window.innerHeight){
  	_CANVAS.height = imgContainerCan.height = window.innerHeight;
  }
}

function updateObjects() {
  for (var i = _OBJECTS.length - 1; i >= 0; i--) {
   var bike = _OBJECTS[i];
    bike.move(_OBJECTS);
  }
  //console.log(6);
}

function drawObjects() {
  //_CONTEXT.fillRect(0,0, window.innerWidth, window.innerHeight);

  _CONTEXT.shadowColor = '#000000';
  _CONTEXT.shadowBlur = 0;

  _CONTEXT.globalAlpha = 0.075;
  _CONTEXT.fillStyle = '#000000';
  //_CONTEXT.fillRect(0,0,window.innerWidth,window.innerHeight);
  _CONTEXT.globalAlpha = 1;

  // _CONTEXT.fillStyle = '#000000';
  imgContainerCtx.clearRect ( 0 , 0 , imgContainerCan.width, imgContainerCan.height );

  for (var i = _OBJECTS.length - 1; i >= 0; i--) {
    var bike = _OBJECTS[i];

    _CONTEXT.fillStyle = bike.color;
    _CONTEXT.shadowColor = bike.color;
    _CONTEXT.shadowBlur = 20;

    _CONTEXT.beginPath();
    _CONTEXT.arc(bike.x, bike.y, bike.radius, 0, Math.PI*2);
    _CONTEXT.closePath();
    _CONTEXT.fill();

    // //drawing rotated trail
    // _CONTEXT.save();
    // _CONTEXT.translate(bike.x, bike.y);
    // _CONTEXT.rotate(bike.rotation*(Math.PI/180));
    // _CONTEXT.drawImage(trailCan, -(trailCan.width/2), -(trailCan.height/2));
    // _CONTEXT.restore();

    _CONTEXT.shadowColor = '#000000';
    _CONTEXT.shadowBlur = 0;

    // for (var o = bike.location_trail.length - 1; o >= 0; o--) {
    //   _CONTEXT.beginPath();
    //   _CONTEXT.arc(bike.location_trail[o].x, bike.location_trail[o].y, bike.radius, 0, Math.PI*2);
    //   _CONTEXT.closePath();
    //   _CONTEXT.fill();
    // };

    // _CONTEXT.beginPath();
    // _CONTEXT.arc(bike.next_x, bike.next_y, bike.radius, 0, Math.PI*2);
    // _CONTEXT.closePath();
    // _CONTEXT.fill();

    imgContainerCtx.shadowColor = '#000000';
    imgContainerCtx.shadowBlur = 0;

    imgContainerCtx.globalAlpha = 0.1;
    imgContainerCtx.fillStyle = '#000000';
    //_CONTEXT.fillRect(0,0,window.innerWidth,window.innerHeight);
    imgContainerCtx.globalAlpha = 1;
    //console.log(bikeCan.height)

    //Drawing rotated bike.
    imgContainerCtx.clearRect ( 0 , 0 , bikeCan.width, bikeCan.height );
    imgContainerCtx.save();
    imgContainerCtx.translate(bike.x, bike.y);
  	imgContainerCtx.rotate(bike.rotation*(Math.PI/180));
  	imgContainerCtx.drawImage(bikeCan, -(bikeCan.width/2), -(bikeCan.height/2));
  	imgContainerCtx.restore();
  };

}

function getBorders(){
  // detect borders
  var right_border = 18;
  while(right_border < window.innerWidth){
    right_border += 35;
  }
  right_border -= 35;

  var bottom_border = 17;
  while(bottom_border < window.innerHeight){
    bottom_border += 27;
  }
  bottom_border -= 27;
  var left_border = 18;
  var top_border = 17;

  return [top_border, right_border, bottom_border, left_border]
}
