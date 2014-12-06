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
    
    for(var i in data){
      for(var j in data[i]){
        this.drawTile(x, y, data[i][j]);
        x++;
      }
      x = 0;
      y++;
    }
    
  });
  
  MapDrawer.prototype.drawTile = (function(x, y, range){
    
    var color = [
      "#303056",
      "#303056",
      "#303056",
      "#303056",
      "#3d3d69",
      
      "#5b66a7",
      "#7784cf",
      "#cbb361",
      "#81ba84",
      "#49a34d",
      
      "#469a47",
      "#408d3e",
      "#346e29",
      "#346e29",
      "#6b5629",
      
      "#6b5629",
      "#564d39",
      "#4d4d48",
      "#7e7f82",
      "#c4c4c4"
    ]
    
    var context = this.canvas.context;
    
    var x = (x * this.grid.width)+(0-(this.grid.width-this.grid.xOffset));
    var y = (y * this.grid.height)+(0-(this.grid.height-this.grid.yOffset));
    
    context.beginPath();
    context.rect(x, y, this.grid.width, this.grid.height);
    if(this.map.color){
      context.fillStyle = color[range-this.map.sealevel];
    } else {
      context.fillStyle = 'rgba(255,255,255,'+((range-this.map.sealevel)*this.map.opacity)+')';
    }
    context.fill();
    context.closePath();
    
  });
  
  window.MapDrawer = MapDrawer;
  
})();