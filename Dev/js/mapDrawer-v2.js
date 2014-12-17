(function(){
  
  function MapDrawer(canvas, grid, map){
    this.canvas = canvas;
    this.grid = grid;
    this.map = map;
  }
  
  MapDrawer.prototype.draw = (function(data){
    
    var x = 0,
        y = 0,
        hexHeight,
        hexRadius,
        hexRectangleHeight,
        hexRectangleWidth,
        hexagonAngle = 0.523598776, // 30 degrees in radians
        sideLength = 10*window.devicePixelRatio,
        boardWidth = 5,
        boardHeight = 5;
        
    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;
    
    // --------------
    
    // Update canvas dimensions
    this.canvas.dom.width = window.innerWidth;
    this.canvas.dom.height = window.innerHeight;
    
    var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
    canvas.width = window.innerWidth*window.devicePixelRatio;
    canvas.height = window.innerHeight*window.devicePixelRatio;
    
    context.fillStyle = "#000000";
    //context.strokeStyle = "#777777";
    context.lineWidth = 1;
    
    
    function drawHexagon(canvasContext, x, y, fill, range) {           
        var fill = fill || false;
    
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
        
    
      canvasContext.fillStyle = color[range];
      

        canvasContext.beginPath();
        canvasContext.moveTo(x + hexRadius, y);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
        canvasContext.lineTo(x, y + sideLength + hexHeight);
        canvasContext.lineTo(x, y + hexHeight);
        canvasContext.closePath();

        if(fill) {
            
            canvasContext.fill();
        } else {
            canvasContext.stroke();
        }
    }
    
    for(var i in data){
      for(var j in data[i]){
       drawHexagon(
          context, 
          i * hexRectangleWidth + ((j % 2) * hexRadius), 
          j * (sideLength + hexHeight), 
          true,
          data[i][j]
        );
      }
    }
    
    
    this.canvas.context.drawImage(canvas,-20,-20, canvas.width/window.devicePixelRatio,  canvas.height/window.devicePixelRatio);
    
  });
  
  
  
  window.MapDrawerTwo = MapDrawer;
  
})();