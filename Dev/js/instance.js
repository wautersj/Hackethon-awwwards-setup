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
      "width" : 5,
      "height" : 5
    }
    
    // Map 
    this.map = {
      "seed" : {
        "width": 20,
        "height": 12
      },
      "range" : 10,
      "opacity" : 0.05,
      "sealevel" : 2,
      "loops" : 4,
      "smoothLoops" : 2,
      "color" : true
    }
    
    // MapOld 
    this.mapOld = {
      "seed" : {
        "width": 20,
        "height": 12
      },
      "range" : 19,
      "opacity" : 0.05,
      "loops" : 6,
      "color" : true
    }
    
  };
  
  Instance.prototype.Init = (function (){
    
    //this.generator = new Generator(this.mapOld);
    this.generator = new GeneratorTwo(this.map);
    this.mapDrawer = new MapDrawer(this.canvas, this.grid, this.map);
    
    // Generate map data
    this.data = this.generator.New();
    
    // Draw map data on canvas
    this.mapDrawer.draw(this.data);
    
  });
  
  window.Instance = Instance;
  
})();
