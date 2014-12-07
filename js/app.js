$(document).ready(init);

var _FPS;
var _CANVAS;
var _CONTEXT;

var imgCanvas;
var imgContext;

var rects;
var drops;

function init() {
	//Caching, initializing some objects.
	_FPS = 15 ;
	_CANVAS = document.getElementById('myCanvas');
	_CONTEXT = _CANVAS.getContext("2d");

	rects = [];
	drops = [];

	//Get asset data first.
	createPixels();
	render();

	setInterval(function(){
		createDrop(Math.round(Math.random()*window.innerWidth), Math.round(Math.random()*15)+5);
	},750);
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


function createPixels() {
	var tileWidth = 35*3;
	var tileHeight = 27*3;

	var pixelsOnX = Math.floor(window.innerWidth/tileWidth);
	var pixelsOnY = Math.floor(window.innerHeight/tileHeight);

	for (var pox = pixelsOnX; pox >= 0; pox--) {
		for (var poy = pixelsOnY; poy >= 0; poy--) {
			rects.push({
				x: pox*tileWidth,
				y: poy*tileHeight,
				width: tileWidth,
				height: tileHeight,
				opacity: 0,
				_opacity: Math.random(),
				inRange: false
			});
		};	
	};
}

function createDrop(y, speed){
	var halfWidth = (window.innerWidth/2);
	var halfHeight = (window.innerHeight/2);

	var newDrop = {
		x: y,
		y: -100,
		speed: speed
	}

	drops.push(newDrop)
}

function updateObjects(){
	for (var i = drops.length - 1; i >= 0; i--) {
		var drop = drops[i];

		//drop.x += 20;
		drop.y+=drop.speed;

		if(drop.y>window.innerHeight){
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
				var relative = (maxDistance-distance)/maxDistance;
				relative *= pixel._opacity;
				pixel.opacity = relative;

				pixel.inRange = true;
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
		_CONTEXT.fillStyle = '#19a497';
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