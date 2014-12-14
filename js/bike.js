var Bike = function (x, y, direction, speed, radius, color) {
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.rotation = 0;
  this.speed = speed;
  this.radius = radius;
  this.color = color;
  this.last_x = x;
  this.last_y = y;
  this.location_trail = []
};

Bike.prototype.move = function(bikes) {
  var bike = this;
  var bikes = bikes;

  var borders = getBorders();

  bike = moveBike(bike);

  passed_grid_crossing = passedGridCrossing(bike);

  if (passed_grid_crossing) {
    bike = putBikeOnCrossing(bike, borders);

    var gonna_collide_with_border = borderCollision(bike, borders);
    var gonna_collide_with_bike_trail = trailCollision(bike, bikes);
    var want_to_change_direction = wantToChangeDirection();

    if (gonna_collide_with_bike_trail || gonna_collide_with_border){
      var available_directions = availableDirections(bike, bikes, borders);
      console.log('gonna collide, available_directions');
      console.log(available_directions);
      //bike.speed = 0;
      //use available directions to get direction
      if (available_directions.length == 0){
        bike.speed = 0;
      } else{
        bike.direction = available_directions[Math.floor(Math.random()*available_directions.length)];
      }
    } else if (want_to_change_direction){
      var available_directions = availableDirections(bike, bikes, borders);
      console.log('wanne change direction, available_directions');
      console.log(available_directions);
      if (available_directions.length != 0){
        bike.direction = available_directions[Math.floor(Math.random()*available_directions.length)];
      }

      //$(bike).animate({direction: newTargetDirection}, 200);

      //use available directions to get direction
      //still need to write algortime :p
    }

    bike = logBikeLocation(bike);
  }

  bike.rotation = bike.direction;
  //bike.rotation += (bike.direction-bike.rotation)/4;
};

function moveBike(bike){
  angle = bike.direction * (Math.PI/180);
  bike.x += Math.cos(angle) * bike.speed;
  bike.y += Math.sin(angle) * bike.speed;
  return bike;
};

function passedGridCrossing(bike){
  if ((bike.x >= (bike.last_x + 35)) || (bike.x <= (bike.last_x - 35)) || (bike.y >= (bike.last_y + 27)) || (bike.y <= (bike.last_y - 27))) {
    return true;
  } else {
    return false;
  }
};

function putBikeOnCrossing(bike, borders){
  if ((bike.x >= (bike.last_x + 35)) || (bike.x <= (bike.last_x - 35))){
    if (bike.x < bike.last_x){
      bike.x = bike.last_x - 35
      if (bike.x < 18){
        bike.x = borders[3];
      }
    } else {
      bike.x = bike.last_x + 35
    }
    bike.last_x = bike.x
  }

  if ((bike.y >= (bike.last_y + 27)) || (bike.y <= (bike.last_y - 27))){
    if (bike.y < bike.last_y){
      bike.y = bike.last_y - 27
      if (bike.y < 17){
        bike.y = borders[0];
      }
    } else {
      bike.y = bike.last_y + 27
    }
    bike.last_y = bike.y
  }

  return bike;
};

function logBikeLocation(bike){
  var location = {
    x: bike.x,
    y: bike.y
  }

  bike.location_trail.push(location)

  return bike;
};

function borderCollision(bike, borders){
  if ((bike.x <= 18 && bike.direction == 180) || (bike.y <= 17 && bike.direction == 270) ||
      (bike.x >= borders[1] && bike.direction == 0) || (bike.y >= borders[2] && bike.direction == 90)){
    return true;
  } else {
    return false;
  }
};

function wantToChangeDirection(){
  var randomnumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  if (randomnumber == 5){
    return true;
  } else {
    return false;
  }
};

function trailCollision(bike, bikes){
  var trail_collision = false;

  angle = bike.direction * (Math.PI/180);
  var x_offset = 0;
  var y_offset = 0;

  if (bike.direction == 270){
    x_offset = 0;
    y_offset = 27;
  } else if (bike.direction == 0) {
    x_offset = -35;
    y_offset = 0;
  } else if (bike.direction == 90) {
    x_offset = 0;
    y_offset = -27;
  } else if (bike.direction == 180) {
    x_offset = 35;
    y_offset = 0;
  }

  for (var i = bikes.length - 1; i >= 0; i--) {
    for (var u = bikes[i].location_trail.length - 1; u >= 0; u--) {
      if ((bikes[i].location_trail[u]['x'] + x_offset) == bike.x && (bikes[i].location_trail[u]['y'] + y_offset) == bike.y){
        trail_collision = true;
        // console.log("collision with trail");
      }
    };
  };

  return trail_collision;
};

