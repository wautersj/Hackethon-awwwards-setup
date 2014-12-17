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
      "width" : 25,
      "height" : 25
    }
    
    // Map 
    this.map = {
      "seed" : {
        "width": 12,
        "height": 20
      },
      "range" : 10,
      "opacity" : 0.05,
      "sealevel" : 2,
      "loops" : 4,
      "smoothLoops" : 1,
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
