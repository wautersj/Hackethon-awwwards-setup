$(document).ready(init);

var _FPS;
var _CANVAS;
var _CONTEXT;

var rects;
var rimples;
var rimpleRadius = 100;
var rimplesCount = 0;

function init() {
	//Caching, initializing some objects.
	_FPS = 30;
	_CANVAS = document.getElementById('myCanvas');
	_CONTEXT = _CANVAS.getContext("2d");

	rects = [];
	rimples = [];

	//Get asset data first.
	render();

	createPixels(0.5,0.5);

	var job = function(){
		window.requestAnimationFrame(function(){
			createRimple();
			setTimeout(job,1000)
		});
	}

	job();
}

function createPixels(multiplyerX,multiplyerY) {
	var tileWidth = 35*multiplyerX;
	var tileHeight = 27*multiplyerY;

	var pixelsOnX = Math.floor(window.innerWidth/tileWidth);
	var pixelsOnY = Math.floor(window.innerHeight/tileHeight);

	rects = [];
	for (var pox = pixelsOnX; pox >= 0; pox--) {
		for (var poy = pixelsOnY; poy >= 0; poy--) {
			var tile = {
				x: pox*tileWidth,
				y: poy*tileHeight,
				width: tileWidth,
				height: tileHeight,
				color: '#19a497',
				opacity: 0,
				_opacity: Math.random()*0.50 + 0.25,
				inRange: false
			}

			if(Math.random()>0.5){
				tile.color = '#FFFFFF';
			}


			rects.push(tile);
		};	
	};
}

function createRimple(){
	var rimple = {
		value:2,
		radius:30,
		color: '#FFFFFF'
	};

	if(rimplesCount%3){
		rimple.color = '#19a497';
	}

	rimples.push(rimple);
	rimplesCount++;
}

function render() {
	//Add delay to achieve maximum set framerate.
	setTimeout(function() {
		window.requestAnimationFrame(function(){
			//Recalling Render, to render next 'frame'.
			render();

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

function updateObjects(){
	var canvasCenter = {
		x: _CANVAS.width/2,
		y: _CANVAS.height/2
	}

	for (var i = rimples.length - 1; i >= 0; i--) {
		var rimple = rimples[i];
		rimple.value += 7;
		//rimple.radius += 2;

		if(rimple.value > (_CANVAS.width/2)+rimpleRadius){
			var index = rimples.indexOf(rimple);
			rimples.splice(index,1);
		}
	};

	for (var j = rects.length - 1; j >= 0; j--) {
		var pixel = rects[j];
		pixel.inRange = false;

		
		for (var k = rimples.length - 1; k >= 0; k--) {
			var rimple = rimples[k];

			var distance = lineDistance(canvasCenter,pixel);

			if(distance>rimple.value && distance<(rimple.value+rimple.radius)){
				var range = distance - rimple.value;

				var relative = range / rimple.radius;
				var relative2 = (relative*2)-1;
				var relative3 = 1 - Math.abs(relative2);

				pixel.inRange = true;
				pixel.opacity = relative3 * pixel._opacity;
				pixel.color = rimple.color;
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