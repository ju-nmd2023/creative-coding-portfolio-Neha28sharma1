const size = 30;
const gap = 10;

function setup() {
  createCanvas(innerWidth, innerHeight);
}
function draw() {
  background(225, 225, 225);
  noFill();
  stroke(0);
  strokeWeight(1);
  // inspired by grid example
  for (let x = gap; x < width; x += size + gap) {
    for (let y = gap; y < height; y += size + gap) {
      rect(x, y, size, size);
      line(x, y, x + size, y + size);
      line(x + size, y, x, y + size);
      let r = random(255);
      let g = random(255);
      let b = random(255);
      fill(r, g, b);
      ellipse(x + size / 2, y + size / 2, size / 2);
    }
  }
  noLoop();
}
