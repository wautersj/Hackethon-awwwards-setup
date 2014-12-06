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
    
    var context = this.canvas.context;
    
    var x = (x * this.grid.width)+(0-(this.grid.width-this.grid.xOffset));
    var y = (y * this.grid.height)+(0-(this.grid.height-this.grid.yOffset));
    
    context.beginPath();
    context.rect(x, y, this.grid.width, this.grid.height);
    context.fillStyle = 'rgba(255,255,255,'+((range-this.map.sealevel)*this.map.opacity)+')';
    context.fill();
    context.closePath();
    
  });
  
  window.MapDrawer = MapDrawer;
  
})();