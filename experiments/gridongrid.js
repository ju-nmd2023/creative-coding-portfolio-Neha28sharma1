const size = 80;
const gap = 15;
const amount = 20;

function setup() {
  createCanvas(innerWidth, innerHeight);
  rectMode(CENTER);

  brightColors = [
    color(255, 0, 0), // red
    color(255, 255, 0), // yellow
    color(0, 255, 0), // green
    color(0, 0, 255), // blue
    color(255, 0, 255), // magenta / pink
    color(255, 255, 255), // white
  ];
}

function drawGrid(rotation) {
  const centerX = width / 2;
  const centerY = height / 2;
  for (let x = -Math.floor(amount / 2); x < Math.ceil(amount / 2); x++) {
    for (let y = -Math.floor(amount / 2); y < Math.ceil(amount / 2); y++) {
      let xPosition = centerX + x * (size + gap);
      let yPosition = centerY + y * (size + gap);
      if (amount % 10 === 0) {
        xPosition += size;
      }
      push();
      translate(xPosition, yPosition);
      rotate(rotation);

      let c = random(brightColors);
      stroke(c);
      noFill();
      for (let i = 0; i < 9; i++) {
        square(0, 0, 80);
      }

      pop();
    }
  }
}

function draw() {
  background(0);

  stroke(0, 0, 0, 20);
  strokeWeight(0.2);
  drawGrid(0);

  let alpha = 15;
  for (let i = 0; i < 16; i++) {
    stroke(0, 0, 0, alpha);
    fill(220, 240, 220, alpha);
    alpha += 25;

    drawGrid(i * 0.1);
  }

  noLoop();
}
