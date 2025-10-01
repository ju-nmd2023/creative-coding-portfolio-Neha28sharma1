const palette = [
  "#E63946",
  "#F1FA8C",
  "#457B9D",
  "#06D6A0",
  "#FF9F1C",
  "#2D3047",
  "#F77FBE",
];

class Agent {
  constructor(x, y, maxSpeed, maxForce, ribbonWidth) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;

    this.ribbonWidth = ribbonWidth;

    this.color = color(random(palette));
    this.color.setAlpha(220);

    this.trailLeft = [];
    this.trailRight = [];
  }

  follow(desiredDirection) {
    desiredDirection = desiredDirection.copy();
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.lastPosition = this.position.copy();

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.trailLeft.push(p5.Vector.add(this.position, 100));
    this.trailRight.push(p5.Vector.sub(this.position, 100));
  }

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = innerWidth;
      this.lastPosition.x = innerWidth;
    } else if (this.position.x > innerWidth) {
      this.position.x = 0;
      this.lastPosition.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = innerHeight;
      this.lastPosition.y = innerHeight;
    } else if (this.position.y > innerHeight) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
  }

  draw() {
    push();
    noStroke();
    fill(this.color);

    beginShape();
    for (let v of this.trailLeft) {
      vertex(v.x, v.y);
    }
    for (let i = this.trailRight.length - 1; i >= 0; i--) {
      let v = this.trailRight[i];
      vertex(v.x, v.y);
    }
    endShape(CLOSE);

    pop();
  }
}
function setup() {
  createCanvas(innerWidth, innerHeight);
  background("#f3f0e8");
  generateAgents();
}

function generateAgents() {
  for (let i = 0; i < 10; i++) {
    let agent = new Agent(random(innerWidth), random(innerHeight), 2);
    agents.push(agent);
  }
}

const fieldSize = 10;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 100;
let agents = [];
let zOffset = 0;
function draw() {
  for (let agent of agents) {
    const xIndex = Math.floor(agent.position.x / fieldSize);
    const yIndex = Math.floor(agent.position.y / fieldSize);

    let noise_val = noise(xIndex / divider, yIndex / divider, zOffset);
    let angle = map(noise_val, 0.0, 1.0, 0.0, PI);
    let desiredDirection = p5.Vector.fromAngle(angle);
    agent.follow(desiredDirection);
    agent.update();
    agent.checkBorders();
    agent.draw();
  }

  zOffset += 0.001;
}
