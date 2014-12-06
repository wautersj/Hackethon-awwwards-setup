$(document).ready(init);

var _CANVAS;
var _CONTEXT;

var _FPS;
var _OBJECTS;
var bikeOne;
var bikeTwo

function init() {
  _CANVAS = document.getElementById('myCanvas');
  _CONTEXT = _CANVAS.getContext('2d');

  _FPS = 30;
  _OBJECTS = [];

  gameStart();
}

function gameStart(){
  // bikeOne = new Bike(228, 179, 0, 5, 5,'#FFFFFF');
  // bikeTwo = new Bike(298, 260, 0, 5, 5,'#24e0c9');
  // bikeThree = new Bike(298, 314, 0, 5, 5,'#55b5');
  // bikeFour = new Bike(263, 233, 0, 5, 5,'#19a497');
  // bikeFive = new Bike(228, 179, 0, 5, 5,'#FFFFFF');
  // bikeSix = new Bike(298, 260, 0, 5, 5,'#24e0c9');
  // bikeSeven = new Bike(298, 314, 0, 5, 5,'#55b5');
  // bikeEight = new Bike(263, 233, 0, 5, 5,'#19a497');

  // _OBJECTS.push(bikeOne);
  // _OBJECTS.push(bikeTwo);
  // _OBJECTS.push(bikeThree);
  // _OBJECTS.push(bikeFour);
  // _OBJECTS.push(bikeFive);
  // _OBJECTS.push(bikeSix);
  // _OBJECTS.push(bikeSeven);
  // _OBJECTS.push(bikeEight);
  // console.log(_OBJECTS);

  var colors = [ "#19a497", "#24e0c9", "#105b50", "#FFFFFF" ]

  for (var i = 400; i > 0; i--) {
    color = colors[Math.floor(Math.random()*colors.length)];
    bikeOne = new Bike(228, 179, 0, 5, 5,color);
    _OBJECTS.push(bikeOne);
  }
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
  if(_CANVAS.width!==window.innerWidth)
      _CANVAS.width = window.innerWidth;
  if(_CANVAS.height!==window.innerHeight)
      _CANVAS.height = window.innerHeight;
}

function updateObjects() {
  for (var i = _OBJECTS.length - 1; i >= 0; i--) {
   var bike = _OBJECTS[i];
    bike.move();
  }
}

function drawObjects() {
  //_CONTEXT.fillRect(0,0, window.innerWidth, window.innerHeight);

  _CONTEXT.shadowColor = '#000000';
  _CONTEXT.shadowBlur = 0;

  _CONTEXT.globalAlpha = 0.05;
  _CONTEXT.fillStyle = '#000000';
  _CONTEXT.fillRect(0,0,window.innerWidth,window.innerHeight);
  _CONTEXT.globalAlpha = 1;

  //_CONTEXT.fillStyle = '#000000';

  for (var i = _OBJECTS.length - 1; i >= 0; i--) {
    var bike = _OBJECTS[i];

    _CONTEXT.fillStyle = bike.color;
    _CONTEXT.shadowColor = bike.color;
    _CONTEXT.shadowBlur = 20;

    _CONTEXT.beginPath();
    _CONTEXT.arc(bike.x, bike.y, bike.radius, 0, Math.PI*2);
    _CONTEXT.closePath();
    _CONTEXT.fill();


    // _CONTEXT.fillStyle = "#000000";
    // _CONTEXT.beginPath();
    // _CONTEXT.arc(bike.x, bike.y, 0.5, 0, Math.PI*2);
    // _CONTEXT.closePath();
    // _CONTEXT.fill();

  };
}
