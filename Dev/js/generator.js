(function(){
  
  function Generator(map){
    
    this.range = map.range;
    this.seed = map.seed;
    this.loops = map.loops;
    
  };
  
  Generator.prototype.New = (function(){
    
    var data = this.NewSeed();
    for(var i = 0; i < this.loops; i++){
      data = this.Split(data);
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
    return data;
  
  });
  
  Generator.prototype.Split = (function(data){
    
    data = this.SplitHorizontal(data);
    data = this.SplitVertical(data);
    data = this.SplitCentral(data);
    return data;
    
  });
    
  Generator.prototype.SplitHorizontal = (function(oldData){
      
    var newData = [];
    for (var i in oldData) {
      newData[i] = [];
      for (var j in oldData[i]) {
        // Push old value
        newData[i].push(oldData[i][j]);
        // Push new value
        var first = oldData[i][j];
        var last = (oldData[i][(parseInt(j)+1)] == undefined)? Math.floor(Math.random() * this.range) : oldData[i][(parseInt(j)+1)] ;
        newData[i].push(this.NewTile(first, last));
      }
    }
    return newData; 
  
  });
    
  Generator.prototype.SplitVertical = (function(oldData){
    
    var newData = [];
    for (var i in oldData) {
      newData[(i*2)] = oldData[i];
      newData[((i*2)+1)] = [];
      var odd = true;
      for(var j = 0; j < oldData[i].length; j++){
        if (odd == true){
          var first = (oldData[(parseInt(i)-1)] == undefined)? Math.floor(Math.random() * this.range) : oldData[(parseInt(i)-1)][j] ;
          var last = (oldData[(parseInt(i)+1)] == undefined)? Math.floor(Math.random() * this.range) : oldData[(parseInt(i)+1)][j] ;
          newData[((i*2)+1)].push(this.NewTile(first, last));
          odd = false;
        } else {
          newData[((i*2)+1)].push(0);
          odd = true;
        }
      }
    }
    return newData; 
  
  });
    
  Generator.prototype.SplitCentral = (function(oldData){
    
    var newData = [];
    var odd = false;
    for(var i in oldData){
      if (odd == true){
        odd = false
        for(var j in oldData[i]){
          if (odd == true){
            odd = false;
            oldData[i][j] = this.NewCentrTile(oldData, i, j);
          } else {
            odd = true;
          }
        }
        odd = false;
      } else {
        odd = true
      }
    }
    
    return oldData; 
    
  });
    
  Generator.prototype.NewTile = (function(first, last){
    
    var low = (first <= last)? first : last; 
    var high = (first >= last)? first : last; 
    return Math.floor(Math.random() * (high-low))+low;
    
  });
    
  Generator.prototype.NewCentrTile = (function(data, i, j){
    
    var left = (data[i][(parseInt(j)-1)] == undefined)? Math.floor(Math.random() * this.range) : data[i][(parseInt(j)-1)] ;
    var right = (data[i][(parseInt(j)+1)] == undefined)? Math.floor(Math.random() * this.range) : data[i][(parseInt(j)+1)] ;
    var top = (data[(parseInt(i)-1)] == undefined)? Math.floor(Math.random() * this.range) : data[(parseInt(i)-1)][j] ;
    var bottom = (data[(parseInt(i)+1)] == undefined)? Math.floor(Math.random() * this.range) : data[(parseInt(i)+1)][j] ;
    
    var first = Math.floor((left+right)/2);
    var last = Math.floor((top+bottom)/2);
    
    return this.NewTile(first, last);
    
  });
  
  window.Generator = Generator;
  
})();