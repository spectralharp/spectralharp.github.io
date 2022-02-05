import './Background.scss';

import sparkle1 from '../images/sparkle1.png';
import sparkle2 from '../images/sparkle2.png';
import sparkle3 from '../images/sparkle3.png';
import sparkle4 from '../images/sparkle4.png';

import { useCallback } from "react";

let context = null;
let canvas = null;
let started = false;
const canvasPos = { x: 0, y: 0 };
const currentPos = { x: 0, y: 0 };
const mousePos = { x: 0, y: 0 };

const maxSize = 15;
const trailLength = 20;
const followRadius = 80;
const speed = 0.005;
const trail = [];
const sparkles = [];

window.addEventListener("mousemove", setMousePosition, false);

export default function Home() {
  const canvasRef = useCallback(async node => {
    if(node === null) return;
    canvas = node;
    context = node.getContext('2d');
    getPosition(canvas);
    if(!started) {
      started = true;
      sparkles.push(await loadImage(sparkle1));
      sparkles.push(await loadImage(sparkle2));
      sparkles.push(await loadImage(sparkle3));
      sparkles.push(await loadImage(sparkle4));
      updateCanvas();
    }
  }, []);

  return (
    <canvas width='1920' height='1080' ref={canvasRef} aria-label='background canvas with animated stars'></canvas>
  );
}

/**
 * Creates and returns the image element with given souce
 * @param {string} src - source of the image
 * @returns {Promise} - resolves to the image element if the image loads successfully
 */
function loadImage(src) {
  let img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;

  while (el) {
    xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
    yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    el = el.offsetParent;
  }
  canvasPos.x = xPosition;
  canvasPos.y = yPosition;
}

function setMousePosition(e) {
  mousePos.x = e.clientX - canvasPos.x;
  mousePos.y = e.clientY - canvasPos.y;
}

let lastTime = null;

function updateCanvas(now) {
  if(canvas === null) return;

  if(lastTime == null) {
    lastTime = now;
  }

  if(now >= lastTime) {
    const dt = now - lastTime;
    timer += dt;
    if(timer >= spawnTime) {
      timer = 0;
      if(particleCount < maxCount) {
        new Particle();
      }
    }
  }


  context.canvas.width  = window.innerWidth;
  context.canvas.height = window.innerHeight;

  context.clearRect(0, 0, canvas.width, canvas.height);

  for(let k in particles) {
    particles[k].draw();
  }

  const nextPos = moveTowards(currentPos, mousePos, 4, now, speed, followRadius);

  for (let i = 0; i < trail.length; i++) {
    drawCircle(trail[i], maxSize * ((i + 1) / trail.length));
  }

  drawCircle(nextPos, maxSize);
  updateTrail(currentPos.x, currentPos.y);
  currentPos.x = nextPos.x;
  currentPos.y = nextPos.y;

  lastTime = now;

  requestAnimationFrame(updateCanvas);
}

function updateTrail(posX, posY) {
  trail.push({x: posX, y: posY});
  if (trail.length > trailLength) {
    trail.shift();
  }
}

function drawCircle(pos, r) {
  context.beginPath();
  context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, true);
  context.fillStyle = "#e0e2db";
  context.closePath();
  context.fill();
}

function moveTowards(current, target, maxDistanceDelta, t, s, r) {

  if(isNaN(current.x)) {
    current.x = 0;
  }

  if(isNaN(current.y)) {
    current.y = 0;
  }

  let offsetX = Math.cos(t * s) * r;
  let offsetY = Math.sin(t * s) * r;

  let dirX = target.x - current.x + offsetX;
  let dirY = target.y - current.y + offsetY;
  let magnitude = Math.sqrt(dirX * dirX + dirY * dirY);

  if(magnitude === 0) {
    return current;
  }

  dirX /= magnitude;
  dirY /= magnitude;
  dirX *= maxDistanceDelta;
  dirY *= maxDistanceDelta;

  const nextPos = {x: current.x + dirX, y: current.y + dirY};

  return nextPos;
}

const particles = {};
const gravity = 0;
const maxLife = 180;
const startSize = 0.5;
const startSizeRandom = -0.25;
const spawnTime = 100;
const maxCount = 80;


let particleId = 0;
let timer = 0;
let particleCount = 0;

const avoidRadius = 80;

function Particle() {
  if(canvas === null) return;

  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;

  // Random X and Y velocities
  this.vx = 0;
  this.vy = -0.01;
  this.life = 0;
  this.id = particleId;
  this.image = sparkles[Math.floor(Math.random() * sparkles.length)];
  this.size = startSize + startSizeRandom * Math.random();
  particles[particleId] = this;
  particleId++;
  particleCount++;
}

Particle.prototype.draw = function() {

  if(withinDist(mousePos, this, avoidRadius)) {
    let dirX = this.x - mousePos.x;
    let dirY = this.y - mousePos.y;
    let magnitude = Math.sqrt(dirX * dirX + dirY * dirY);

    if(magnitude !== 0) {
      dirX /= magnitude;
      dirY /= magnitude;
      this.vx += dirX;
      this.vy += dirY;
    }
  }

  if(withinDist(currentPos, this, avoidRadius)) {
    let dirX = this.x - currentPos.x;
    let dirY = this.y - currentPos.y;
    let magnitude = Math.sqrt(dirX * dirX + dirY * dirY);

    if(magnitude !== 0) {
      dirX /= magnitude;
      dirY /= magnitude;
      this.vx += dirX;
      this.vy += dirY;
    }
  }


  this.x += this.vx;
  this.y += this.vy;

  // Adjust for gravity
  this.vy += gravity;

  // Age the particle
  this.life++;

  // If Particle is old, remove it
  if (this.life >= maxLife) {
    particleCount--;
    delete particles[this.id];
  }

  const size = this.size * Math.cos(this.life / maxLife * Math.PI - Math.PI / 2);
  context.drawImage(this.image, this.x, this.y, this.image.naturalWidth * size, this.image.naturalHeight * size);
}

function withinDist(pos1, pos2, distance) {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return (dx * dx + dy * dy) <= distance * distance;
}