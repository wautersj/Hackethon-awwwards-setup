$(document).ready(init);

var _FPS;
var _CANVAS;
var _CONTEXT;

var objects;

function init() {
	//Caching, initializing some objects.
	_FPS = 25 ;
	_CANVAS = document.getElementById('myCanvas');
	_CONTEXT = _CANVAS.getContext("2d");

	//Create clean array
	objects = [];

	for (var i = 30 - 1; i >= 0; i--) {
		objects.push({
			x: Math.round(Math.random()*window.innerWidth),
			y: Math.round(Math.random()*window.innerHeight),
			
			color: '#FFFFFF',
			radius: 1 + Math.round(Math.random()*(window.innerWidth/125))
		});
	};


	//Starting the Render sequence.
	render();
}

function render() {
	//Add delay to achieve maximum set framerate.
	setTimeout(function() {
		window.requestAnimationFrame(function(){
			//console.log('frame rendered !');
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

function updateObjects(){for (var i = objects.length - 1; i >= 0; i--) {
		var obj = objects[i];
			//update coordinates.
			obj.y -= obj.radius/10;

			//auto-update opacity.
			obj.alpha = obj.radius/15;

			//move circle object over y-axis.
			if(obj.y < obj.radius*-1){
				obj.y = window.innerHeight + obj.radius;
			}
	};
}

function drawObjects(){
	//draw part 1 of dual effect screen
	_CONTEXT.clearRect(0, 0, window.innerWidth, window.innerHeight);

	if(objects.length){
		for (var i = 0; i < objects.length; i++) {
			var obj = objects[i];
			drawCircle(obj);
		};	
	}
}

function drawCircle(obj){
	_CONTEXT.globalAlpha = obj.alpha;

	//Object Path	
	_CONTEXT.beginPath();
	_CONTEXT.arc(obj.x,obj.y,obj.radius,0,Math.PI*2,true);
	_CONTEXT.closePath();

	//Object Fill
	//_CONTEXT.fillStyle = obj.color;
	//_CONTEXT.fill();

	//Object Stroke
	_CONTEXT.lineWidth = obj.radius/5;
	_CONTEXT.strokeStyle = '#FFFFFF';
	_CONTEXT.stroke();

	//Object Effects
	_CONTEXT.shadowBlur = 75;
	_CONTEXT.shadowColor = "white";
}