var Bike = function (x, y, direction, speed, radius, color) {
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.speed = speed;
  this.radius = radius;
  this.color = color;
  this.last_x = x;
  this.last_y = y;
  this.location_trail = []
};

Bike.prototype.move = function() {
  move(this);
}

function move(bike){
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

  // console.log("x: " + bike.x);
  // console.log("y: " + bike.y);
  // console.log("direction: " + bike.direction);

  angle = bike.direction * (Math.PI/180);
  bike.x += Math.cos(angle) * bike.speed;
  bike.y += Math.sin(angle) * bike.speed;

  if ((bike.x >= (bike.last_x + 35)) || (bike.x <= (bike.last_x - 35)) || (bike.y >= (bike.last_y + 27)) || (bike.y <= (bike.last_y - 27))) {

    var location = {
      x: bike.x,
      y: bike.y
    }

    bike.location_trail.push(location)

    if ((bike.x >= (bike.last_x + 35)) || (bike.x <= (bike.last_x - 35))){
      if (bike.x < bike.last_x){
        bike.x = bike.last_x - 35
        if (bike.x < 18){
          bike.x = 18;
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
          bike.y = 17;
        }
      } else {
        bike.y = bike.last_y + 27
      }
      bike.last_y = bike.y
    }

    var randomnumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    if (randomnumber == 5 ||
        (bike.x <= 18 && bike.direction == 180) ||
        (bike.y <= 17 && bike.direction == 270) ||
        (bike.x >= right_border && bike.direction == 0) ||
        (bike.y >= bottom_border && bike.direction == 90)){
      bike.direction = get_new_direction(bike.direction, bike.x, bike.y, bottom_border, right_border);
    }
  }
};

function get_new_direction(current_direction, x, y, bottom_border, right_border) {
  //console.log("current_direction: " + current_direction);
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
