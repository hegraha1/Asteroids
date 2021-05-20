var ship;
var asteroids = [];
var lasers = [];

function setup() {
  createCanvas(400, 400);
  ship = new Ship();
  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);

  for (let i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log("oops!");
      if (asteroids[i].r > 10) {
        var newAsteroids = asteroids[i].breakup();
        asteroids = asteroids.concat(newAsteroids);
      }
      asteroids.splice(i, 1);
      break;
    }
  }

  ship.render();
  ship.control();
  ship.update();

  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].render();
    asteroids[i].update();
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            let newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }
}
