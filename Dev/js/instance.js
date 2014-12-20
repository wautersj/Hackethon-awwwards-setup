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
    
    this.canvas.dom.style.background = "#303056";
    
    this.generator = new Generator(this.map);
    this.mapDrawer = new MapDrawer(this.canvas, this.grid, this.map);
    this.shift = 0;
    
    // Generate map data
    this.data = this.generator.New();
    
    var self= this;
    window.onresize = function(event) {
      self.mapDrawer.draw(self.data, self.shift);
    }
    
    this.Play(); 
    
  });
  
  Instance.prototype.Play = (function(){
    
    var self = this;
    self.shift = 20;
    
    self.mapDrawer.draw(self.data, self.shift);
      
    self.loop = setInterval(function(){
      self.mapDrawer.draw(self.data, self.shift);
      self.shift = self.shift-1;
      if(self.shift < 0){
        self.shift = 0;
        clearInterval(self.loop);
      }
    }, 50);
    
  });
  
  window.Instance = Instance;
  
})();
