//Inspired by Garit flow field and particle example

class Particle {
  constructor(x, y, degree, r, g, b, generation) {
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.degree = degree;
    this.maxLife = 10 + Math.floor(Math.random() * 15);
    this.r = r;
    this.g = g;
    this.b = b;
    this.life = 0;
    this.generation = generation;
  }

  move() {
    this.lastX = this.x;
    this.lastY = this.y;

    this.x += Math.cos((this.degree / 180) * Math.PI) * Math.random() * 1;
    this.y += Math.sin((this.degree / 180) * Math.PI) * Math.random() * 1;

    this.life++;
    this.degree++;
  }

  draw() {
    push();
    stroke(this.r, this.g, this.b, 0.3);
    strokeWeight(1);
    line(this.lastX, this.lastY, this.x, this.y);
    pop();
  }
}

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
    this.acceleration.mult(0);
  }

  checkBorders() {
    if (this.position.x < 0) this.position.x = width;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.y > height) this.position.y = 0;
  }
}

let field;
const fieldSize = 50;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 2;
let agents = [];
let particles = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  background(0);
  field = generateField();
  generateAgents(200);
}

function generateField() {
  let field = [];
  noiseSeed(Math.random() * 200);
  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      const value = noise(x / divider, y / divider) * PI;
      field[x].push(p5.Vector.fromAngle(value));
    }
  }
  return field;
}

function generateAgents(count) {
  for (let i = 0; i < count; i++) {
    agents.push(new Agent(random(width), random(height), 4, 0.1));
  }
}

let zOffset = 0;

function draw() {
  background(0, 0.05);

  for (let agent of agents) {
    const x = Math.floor(agent.position.x / fieldSize);
    const y = Math.floor(agent.position.y / fieldSize);

    let noise_val = noise(x / divider, y / divider, zOffset);
    let angle = map(noise_val, 0.2, 1.0, 0.3, TWO_PI);
    let desiredDirection = p5.Vector.fromAngle(angle);

    agent.follow(desiredDirection);
    agent.update();
    agent.checkBorders();

    for (let j = 0; j < 2; j++) {
      let r = random(360);
      let g = 80 + random(20);
      let b = 80 + random(20);
      let degree = random(360);
      particles.push(
        new Particle(agent.position.x, agent.position.y, degree, r, g, b, 0)
      );
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.move();
    p.draw();
    if (p.life >= p.maxLife) {
      particles.splice(i, 1);
    }
  }
}
