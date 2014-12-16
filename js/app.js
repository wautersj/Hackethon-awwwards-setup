$(document).ready(init);

var _FPS;
var _CANVAS;
var _CONTEXT;

var imgCanvas;
var imgContext;

var objects;

var dirigent;
var dirigentRelative;

var colors;
var positions;
var particles;

function init() {
	//Caching, initializing some objects.
	_FPS = 60 ;
	_CANVAS = document.getElementById('myCanvas');
	_CONTEXT = _CANVAS.getContext("2d");

	objects = [];

	dirigent = {
		x: 0,
		y: 0
	}

	dirigentRelative = {
		value: -1
	}

	colors = [];
	colors.push('#71d6ad');
	colors.push('#66c19c');
	colors.push('#5eb390');
	colors.push('#57a686');
	colors.push('#4e9477');
	colors.push('#47866c');
	colors.push('#3e755e');
	colors.push('#356451');
	colors.push('#2b5242');
	colors.push('#1f3a2f');
	colors.push('#FFFFFF');

	positions = 34;
	particles = colors.length;

	setupEnv();
	render();

	leftToRight();
}

function leftToRight(){
	dirigentRelative = {value:dirigentRelative.value};

	var rand = Math.random();
	var distance = Math.abs(dirigentRelative.value-rand);
	if(distance<0.4){
		distance = 0.4;
	}

	$(dirigentRelative).animate(
		{
			value: rand
		},
		{
			duration: 1000*distance,
			easing: 'easeInOutBack',
			complete: function(){
				rightToLeft();
			}
		});
}

function rightToLeft(){
	dirigentRelative = {value:dirigentRelative.value};

	var rand = Math.random();
	var distance = Math.abs(dirigentRelative.value-rand);
	if(distance<0.4){
		distance = 0.4;
	}

	$(dirigentRelative).animate(
		{
			value: rand*-1
		},
		{
			duration: 1000*distance,
			easing: 'easeInOutBack',
			complete: function(){
				leftToRight();
			}
		});
}

function setupEnv() {
	for (var pos = 0; pos<positions; pos++) {
		for (var par = 0; par<particles; par++) {
			var particle = new Particle({
				index: par,
				position: pos,

				x: 0,
				y: 0,

				tracker: {x:0,y:0},

				color: colors[par],
				opacity: 0.7,

				radius: 2 + par*0.25
			});

			objects.push(particle);
		}
	};
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


function updateObjects(){
	var width = window.innerWidth;
	var height = window.innerHeight;
	var padding = 20;

	var lineWidth = positions*padding;
	var lineX = (width/2) - (lineWidth/2);
	var lineY = height/2;


	for (var i = objects.length - 1; i >= 0; i--) {
		var particle = objects[i];

		particle.tracker = {
			x: lineX + (particle.position * padding),
			y: lineY
		}

		particle.move(particle.tracker);
		particle.follow(dirigent);
	};

	if(dirigent){
		dirigent.x = lineX + (lineWidth/2) + ((lineWidth/2)*dirigentRelative.value);
		dirigent.y = window.innerHeight/2 - 50;
	}
}

function drawObjects(){
	_CONTEXT.clearRect(0,0,window.innerWidth,window.innerHeight);

	for (var i = 0; i < objects.length; i++) {
		var particle = objects[i];
		
		_CONTEXT.beginPath();
		_CONTEXT.globalAlpha = particle.opacity;
		_CONTEXT.fillStyle = particle.color;
		_CONTEXT.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI, false);	
		_CONTEXT.fill();
	};

	if(dirigent){
		_CONTEXT.beginPath();
		_CONTEXT.globalAlpha = 1;
		_CONTEXT.fillStyle = '#FFFFFF';
		_CONTEXT.arc(dirigent.x, dirigent.y, 10, 0, 2 * Math.PI, false);	
		_CONTEXT.fill();
	}
}