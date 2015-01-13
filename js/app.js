$(document).ready(function(){
  setTimeout(init,200);
});

var _CANVAS;
var _CONTEXT;

var bikeOneCan;
var bikeOneCtx;
var bikeTwoCan;
var bikeTwoCtx;
var bikeThreeCan;
var bikeThreeCtx;
var bikeFourCan;
var bikeFourCtx;
var bikeCanvases = [];

var labelTopCan;
var labelTopCtx;
var labelRightCan;
var labelRightCtx;
var labelBottomCan;
var labelBottomCtx;
var labelLeftCan;
var labelLeftCtx;
var labelCanvases = [];

var imgContainerCan;
var imgContainerCtx;

var bikeScale = 0.6;

var _FPS;
var _OBJECTS;
var iterationsWithAllBikesCrashed = 0;

function init() {
  _FPS = 10;
  _OBJECTS = [];

  _CANVAS = document.getElementById('myCanvas');
  _CONTEXT = _CANVAS.getContext('2d');

  imgContainerCan = document.getElementById("imgCanvas");
  imgContainerCtx = imgContainerCan.getContext("2d");

  // Bike One

  bikeOneCan = document.createElement("canvas");
  bikeOneCtx = bikeOneCan.getContext("2d");

  bikeOneImg = document.getElementById('lightBikeOne');
  bikeOneCan.width = bikeOneImg.width*bikeScale;
  bikeOneCan.height = bikeOneImg.height*bikeScale;
  bikeOneCtx.drawImage(bikeOneImg,0,0, bikeOneImg.width, bikeOneImg.height, 0, 0, bikeOneCan.width, bikeOneCan.height);
  bikeCanvases.push(bikeOneCan);

  // Bike Two


  bikeTwoCan = document.createElement("canvas");
  bikeTwoCtx = bikeTwoCan.getContext("2d");

  bikeTwoImg = document.getElementById('lightBikeTwo');
  bikeTwoCan.width = bikeTwoImg.width*bikeScale;
  bikeTwoCan.height = bikeTwoImg.height*bikeScale;
  bikeTwoCtx.drawImage(bikeTwoImg,0,0, bikeTwoImg.width, bikeTwoImg.height, 0, 0, bikeTwoCan.width, bikeTwoCan.height);
  bikeCanvases.push(bikeTwoCan);

  // Bike Three

  bikeThreeCan = document.createElement("canvas");
  bikeThreeCtx = bikeThreeCan.getContext("2d");

  bikeThreeImg = document.getElementById('lightBikeThree');
  bikeThreeCan.width = bikeThreeImg.width*bikeScale;
  bikeThreeCan.height = bikeThreeImg.height*bikeScale;
  bikeThreeCtx.drawImage(bikeThreeImg,0,0, bikeThreeImg.width, bikeThreeImg.height, 0, 0, bikeThreeCan.width, bikeThreeCan.height);
  bikeCanvases.push(bikeThreeCan);

  // Bike Four

  bikeFourCan = document.createElement("canvas");
  bikeFourCtx = bikeFourCan.getContext("2d");

  bikeFourImg = document.getElementById('lightBikeFour');
  bikeFourCan.width = bikeFourImg.width*bikeScale;
  bikeFourCan.height = bikeFourImg.height*bikeScale;
  bikeFourCtx.drawImage(bikeFourImg,0,0, bikeFourImg.width, bikeFourImg.height, 0, 0, bikeFourCan.width, bikeFourCan.height);
  bikeCanvases.push(bikeFourCan);

  gameStart();

  // Top Winner Label

  labelTopCan = document.createElement("canvas");
  labelTopCtx = labelTopCan.getContext("2d");

  labelTopImg = document.getElementById('labelTop');
  labelTopCan.width = labelTopImg.width;
  labelTopCan.height = labelTopImg.height;
  labelTopCtx.drawImage(labelTopImg,0,0, labelTopImg.width, labelTopImg.height, 0, 0, labelTopCan.width, labelTopCan.height);
  labelCanvases.push(labelTopCan)

  // Bottom Winner Label

  labelBottomCan = document.createElement("canvas");
  labelBottomCtx = labelBottomCan.getContext("2d");

  labelBottomImg = document.getElementById('labelBottom');
  labelBottomCan.width = labelBottomImg.width;
  labelBottomCan.height = labelBottomImg.height;
  labelBottomCtx.drawImage(labelBottomImg,0,0, labelBottomImg.width, labelBottomImg.height, 0, 0, labelBottomCan.width, labelBottomCan.height);
  labelCanvases.push(labelBottomCan)

  // Left Winner Label

  labelLeftCan = document.createElement("canvas");
  labelLeftCtx = labelLeftCan.getContext("2d");

  labelLeftImg = document.getElementById('labelLeft');
  labelLeftCan.width = labelLeftImg.width;
  labelLeftCan.height = labelLeftImg.height;
  labelLeftCtx.drawImage(labelLeftImg,0,0, labelLeftImg.width, labelLeftImg.height, 0, 0, labelLeftCan.width, labelLeftCan.height);
  labelCanvases.push(labelLeftCan)

  // Right Winner Label

  labelRightCan = document.createElement("canvas");
  labelRightCtx = labelRightCan.getContext("2d");

  labelRightImg = document.getElementById('labelRight');
  labelRightCan.width = labelRightImg.width;
  labelRightCan.height = labelRightImg.height;
  labelRightCtx.drawImage(labelRightImg,0,0, labelRightImg.width, labelRightImg.height, 0, 0, labelRightCan.width, labelRightCan.height);
  labelCanvases.push(labelRightCan)
}

