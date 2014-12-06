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
      "width" : 35,
      "height" : 27,
      "xOffset" : 17,
      "yOffset" : 16
    }
    
    // Map 
    this.map = {
      "seed" : {
        "width": 7,
        "height": 3
      },
      "range" : 20,
      "opacity" : 0.05,
      "sealevel" : 5,
      "loops" : 4
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
