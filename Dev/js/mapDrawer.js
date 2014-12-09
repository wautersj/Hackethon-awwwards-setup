(function(){
  
  function MapDrawer(canvas, grid, map){
    this.canvas = canvas;
    this.grid = grid;
    this.map = map;
  }
  
  MapDrawer.prototype.draw = (function(data){
    
    var x = 0;
    var y = 0;
    
    // Update canvas dimensions
    this.canvas.dom.width = window.innerWidth;
    this.canvas.dom.height = window.innerHeight;
    
    var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
    canvas.width = window.innerWidth*window.devicePixelRatio;
    canvas.height = window.innerHeight*window.devicePixelRatio;
    
    for(var i in data){
      for(var j in data[i]){
        this.drawTile(x, y, data[i][j], context);
        x++;
      }
      x = 0;
      y++;
    }
    
    this.canvas.context.drawImage(canvas,0,0, canvas.width/window.devicePixelRatio,  canvas.height/window.devicePixelRatio);
    
  });
  
  MapDrawer.prototype.drawTile = (function(x, y, range, context){
    
    var color = [
      "#303056",
      "#303056",
      "#303056",
      "#303056",
      "#3D3D69",
      "#5B66A7",
      "#7784CF",
      "#CBB361",
      "#81BA84",
      "#49A34d",
      "#469A47",
      "#408d3E",
      "#346E29",
      "#346E29",
      "#6B5629",
      "#6B5629",
      "#564D39",
      "#4D4D48",
      "#7E7F82",
      "#C4C4C4"
    ];
    
    var x = (x * this.grid.width*window.devicePixelRatio);
    var y = (y * this.grid.height*window.devicePixelRatio);
    
    context.fill();
    context.beginPath();
    context.rect(x, y, this.grid.width*window.devicePixelRatio, this.grid.height*window.devicePixelRatio);
    
    if(this.map.color){
      context.fillStyle = color[range-this.map.sealevel];
    } else {
      context.fillStyle = 'rgba(255,255,255,'+((range-this.map.sealevel)*this.map.opacity)+')';
    }   
    
    context.closePath();
    
    /*context.fill();
    context.beginPath();
    context.arc(x, y, this.grid.height/5, 0, 2 * Math.PI, false);
    
    if(this.map.color){
      context.fillStyle = color[range-this.map.sealevel];
    } else {
      context.fillStyle = 'rgba(255,255,255,'+((range-this.map.sealevel)*this.map.opacity)+')';
    } 
    context.closePath();*/
    
  });
  
  
  
  window.MapDrawer = MapDrawer;
  
})();