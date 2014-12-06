(function(){
  
  function Instance(){
    
    // Variables
    this.data = [];
    
    // Canvas 
    this.canvas = {
      "dom" : document.getElementById("myCanvas"),
      "context" : document.getElementById("myCanvas").getContext('2d')
    };
    
    // Grid
    this.grid = {
      "width" : 8,
      "height" : 8,
      "xOffset" : 0,
      "yOffset" : 0
    }
    
    // Map 
    this.map = {
      "seed" : {
        "width": 10,
        "height": 8
      },
      "range" : 19,
      "opacity" : 0.05,
      "sealevel" : -5,
      "loops" : 5,
      "color" : true
    }
    
  };
  
  Instance.prototype.Init = (function (){
    
    this.generator = new Generator(this.map);
    this.mapDrawer = new MapDrawer(this.canvas, this.grid, this.map);
    
    // Generate map data
    this.data = this.generator.New();
    
    // Draw map data on canvas
    this.mapDrawer.draw(this.data);
    
  });
  
  window.Instance = Instance;
  
})();
