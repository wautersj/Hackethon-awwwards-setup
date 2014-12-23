$(document).ready(init);

var _FPS;
var _CANVAS;
var _CONTEXT;

var imgCanvas;
var imgContext;

var rects;
var drops;
var mX;
var mY;

function init() {
	//Caching, initializing some objects.
	_FPS = 25;
	_CANVAS = document.getElementById('myCanvas');
	_CONTEXT = _CANVAS.getContext("2d");

	rects = [];
	drops = [];

	//Get asset data first.
	render();

	var task = function(){
		setTimeout(function(){
			createDrop(Math.round(Math.random()*window.innerWidth), Math.round(Math.random()*15)+5);
			window.requestAnimationFrame(task);
		},750);
	}

	mX = 2;
	mY = 2;

	//setFocus();
	//setInterval(setFocus,800);
	createPixels(mX,mY);

	task();
}

function setFocus(){
	if(mX>0){
		createPixels(mX,mX);
		//createPixels(mX,mY);

		if(mX>1){
			mX--;
			mY--;
		} else {
			mX-=0.5;
			mY-=0.5;
		}
	}
}


function render() {
	//Add delay to achieve maximum set framerate.
	setTimeout(function() {
		window.requestAnimationFrame(function(){
			//Recalling Render, to render next 'frame'.
			window.render();

			updateCanvas();
			updateObjects();
			drawObjects();
		});
	}, 1000/_FPS);
}

function updateCanvas(){
	if(_CANVAS.width !== window.innerWidth)
		_CANVAS.width = window.innerWidth;

	if(_CANVAS.height !== window.innerHeight)
		_CANVAS.height = window.innerHeight;
}


function createPixels(multiplyerX,multiplyerY) {
	var tileWidth = 35*multiplyerX;
	var tileHeight = 27*multiplyerY;

	var pixelsOnX = Math.floor(window.innerWidth/tileWidth);
	var pixelsOnY = Math.floor(window.innerHeight/tileHeight);

	rects = [];
	for (var pox = pixelsOnX; pox >= 0; pox--) {
		for (var poy = pixelsOnY; poy >= 0; poy--) {
			rects.push({
				x: pox*tileWidth,
				y: poy*tileHeight,
				width: tileWidth,
				height: tileHeight,
				color: '#19a497',
				opacity: 0,
				_opacity: 1,
				inRange: false
			});
		};	
	};
}

function createDrop(x, speed){
	var halfWidth = (window.innerWidth/2);
	var halfHeight = (window.innerHeight/2);

	var newDrop = {
		x: x,
		y: window.innerHeight+200,
		opacity: 0.5 + Math.random()*0.5,
		//opacity: Math.random(),
		speed: speed,
		color: '#19a497'
	}

	/*
	if(Math.random()>0.5){
		newDrop.color = '#FFFFFF';
	}
	*/

	drops.push(newDrop)
}

function updateObjects(){
	for (var i = drops.length - 1; i >= 0; i--) {
		var drop = drops[i];

		//drop.x += 2;
		drop.y-=drop.speed;

		if(drop.y<-100){
			var index = drops.indexOf(drop);
			drops.splice(index,1);
		}
	};


	for (var j = rects.length - 1; j >= 0; j--) {
		var pixel = rects[j];
		pixel.inRange = false;

		for (var k = drops.length - 1; k >= 0; k--) {
			var drop = drops[k];

			var distance = lineDistance(drop,pixel);

			var maxDistance = 150;
			if(distance<maxDistance){
				pixel.inRange = true;
				pixel.color = drop.color;
				pixel._opacity = drop.opacity;

				var relative = (maxDistance-distance)/maxDistance;
				relative *= pixel._opacity;
				pixel.opacity = relative;
			}
		};

		if(pixel.inRange==false){
			pixel.opacity = 0;
		}
	};
}

function drawObjects(){
	//draw part 1 of dual effect screen;
	_CONTEXT.globalAlpha = 0.3;
	_CONTEXT.fillStyle = '#1C1C1C';
    _CONTEXT.fillRect(0,0,window.innerWidth,window.innerHeight);
    _CONTEXT.globalAlpha = 1;

	for (var i = rects.length - 1; i >= 0; i--) {
		var pixel = rects[i];

		_CONTEXT.globalAlpha = pixel.opacity;
		_CONTEXT.fillStyle = pixel.color;
		_CONTEXT.fillRect(pixel.x,pixel.y,pixel.width,pixel.height);
	};
}

function lineDistance( point1, point2 )
{
	var xs = 0;
	var ys = 0;

	xs = point2.x - point1.x;
	xs = xs * xs;

	ys = point2.y - point1.y;
	ys = ys * ys;

	return Math.sqrt( xs + ys );
}