function gameStart(){
  borders = getBorders()

  bikeOne = new Bike(53, 44, 0, 5, 5,'#FFFFFF');
  bikeTwo = new Bike(borders[1] - 35, borders[0] + 27, 90, 5, 5,'#24e0c9');
  bikeThree = new Bike(borders[1] - 35, borders[2] - 27, 180, 5, 5,'#2499e0');
  bikeFour = new Bike(borders[3] + 35, borders[2] - 27, 270, 5, 5,'#ffc700');

  _OBJECTS.push(bikeOne);
  _OBJECTS.push(bikeTwo);
  _OBJECTS.push(bikeThree);
  _OBJECTS.push(bikeFour);

  render();
}

function render() {
  // setTimeout(function(){
    window.requestAnimationFrame(function(){
      updateCanvas();
      updateObjects();

      drawObjects();
      render();
    });
  // }, 1000/_FPS);
}

function updateCanvas() {
  if(_CANVAS.width!==window.innerWidth){
  	_CANVAS.width = imgContainerCan.width = window.innerWidth;
    iterationsWithAllBikesCrashed = 0;
      particles = [];
      _OBJECTS = [];
      borders = getBorders()
      bikeOne = new Bike(53, 44, 0, 5, 5,'#FFFFFF');
      bikeTwo = new Bike(borders[1] - 35, borders[0] + 27, 90, 5, 5,'#24e0c9');
      bikeThree = new Bike(borders[1] - 35, borders[2] - 27, 180, 5, 5,'#2499e0');
      bikeFour = new Bike(borders[3] + 35, borders[2] - 27, 270, 5, 5,'#ffc700');

      _OBJECTS.push(bikeOne);
      _OBJECTS.push(bikeTwo);
      _OBJECTS.push(bikeThree);
      _OBJECTS.push(bikeFour);
  }
  if(_CANVAS.height!==window.innerHeight){
  	_CANVAS.height = imgContainerCan.height = window.innerHeight;
    iterationsWithAllBikesCrashed = 0;
      particles = [];
      _OBJECTS = [];
      borders = getBorders()
      bikeOne = new Bike(53, 44, 0, 5, 5,'#FFFFFF');
      bikeTwo = new Bike(borders[1] - 35, borders[0] + 27, 90, 5, 5,'#24e0c9');
      bikeThree = new Bike(borders[1] - 35, borders[2] - 27, 180, 5, 5,'#2499e0');
      bikeFour = new Bike(borders[3] + 35, borders[2] - 27, 270, 5, 5,'#ffc700');

      _OBJECTS.push(bikeOne);
      _OBJECTS.push(bikeTwo);
      _OBJECTS.push(bikeThree);
      _OBJECTS.push(bikeFour);
  }
}

function updateObjects() {
  for (var i = _OBJECTS.length - 1; i >= 0; i--) {
   var bike = _OBJECTS[i];
    bike.move(_OBJECTS);
  }
  //console.log(6);

  var BikesCrashed = 0;
  for (var i = _OBJECTS.length - 1; i >= 0; i--) {
    if (_OBJECTS[i].crashed == true) {
      BikesCrashed += 1;
    }
  };


  if (BikesCrashed > 2) {
    iterationsWithAllBikesCrashed += 1;
    //console.log(iterationsWithAllBikesCrashed)
    if (BikesCrashed > 3) {
      iterationsWithAllBikesCrashed = 0;
      particles = [];
      _OBJECTS = [];
      bikeOne = new Bike(53, 44, 0, 5, 5,'#FFFFFF');
      bikeTwo = new Bike(borders[1] - 35, borders[0] + 27, 90, 5, 5,'#24e0c9');
      bikeThree = new Bike(borders[1] - 35, borders[2] - 27, 180, 5, 5,'#2499e0');
      bikeFour = new Bike(borders[3] + 35, borders[2] - 27, 270, 5, 5,'#ffc700');

      _OBJECTS.push(bikeOne);
      _OBJECTS.push(bikeTwo);
      _OBJECTS.push(bikeThree);
      _OBJECTS.push(bikeFour);
    } else if (iterationsWithAllBikesCrashed > 300) {
      iterationsWithAllBikesCrashed = 0;
      particles = [];
      _OBJECTS = [];
      bikeOne = new Bike(53, 44, 0, 5, 5,'#FFFFFF');
      bikeTwo = new Bike(borders[1] - 35, borders[0] + 27, 90, 5, 5,'#24e0c9');
      bikeThree = new Bike(borders[1] - 35, borders[2] - 27, 180, 5, 5,'#2499e0');
      bikeFour = new Bike(borders[3] + 35, borders[2] - 27, 270, 5, 5,'#ffc700');

      _OBJECTS.push(bikeOne);
      _OBJECTS.push(bikeTwo);
      _OBJECTS.push(bikeThree);
      _OBJECTS.push(bikeFour);
    }
  }
}

