(function(){
  
  function Instance(){
    
    // Variables
    this.data = [];
    
    // Canvas 
    this.canvas = {
      "dom" : document.getElementById("myCanvas"),
      "context" : document.getElementById("myCanvas").getContext('2d')
    };
    
    // Map 
    this.map = {
      "seed" : {
        "width": 12,
        "height": 18
      },
      "range" : 10,
      "loops" : 3,
      "smoothLoops" : 1
    }
    
  };
  
  Instance.prototype.Init = (function (){
    
    this.generator = new Generator(this.map);
    this.mapDrawer = new MapDrawer(this.canvas, this.grid, this.map);
    
    // Generate map data
    this.data = this.generator.New();
    
    // Draw map data on canvas
    //this.mapDrawer.draw(this.data);
    
    this.Play();
    
    
  });
  
  Instance.prototype.Play = (function(){
    
    var self = this;
    self.shift = 20;
    
    self.loop = setInterval(function(){
      self.mapDrawer.draw(self.data, self.shift);
      self.shift = self.shift-1;
      if(self.shift < 0) clearInterval(self.loop);
    }, 10);
    
  });
  
  window.Instance = Instance;
  
})();
