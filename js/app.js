$(document).ready(init);

var _FPS;
var _CANVAS;
var _CONTEXT;

var imgCanvas;
var imgContext;

var objects;

function init() {
	//Caching, initializing some objects.
	_FPS = 25 ;
	_CANVAS = document.getElementById('myCanvas');
	_CONTEXT = _CANVAS.getContext("2d");

	objects = [];

	//Get asset data first.
	getImageData();
}

function getImageData() {
	imgCanvas = document.createElement('canvas');
	imgContext = imgCanvas.getContext('2d');	

	var image = new Image();
	image.onload = function(){
		imgCanvas.width = image.width;
   		imgCanvas.height = image.height;
   		imgContext.drawImage(image,0,0);

   		render();
   		startCreating();
	};

	//image.src = "assets/heart.jpg";
	//image.src = "assets/logo.jpg";
	image.src = "assets/circle_icon.png";
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

function startCreating() {
	var job = function(){
		window.requestAnimationFrame(function(){
			createPixels();

			setTimeout(job, 12);
		});
	}

	job();
}

function createPixels() {
	for (var i = 8; i >= 0; i--) {
		var x = Math.floor(Math.random()*imgCanvas.width);
	    var y = Math.floor(Math.random()*imgCanvas.height);
		var randomPixel = imgContext.getImageData(x, y, 1, 1).data;

		var red = randomPixel[0];
		var green = randomPixel[1];
		var blue = randomPixel[2];

		if(red || green || blue){
			var pixel = {
				x: x,
				y: y,
				radius: 0,
				opacity: 1,
				color: {
					red: red,
					green: green,
					blue: blue
				}
			}

			objects.push(pixel);

			
		}
	};
}

function updateObjects(){
	for (var i = objects.length - 1; i >= 0; i--) {
		var pixel = objects[i];

		pixel.radius++;

		if(pixel.radius>15){
			if(pixel.opacity>0){
				pixel.opacity -=0.1;
			} else {
				//console.log('delete');
				if(pixel.opacity<=0.1){
					var index = objects.indexOf(pixel);
					objects.splice(index,1);
				}
			}
		}
	};
}

function drawObjects(){
	//draw part 1 of dual effect screen
	_CONTEXT.clearRect(0, 0, window.innerWidth, window.innerHeight);

	for (var i = objects.length - 1; i >= 0; i--) {
		var pixel = objects[i];
		var color = pixel.color;

		//_CONTEXT.fillRect(x, y, 10, 10 );
		_CONTEXT.globalAlpha = pixel.opacity;
		_CONTEXT.beginPath();
		_CONTEXT.arc(pixel.x, pixel.y, pixel.radius, 0, 2 * Math.PI, false);
		_CONTEXT.fillStyle = 'rgba('+color.red+','+color.green+','+color.blue+', 255)';
		_CONTEXT.fill();
	};
}