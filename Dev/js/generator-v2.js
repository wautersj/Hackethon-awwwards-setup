(function(){
  
  function Generator(map){
    
    this.range = map.range;
    this.seed = map.seed;
    this.loops = map.loops;
    this.smoothLoops = map.smoothLoops;
    
  };
  
  Generator.prototype.New = (function(){
    
    var data = this.NewSeed();
    for(var i = 0; i < this.loops; i++){
      data = this.Split(data);
    }
    for(var i = 0; i < this.smoothLoops; i++){
      data = this.smooth(data);
    }
    return data;
    
  });
  
  Generator.prototype.NewSeed = (function(){
  
    var data = [];
    for(var i = 0; i < this.seed.height; i++){
      data[i] = [];
      for(var j = 0; j < this.seed.width; j++){
        data[i][j] = Math.floor(Math.random() * this.range);
      }
    }
    
    /*var arr = '[';
    for(var i in data){
      arr += '[';
      for(var j in data[i]){
        arr += data[i][j]+", ";
      }
      arr += '],';
    }
    console.log(arr + ' ]');*/
    
    //data = [[5, 0, 7, 5, 5, 9, 7, 8, 6, 7, 8, 7, 5, 0, 1, 0, 9, 3 ],[8, 6, 0, 9, 2, 5, 9, 4, 1, 9, 3, 7, 9, 7, 1, 0, 4, 0 ],[9, 6, 1, 9, 8, 8, 9, 7, 2, 7, 4, 0, 4, 6, 5, 2, 5, 9 ],[4, 9, 1, 6, 9, 3, 2, 9, 2, 9, 3, 2, 0, 6, 5, 3, 2, 6 ],[5, 3, 4, 4, 3, 4, 2, 2, 8, 5, 2, 1, 6, 9, 9, 9, 5, 2 ],[5, 4, 0, 0, 7, 9, 5, 0, 2, 7, 6, 9, 6, 1, 7, 0, 0, 0 ],[6, 2, 0, 2, 0, 6, 8, 6, 7, 9, 4, 8, 8, 1, 5, 8, 5, 7 ],[0, 6, 5, 8, 5, 4, 7, 4, 4, 1, 9, 2, 2, 4, 4, 1, 5, 2 ],[3, 8, 3, 3, 2, 1, 2, 4, 1, 7, 1, 4, 8, 6, 3, 1, 9, 3 ],[5, 4, 1, 3, 9, 9, 1, 4, 2, 3, 8, 3, 1, 4, 3, 0, 4, 5 ]];
    
    return data;
  
  });
  
  Generator.prototype.Split = (function(data){
    
    data = this.Horizontal(data);
    data = this.Vertical(data);
    return data;
    
  });
    
  Generator.prototype.NewTile = (function(a, b){

    var low = (a <= b)? a : b; 
    var high = (a >= b)? a : b; 
    var range = (high-low < this.range)? (high-low)+1 : this.range;
    var tile = Math.floor(Math.random() * range)+low;
    return (tile >= 0)? tile : 0;
    
  });
    
  Generator.prototype.Horizontal = (function(old){
      
    var data = [];
    for (var i = 0; i < old.length; i++) {
      data[i] = []; 
      for (var j = 0; j < old[i].length; j++) {
        data[i].push(old[i][j]);
        data[i].push(this.addHorizontal(old, i, j));
      }
    }
    return data; 
  
  });
  
  Generator.prototype.addHorizontal = (function(range, i, j){
    
    var horizontal = 0;
    if(range[i][j-1] != undefined && range[i][j+1] != undefined){
      horizontal = parseInt((range[i][j-1]+range[i][j+1])/2);
    } else if (range[i][j-1] != undefined) {
      horizontal = range[i][j-1];
    } else {
      horizontal = range[i][j+1];
    }
    
    var vertical = 0;
    if(range[i-1] != undefined && range[i+1] != undefined){
      vertical = parseInt((range[i-1][j]+range[i+1][j])/2);
    } else if (range[i-1] != undefined) {
      vertical = range[i-1][j];
    } else {
      vertical = range[i+1][j];
    }
    
    return this.NewTile(horizontal, vertical);
    
  });
    
  Generator.prototype.Vertical = (function(old){
    
    var data = [];
    for (var i = 0; i < old.length; i++) {
      data[i*2] = old[i];
      data[(i*2)+1] = [];
      for (var j = 0; j < old[i].length; j++) {
        data[(i*2)+1].push(this.addVertical(old, i, j));
      }
    }  
    return data;
    
  });
  
  Generator.prototype.addVertical = (function(data, i, j){
    
    var tiles = [];
    if(data[i] != undefined){
      if(data[i][j-1] != undefined) {
        tiles.push(data[i][j-1]); 
      }
      if(data[i][j+1] != undefined) {
        tiles.push(data[i][j+1]); 
      }
    }
    if(data[i+1] != undefined){
      if(data[i+1][j-1] != undefined) {
        tiles.push(data[i+1][j-1]); 
      }
      if(data[i+1][j+1] != undefined) {
        tiles.push(data[i+1][j+1]); 
      }
    }
    
    var horizontal = this.parseVertical(tiles);
    
    var vertical = 0;
    if(data[i-1] != undefined && data[i+1] != undefined){
      vertical = parseInt((data[i-1][j]+data[i+1][j])/2);
    } else if (data[i-1] != undefined) {
      vertical = data[i-1][j];
    } else {
      vertical = data[i+1][j];
    }
    
    return this.NewTile(horizontal, vertical);
    
  });
  
  Generator.prototype.parseVertical = (function(tiles){
  
    if(tiles.length == 1){
      return parseInt(tiles[0]);
    } else if(tiles.length == 2){
      return parseInt((tiles[0]+tiles[1])/2);
    } else if(tiles.length == 4){
      return parseInt((tiles[0] + tiles[1]+tiles[2] + tiles[3])/2);
    }
  
    return 0;
  
  });
  
  Generator.prototype.smooth = (function(old){
    
    var data = [];
    for (var i = 0; i < old.length; i++) {
      data[i] = []; 
      for (var j = 0; j < old[i].length; j++) data[i][j] = this.smoothX(old, i, j);
    }
    
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].length; j++) data[i][j] = this.smoothO(data, i, j);
    }
    
    return data;
  });
  
  Generator.prototype.smoothX = (function(data, i, j){
    
    var tiles = [];
    var tile = 0;
    
    if(data[i-1] != undefined){
      if(data[i-1][j-1] != undefined) tiles.push(data[i-1][j-1]);
      if(data[i-1][j+1] != undefined) tiles.push(data[i-1][j+1]);
    }
    tiles.push(data[i][j]);
    if(data[i+1] != undefined){
      if(data[i+1][j-1] != undefined) tiles.push(data[i+1][j-1]);
      if(data[i+1][j+1] != undefined) tiles.push(data[i+1][j+1]);
    }
    
    for(var i in tiles) tile += parseInt(tiles[i]);
    return parseInt(tile/tiles.length);
    
  });
  
  Generator.prototype.smoothO = (function(data, i, j){
    
    var tiles = [];
    var tile = 0;

    if(data[i-1] != undefined) tiles.push(data[i-1][j]);
    if(data[i][j-1] != undefined) tiles.push(data[i][j-1]);
    if(data[i][j+1] != undefined) tiles.push(data[i][j+1]);
    if(data[i+1] != undefined) tiles.push(data[i+1][j]);
    
    for(var i in tiles) tile += parseInt(tiles[i]);
    return parseInt(tile/tiles.length);
    
  });
  
  window.GeneratorTwo = Generator;
  
})();