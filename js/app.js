$(document).ready(init);

var _CANVAS;
var _CONTEXT;
var imgCan;
var imgCtx;
var imgContainerCan;
var imgContainerCtx;

var _FPS;
var _OBJECTS;
var bikeOne;
var bikeTwo

var imageObj;

function init() {
  _FPS = 90;
  _OBJECTS = [];

  _CANVAS = document.getElementById('myCanvas');
  _CONTEXT = _CANVAS.getContext('2d');

  imgContainerCan = document.getElementById("imgCanvas");
  imgContainerCtx = imgContainerCan.getContext("2d");

  imgCan = document.createElement("canvas");
  imgCtx = imgCan.getContext("2d");

  imageObj = new Image();
  imageObj.onload = function() {
    imgCan.width = this.width*0.2;
    imgCan.height = this.height*0.2;
    imgCtx.drawImage(this,0,0, this.width, this.height, 0, 0, imgCan.width, imgCan.height);

    gameStart();
  };

  imageObj.src = "img/lightBike.svg";


  // _CONTEXT.drawImage(imgContainerCan,0,0);
}

function gameStart(){
   bikeOne = new Bike(228, 260, 0, 5, 5,'#FFFFFF');
   bikeTwo = new Bike(298+35*15, 260, 180, 5, 5,'#24e0c9');
  // bikeThree = new Bike(298, 314, 0, 5, 5,'#55b5');
  // bikeFour = new Bike(263, 233, 0, 5, 5,'#19a497');
  // bikeFive = new Bike(228, 179, 0, 5, 5,'#FFFFFF');
  // bikeSix = new Bike(298, 260, 0, 5, 5,'#24e0c9');
  // bikeSeven = new Bike(298, 314, 0, 5, 5,'#55b5');
  // bikeEight = new Bike(263, 233, 0, 5, 5,'#19a497');

   _OBJECTS.push(bikeOne);
   _OBJECTS.push(bikeTwo);
  // _OBJECTS.push(bikeThree);
  // _OBJECTS.push(bikeFour);
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
  //setTimeout(function(){
    window.requestAnimationFrame(function(){
      updateCanvas();
      updateObjects();

      drawObjects();
      render();
    });
  //}, 1000/_FPS);
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

  _CONTEXT.globalAlpha = 0.05;
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

    _CONTEXT.shadowColor = '#000000';
    _CONTEXT.shadowBlur = 0;

    imgContainerCtx.shadowColor = '#000000';
    imgContainerCtx.shadowBlur = 0;

    imgContainerCtx.globalAlpha = 0.1;
    imgContainerCtx.fillStyle = '#000000';
    //_CONTEXT.fillRect(0,0,window.innerWidth,window.innerHeight);
    imgContainerCtx.globalAlpha = 1;
    //console.log(imgCan.height)

    //Drawing rotated bike.
    imgContainerCtx.clearRect ( 0 , 0 , imgCan.width, imgCan.height );
    imgContainerCtx.save();
    imgContainerCtx.translate(bike.x, bike.y);
  	imgContainerCtx.rotate(bike.rotation*(Math.PI/180));
  	imgContainerCtx.drawImage(imgCan, -(imgCan.width/2), -(imgCan.height/2));
  	imgContainerCtx.restore();
  };

}
