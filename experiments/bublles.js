// inspired by grid on grid examples and perlin noise from the Garrit videos

const size = 20;
const gap = 20;
const amount = 20;
const numRows = 60;
const numCols = 60;
const divider = 10;

function setup() {
  createCanvas(innerWidth, innerHeight);

  brightColors = [
    color(15, 225, 156),
    color(35, 127, 218),
    color(116, 255, 224),
    color(90, 158, 216),
    color(25, 255, 216),
  ];
  frameRate(2);

  position = createVector(innerWidth / 2, innerHeight / 2);
  velocity = createVector(5, 8);
}

function drawGrid(rotation) {
  for (let x = -Math.floor(amount / 2); x < Math.ceil(amount / 2); x++) {
    for (let y = -Math.floor(amount / 2); y < Math.ceil(amount / 2); y++) {
      let xPosition = position.x + x * (size + 10);
      let yPosition = position.y + y * (size + 10);
      if (amount % 10 === 0) {
        xPosition += size;
      }

      push();
      translate(xPosition, yPosition);
      rotate(rotation);

      let c = random(brightColors);
      stroke(c);
      noFill();
      for (let i = 0; i < 10; i++) {
        ellipse(position.x, position.y, size + 20);
      }

      for (y = 0; y < numRows; y++) {
        for (x = 0; x < numCols; x++) {
          const value =
            noise(position.x / divider, position.y / divider) * size;

          ellipse(size / 2 + x * size, size / 2 + y * size, divider);
        }
      }

      pop();
    }
  }
}

function draw() {
  background(0);

  stroke(0, 0, 0, 20);
  strokeWeight(0.4);
  drawGrid(0);

  let alpha = 20;
  for (let i = 0; i < 15; i++) {
    stroke(0, 0, 0, alpha);

    fill(220, 240, 220, alpha);
    alpha += 15;

    drawGrid(i * 0.1);
  }
}