function availableDirections(bike, bikes, borders){
  var directions = [0, 90, 180, 270];
  var current_direction = bike.direction;

  // remove current direction
  directions = remove_item(directions, current_direction);

  // remove the opposite direction from possible new directions
  if (current_direction == 270 || current_direction == 180) {
    direction_to_remove = parseFloat(current_direction) - parseFloat(180);
    directions = remove_item(directions, direction_to_remove);
  } else if (current_direction == 90 || current_direction == 0) {
    direction_to_remove = parseFloat(current_direction) + parseFloat(180);
    directions = remove_item(directions, direction_to_remove);
  }

  // remove direction that collides with trail
  for (var i = directions.length - 1; i >= 0; i--) {
    if (directions[i] == 270){
      x_offset = 0;
      y_offset = 27;
      for (var o = bikes.length - 1; o >= 0; o--) {
        for (var u = bikes[o].location_trail.length - 1; u >= 0; u--) {
          if ((bikes[o].location_trail[u]['x'] + x_offset) == bike.x && (bikes[o].location_trail[u]['y'] + y_offset) == bike.y){
            directions = remove_item(directions, directions[i]);
          }
        };
      };
    } else if (directions[i] == 0) {
      x_offset = -35;
      y_offset = 0;
      for (var o = bikes.length - 1; o >= 0; o--) {
        for (var u = bikes[o].location_trail.length - 1; u >= 0; u--) {
          if ((bikes[o].location_trail[u]['x'] + x_offset) == bike.x && (bikes[o].location_trail[u]['y'] + y_offset) == bike.y){
            directions = remove_item(directions, directions[i]);
          }
        };
      };

    } else if (directions[i] == 90) {
      x_offset = 0;
      y_offset = -27;
      for (var o = bikes.length - 1; o >= 0; o--) {
        for (var u = bikes[o].location_trail.length - 1; u >= 0; u--) {
          if ((bikes[o].location_trail[u]['x'] + x_offset) == bike.x && (bikes[o].location_trail[u]['y'] + y_offset) == bike.y){
            directions = remove_item(directions, directions[i]);
          }
        };
      };

    } else if (directions[i] == 180) {
      x_offset = 35;
      y_offset = 0;
      for (var o = bikes.length - 1; o >= 0; o--) {
        for (var u = bikes[o].location_trail.length - 1; u >= 0; u--) {
          if ((bikes[o].location_trail[u]['x'] + x_offset) == bike.x && (bikes[o].location_trail[u]['y'] + y_offset) == bike.y){
            directions = remove_item(directions, directions[i]);
          }
        };
      };
    }
  };


  // remove directions that collide with border
  // top/bottom border
  if (bike.y == borders[0]) {
    direction_to_remove = parseFloat(270);
    directions = remove_item(directions, direction_to_remove);
  } else if (bike.y == borders[2]) {
    direction_to_remove = parseFloat(90);
    directions = remove_item(directions, direction_to_remove);
  }

  // left/right border
  if (bike.x == borders[3]) {
    direction_to_remove = parseFloat(180);
    directions = remove_item(directions, direction_to_remove);
  } else if (bike.x == borders[1]) {
    direction_to_remove = parseFloat(0);
    directions = remove_item(directions, direction_to_remove);
  }


  return directions;
};

function get_new_direction(current_direction, x, y, bottom_border, right_border) {
  // console.log("current_direction: " + current_direction);
  var directions = [ 0, 90, 180, 270];

  // remove current direction from possible new directions
  var direction_index = directions.indexOf(current_direction);
  directions.splice(direction_index, 1);

  // remove the opposite direction from possible new directions
  if (current_direction == 270 || current_direction == 180) {
    direction_to_remove = parseFloat(current_direction) - parseFloat(180);
    directions = remove_item(directions, direction_to_remove);
  } else if (current_direction == 90 || current_direction == 0) {
    direction_to_remove = parseFloat(current_direction) + parseFloat(180);
    directions = remove_item(directions, direction_to_remove);
  }

  // if at the top prevent the up direction
  if (y == 17) {
    direction_to_remove = parseFloat(270);
    directions = remove_item(directions, direction_to_remove);
  } else if (y == bottom_border) {
    direction_to_remove = parseFloat(90);
    directions = remove_item(directions, direction_to_remove);
  }

  // if at the left border prevent left direction
  if (x == 18) {
    direction_to_remove = parseFloat(180);
    directions = remove_item(directions, direction_to_remove);
  } else if (x == right_border) {
    direction_to_remove = parseFloat(0);
    directions = remove_item(directions, direction_to_remove);
  }

  return directions[Math.floor(Math.random()*directions.length)];
  // console.log("x: " + bike.x);
  // console.log("y: " + bike.y);
  // console.log("direction: " + bike.direction);
}

function remove_item(array, item){
  item_index = array.indexOf(item);
  if (item_index > -1) {
    array.splice(item_index, 1);
  }
  return array;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function getBorders(){
    // detect borders
  var right_border = 18;
  while(right_border < window.innerWidth){
    right_border += 35;
  }
  right_border -= 35;

  var bottom_border = 17;
  while(bottom_border < window.innerHeight){
    bottom_border += 27;
  }
  bottom_border -= 27;
  var left_border = 18;
  var top_border = 17;

  return [top_border, right_border, bottom_border, left_border]
}
