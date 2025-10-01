const size = 80;
const gap = 20;
const amount = 5;

function setup() {
  createCanvas(innerWidth, innerHeight);
  rectMode(CENTER);
}
//Inspired by grid on grid example from Garrit
function drawGrid(rotation) {
  const centerX = width / 2;
  const centerY = height / 2;
  for (let x = -Math.floor(amount / 2); x < Math.ceil(amount / 2); x++) {
    for (let y = -Math.floor(amount / 2); y < Math.ceil(amount / 2); y++) {
      let xPosition = centerX + x * (size + gap);
      let yPosition = centerY + y * (size + gap);
      if (amount % 2 === 0) {
        xPosition += size / 2;
      }
      push();
      translate(xPosition, yPosition);
      rotate(rotation);
      square(0, 0, size);

      pop();
    }
  }
}

function draw() {
  background(0);

  stroke(0, 0, 0, 20);
  strokeWeight(1);

  let alpha = 15;
  for (let i = 0; i < 16; i++) {
    stroke(0, 0, 0, alpha);
    fill(220, 240, 220, alpha);
    alpha += 15;
    drawGrid(i * 0.9);
  }

  noLoop();
}
