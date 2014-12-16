function Particle(options){
	this.offset = 0;
	this.radius = 4;

	for(key in options){
		this[key] = options[key];
	}
}

Particle.prototype = {
	move: function(coords){
		this.x = coords.x;
		this.y = coords.y + this.head*60 + (this.index*this.offset);
	},

	follow: function(dirigent){
		var distance = lineDistance(dirigent, this.tracker);
		var range = 100;

		if(distance<range){
			this.head = (distance-range)/-range;
			this.offset = (this.head*15);
		} else {
			this.head = 0;
			this.offset = 0;
		}
	}
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