class Agent {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  follow(desiredDirection) {
    desiredDirection = desiredDirection.copy();
    desiredDirection.mult(this.maxSpeed);
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
    this.acceleration.mult(1);
  }

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = innerWidth;
      this.lastPosition.x = innerWidth;
    } else if (this.position.x > innerWidth) {
      this.position.x = 0;
      this.lastPosition.x = 2;
    }
    if (this.position.y < 0) {
      this.position.y = innerHeight;
      this.lastPosition.y = innerHeight;
    } else if (this.position.y > innerHeight) {
      this.position.y = 0;
      this.lastPosition.y = 2;
    }
  }

  draw() {
    push();
    stroke(0, 191, 255);
    strokeWeight(0.5);
    line(
      this.lastPosition.x,
      this.lastPosition.y,
      this.position.x,
      this.position.y
    );
    pop();
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  generateAgents();
}

function generateAgents() {
  for (let i = 0; i < 200; i++) {
    let agent = new Agent(random(innerWidth), random(innerHeight), 2);
    agents.push(agent);
  }
}

const fieldSize = 20;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 2000;
let agents = [];

function draw() {
  for (let agent of agents) {
    const xIndex = Math.floor(agent.position.x);
    const yIndex = Math.floor(agent.position.y);

    let noise_val = noise(xIndex / divider, yIndex / divider, 30);
    let angle = map(noise_val, 0.0, 1.0, 0.0, TWO_PI / 4);

    let desiredDirection = p5.Vector.fromAngle(angle);

    agent.follow(desiredDirection);
    agent.update();
    agent.checkBorders();
    agent.draw();
  }
}