function drawObjects() {

  _CONTEXT.shadowColor = '#000000';
  _CONTEXT.shadowBlur = 0;

  _CONTEXT.globalAlpha = 0.075;
  _CONTEXT.fillStyle = '#000000';
  _CONTEXT.fillRect(0,0,window.innerWidth,window.innerHeight);
  _CONTEXT.globalAlpha = 1;

  imgContainerCtx.clearRect ( 0 , 0 , imgContainerCan.width, imgContainerCan.height );

  for (var i = _OBJECTS.length - 1; i >= 0; i--) {
    var bike = _OBJECTS[i];

    if (bike.crashed == false) {
    _CONTEXT.fillStyle = bike.color;
    _CONTEXT.shadowColor = bike.color;
    _CONTEXT.shadowBlur = 20;

    _CONTEXT.beginPath();
    _CONTEXT.arc(bike.x, bike.y, bike.radius, 0, Math.PI*2);
    _CONTEXT.closePath();
    _CONTEXT.fill();

    _CONTEXT.shadowColor = '#000000';
    _CONTEXT.shadowBlur = 0;


      for (var o = bike.location_trail.length - 1; o >= 0; o--) {
        _CONTEXT.beginPath();
        _CONTEXT.arc(bike.location_trail[o].x, bike.location_trail[o].y, 3, 0, Math.PI*2);
        _CONTEXT.closePath();
        _CONTEXT.fill();
      };

      imgContainerCtx.shadowColor = '#000000';
      imgContainerCtx.shadowBlur = 0;

      imgContainerCtx.globalAlpha = 0.1;
      imgContainerCtx.fillStyle = '#000000';
      imgContainerCtx.globalAlpha = 1;

      //Drawing rotated bike.
      imgContainerCtx.clearRect ( 0 , 0 , bikeCanvases[i].width, bikeCanvases[i].height );
      imgContainerCtx.save();
      imgContainerCtx.translate(bike.x, bike.y);
    	imgContainerCtx.rotate(bike.rotation*(Math.PI/180));
    	imgContainerCtx.drawImage(bikeCanvases[i], -(bikeCanvases[i].width/2), -(bikeCanvases[i].height/2));
    	imgContainerCtx.restore();

      var amount_not_crashed = 0;
      for (var p = _OBJECTS.length - 1; p >= 0; p--) {
        if (_OBJECTS[p].crashed == false) {
          amount_not_crashed += 1;
        }
      };

      if (amount_not_crashed == 1) {
        //draw label for last bike
        if (bike.y < (window.innerHeight / 100 * 10)) {
          imgContainerCtx.save();
          imgContainerCtx.translate(bike.x, bike.y+65);
          imgContainerCtx.drawImage(labelTopCan, -(labelTopCan.width/2), -(labelTopCan.height/2));
          imgContainerCtx.restore();
        } else if (bike.x < (window.innerWidth / 100 * 10)) {
          imgContainerCtx.save();
          imgContainerCtx.translate(bike.x+130, bike.y);
          imgContainerCtx.drawImage(labelLeftCan, -(labelLeftCan.width/2), -(labelLeftCan.height/2));
          imgContainerCtx.restore();
        } else if (bike.x > (window.innerWidth / 100 * 90)) {
          imgContainerCtx.save();
          imgContainerCtx.translate(bike.x-130, bike.y);
          imgContainerCtx.drawImage(labelRightCan, -(labelRightCan.width/2), -(labelRightCan.height/2));
          imgContainerCtx.restore();
        } else {
          imgContainerCtx.save();
          imgContainerCtx.translate(bike.x, bike.y-75);
          imgContainerCtx.drawImage(labelBottomCan, -(labelBottomCan.width/2), -(labelBottomCan.height/2));
          imgContainerCtx.restore();
        }
      }

    } else if (bike.crashed == true && bike.still_need_explosion == true){
      createExplosion(bike.x, bike.y, bike.color);
      bike.still_need_explosion = false;
      bike.x = null
      bike.y = null
      bike.location_trail = []
    };
  };


  // Animate explosion particles
  for (var i=0; i<particles.length; i++)
  {
    var particle = particles[i];

    particle.update("20");
    particle.draw(imgContainerCtx);
  }

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
