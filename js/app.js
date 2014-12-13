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
	

	//image.src = "assets/heart.jpg";
	//image.src = "assets/logo.jpg";
	//image.src = "assets/circle_icon.png";
	//loadImage("assets/hackethon.jpg",1);
	loadImage("assets/logo.png", 1);

	render();
   	startCreating();
}

function loadImage(path, scale){
	imgCanvas = document.createElement('canvas');
	imgContext = imgCanvas.getContext('2d');	

	var image = new Image();
	image.onload = function(){

		imgCanvas.width = image.width*scale;
   		imgCanvas.height = image.height*scale;
   		imgContext.drawImage(image,0,0, image.width, image.height, 0,0,imgCanvas.width, imgCanvas.height);

   		
	};

	image.src = path;
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

			setTimeout(job, 15);
		});
	}

	job();
}

function createPixels() {
	if(imgContext){
		for (var i = 40; i >= 0; i--) {
			var x = Math.floor(Math.random()*imgCanvas.width);
		    var y = Math.floor(Math.random()*imgCanvas.height);
			var randomPixel = imgContext.getImageData(x, y, 1, 1).data;

			var red = randomPixel[0];
			var green = randomPixel[1];
			var blue = randomPixel[2];

			if(red || green || blue){
				var pixel = {
					x: ((window.innerWidth/2) - (imgCanvas.width/2)) + x,
					y: ((window.innerHeight/2) - (imgCanvas.height/2)) + y,
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
}

function updateObjects(){
	for (var i = objects.length - 1; i >= 0; i--) {
		var pixel = objects[i];

		pixel.radius+=1.5;

		if(pixel.radius>3){
			if(pixel.opacity>0){
				pixel.opacity -=0.1;
			} else {
				if(pixel.opacity<=0.1){
					var index = objects.indexOf(pixel);
					objects.splice(index,1);
				}
			}
		}
	};
}

function drawObjects(){
	_CONTEXT.shadowBlur = 0;
	_CONTEXT.globalAlpha = 0.1;
	_CONTEXT.fillStyle = '#1C1C1C';
	_CONTEXT.fillRect(0,0,window.innerWidth,window.innerHeight);
	_CONTEXT.globalAlpha = 1;

   	//_CONTEXT.shadowBlur = 30;

	for (var i = objects.length - 1; i >= 0; i--) {
		var pixel = objects[i];
		var color = pixel.color;

		//_CONTEXT.fillRect(x, y, 10, 10 );
		_CONTEXT.globalAlpha = pixel.opacity;
		_CONTEXT.beginPath();
		_CONTEXT.fillStyle = 'rgba('+color.red+','+color.green+','+color.blue+', 255)';
		_CONTEXT.arc(pixel.x, pixel.y, pixel.radius, 0, 2 * Math.PI, false);
		_CONTEXT.shadowColor = 'rgba('+color.red+','+color.green+','+color.blue+', 255)';
		_CONTEXT.fill();
	};
}