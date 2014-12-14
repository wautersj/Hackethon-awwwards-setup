$(document).ready(init);

var _FPS;
var _CANVAS;
var _CONTEXT;

var imgCanvas;
var imgContext;

var objects;

function init() {
	//Caching, initializing some objects.
	_FPS = 30 ;
	_CANVAS = document.getElementById('myCanvas');
	_CONTEXT = _CANVAS.getContext("2d");

	objects = [];

	//Get asset data first.
	getImageData();
}

function getImageData() {
	render();

	var currentImage = 0;

	var images = [];
	images.push('assets/heart.png');
	images.push('assets/circle_icon.png');
	images.push('assets/logo.png');

	var job = function(){
		window.requestAnimationFrame(function(){
			loadImage(images[currentImage],0.8);

			currentImage++;
			if(currentImage>=images.length){
				currentImage = 0;
			}

			setTimeout(job,3000);
		});
	}

	job();

	
   	startCreating();
}

function loadImage(path, scale){
	imgCanvas = document.createElement('canvas');
	imgContext = imgCanvas.getContext('2d');	

	var image = new Image();
	image.onload = function(){
		imgCanvas.width = this.width*scale;
   		imgCanvas.height = this.height*scale;
   		imgContext.drawImage(image,0,0, image.width, image.height, 0,0,imgCanvas.width, imgCanvas.height);   		
	};
	image.src = path + '?' + String(Math.random());
}

function render() {
	setTimeout(function() {
		window.requestAnimationFrame(function(){
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

			setTimeout(job, 35);
		});
	}

	job();
}

function createPixels() {
	if(imgContext){
		for (var i = 45; i >= 0; i--) {
			var x = Math.floor(Math.random()*imgCanvas.width);
		    var y = Math.floor(Math.random()*imgCanvas.height);
			
			var randomPixel = imgContext.getImageData(x, y, 1, 1).data;

			var red = randomPixel[0];
			var green = randomPixel[1];
			var blue = randomPixel[2];

			if(red || green || blue){
				var pixel = {
					x: ((window.innerWidth/2) - (imgCanvas.width/2)) + x,
					y: ((window.innerHeight/2) - (imgCanvas.height/2)) + y + 20,
					radius: 0,
					opacity: 1,
					speed: 0.5,
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

		pixel.radius+=1;
		pixel.y -= pixel.speed;

		pixel.speed += 0.2;

		if(pixel.radius>10){
			if(pixel.opacity>0.1){
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
	//_CONTEXT.shadowBlur = 0;
	_CONTEXT.globalAlpha = 0.5;
	_CONTEXT.fillStyle = '#1C1C1C';
	_CONTEXT.fillRect(0,0,window.innerWidth,window.innerHeight);
	//_CONTEXT.clearRect(0,0,window.innerWidth,window.innerHeight);
	_CONTEXT.globalAlpha = 1;

   	//_CONTEXT.shadowBlur = 50;

	for (var i = objects.length - 1; i >= 0; i--) {
		var pixel = objects[i];
		var color = pixel.color;

		//_CONTEXT.fillRect(x, y, 10, 10 );
		
		_CONTEXT.beginPath();
		_CONTEXT.fillStyle = 'rgba('+color.red+','+color.green+','+color.blue+', 255)';
		_CONTEXT.shadowColor = 'rgba('+color.red+','+color.green+','+color.blue+', 255)';
		
		_CONTEXT.globalAlpha = 0.2;
		_CONTEXT.fillRect(pixel.x - pixel.radius,pixel.y - pixel.radius,pixel.radius*2,pixel.radius*2);

		_CONTEXT.globalAlpha = pixel.opacity;
		_CONTEXT.arc(pixel.x, pixel.y, pixel.radius, 0, 2 * Math.PI, false);	
		
		_CONTEXT.fill();
	};
}