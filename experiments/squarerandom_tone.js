const size = 30;
const gap = 10;

let synth;
let scale = ["C3", "D3", "E3", "G3", "A3", "C4", "D4", "E4", "G4", "A4"];

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(2);
  synth = new Tone.PolySynth().toDestination();
}
function draw() {
  background(225, 225, 225);
  noFill();
  stroke(0);
  strokeWeight(1);
  const note = scale[Math.floor(random(scale.length))];
  synth.triggerAttackRelease(note, "4n");

  // inspired by grid example
  for (let x = gap; x < width; x += size + gap) {
    for (let y = gap; y < height; y += size + gap) {
      if (random(1) < 0.7) {
        fill(random(255), random(255), random(255));
      } else {
        noFill();
      }
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
}

function mousePressed() {
  Tone.start();
}
