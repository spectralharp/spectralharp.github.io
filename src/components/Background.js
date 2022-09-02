import './Background.scss';

import sparkle1 from '../images/sparkle1.png';
import sparkle2 from '../images/sparkle2.png';
import sparkle3 from '../images/sparkle3.png';
import sparkle4 from '../images/sparkle4.png';

import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

let context = null;
let canvas = null;
let started = false;
let renderSoul = true;
const canvasPos = { x: 0, y: 0 };
const currentPos = { x: 0, y: 0 };
const mousePos = { x: 0, y: 0 };

const maxSize = 15;
const trailLength = 20;
const followRadius = 80;
const speed = 0.005;
const trail = [];
const sparkles = [];

const sparkleSpawner = new ParticleSystem(Particle, {
  gravity: 0,
  maxLife: 180,
  startSize: 0.3,
  startSizeRandom: -0.2,
  spawnTime: 100,
  maxCount: 100
});
const lineSpawner = new ParticleSystem(Line, {
  gravity: 3,
  maxLife: 40,
  startSize: 1,
  startSizeRandom: 0,
  spawnTime: 3200,
  maxCount: 2
});

window.addEventListener("mousemove", setMousePosition, false);

export default function Home() {

  let location = useLocation();

  useEffect(() => {
    // Only render soul on certain paths
    renderSoul =
      location.pathname === '/' || location.pathname === '/games/devoid' || location.pathname === '/projects/portfolio';
  }, [location]);

  // Grab canvas;
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
    <>
    <canvas width='1920' height='1080' ref={canvasRef} aria-hidden></canvas>
    <div className='plus-grid'>
    </div>
    <div className='dot-grid'>
    </div>
    </>
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

// Draw stars
function updateCanvas(now) {
  if(canvas === null) return;

  if(lastTime == null) {
    lastTime = now;
  }

  sparkleSpawner.trySpawn(now);
  lineSpawner.trySpawn(now);

  context.canvas.width  = window.innerWidth;
  context.canvas.height = window.innerHeight;

  context.clearRect(0, 0, canvas.width, canvas.height);

  sparkleSpawner.draw();
  lineSpawner.draw();

  const nextPos = moveTowards(currentPos, mousePos, 4, now, speed, followRadius);

  if(renderSoul) {
    for (let i = 0; i < trail.length; i++) {
      drawCircle(trail[i], maxSize * ((i + 1) / trail.length));
    }

    drawCircle(nextPos, maxSize);
    updateTrail(currentPos.x, currentPos.y);
  }
  currentPos.x = nextPos.x;
  currentPos.y = nextPos.y;

  context.font = `10px Consolas, monospace`;
  const info = `> (${mousePos.x.toFixed(2)}, ${mousePos.y.toFixed(2)}) | UNIX / ${Date.now()}`;
  const infoMetric = context.measureText(info);
  const infoWidth = infoMetric.width;

  context.fillStyle = 'gray';
  context.fillText(
    info,
    canvas.width - 50 - infoWidth,
    canvas.height - 110
  );

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

function ParticleSystem(particle, { gravity, maxLife, startSize, startSizeRandom, spawnTime, maxCount }) {
  this.particle = particle;
  this.particles = {};
  this.gravity = gravity;
  this.maxLife = maxLife;
  this.startSize = startSize;
  this.startSizeRandom = startSizeRandom;
  this.spawnTime = spawnTime;
  this.maxCount = maxCount;

  this.particleId = 0;
  this.timer = 0;
  this.particleCount = 0;
}

ParticleSystem.prototype.trySpawn = function(now) {
  if(now >= lastTime) {
    const dt = now - lastTime;
    this.timer += dt;
    if(this.timer >= this.spawnTime) {
      this.timer = 0;
      if(this.particleCount < this.maxCount) {
        new this.particle(this);
      }
    }
  }
}

ParticleSystem.prototype.draw = function() {
  for(let k in this.particles) {
    this.particles[k].draw(this);
  }
}

const avoidRadius = 80;

function Particle(ps) {
  if(canvas === null) return;

  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;

  // Random X and Y velocities
  this.vx = 0;
  this.vy = -0.01;
  this.life = 0;
  this.id = ps.particleId;
  this.image = sparkles[Math.floor(Math.random() * sparkles.length)];
  this.size = ps.startSize + ps.startSizeRandom * Math.random();
  ps.particles[ps.particleId] = this;
  ps.particleId++;
  ps.particleCount++;
}

Particle.prototype.draw = function(ps) {

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
  this.vy += ps.gravity;

  // Age the particle
  this.life++;

  // If Particle is old, remove it
  if (this.life >= ps.maxLife) {
    ps.particleCount--;
    delete ps.particles[this.id];
  }

  const size = this.size * Math.cos(this.life / ps.maxLife * Math.PI - Math.PI / 2);
  context.drawImage(this.image, this.x, this.y, this.image.naturalWidth * size, this.image.naturalHeight * size);
}

function Line(ps) {
  if(canvas === null) return;

  this.x1 = Math.random() * canvas.width;
  this.y1 = Math.random() * canvas.height / 2;

  this.x2 = this.x1;
  this.y2 = this.y1;

  this.vx1 = -60;
  this.vy1 = 60;

  this.vx2 = -60;
  this.vy2 = 60;

  this.life = 0;
  this.id = ps.particleId;
  this.size = ps.startSize;

  ps.particles[ps.particleId] = this;
  ps.particleId++;
  ps.particleCount++;
}

Line.prototype.draw = function(ps) {

  if (this.life < ps.maxLife / 2) {
    this.x2 += this.vx2;
    this.y2 += this.vy2;

    // Adjust for gravity
    this.vx2 = Math.min(this.vx2 + ps.gravity, 0);
    this.vy2 = Math.max(this.vy2 - ps.gravity, 0);

  } else {
    this.x1 += this.vx1;
    this.y1 += this.vy1;

    // Adjust for gravity
    this.vx1 = Math.min(this.vx1 + ps.gravity, 0);
    this.vy1 = Math.max(this.vy1 - ps.gravity, 0);
  }


  // Age the line
  this.life++;

  // If line is old, remove it
  if (this.life >= ps.maxLife) {
    delete ps.particles[this.id];
    ps.particleCount--;
  }

  //context.save();

  context.lineWidth = this.size;
  context.strokeStyle = "#e0e2db";
  context.beginPath();       // Start a new path
  context.moveTo(this.x1, this.y1);
  context.lineTo(this.x2, this.y2);
  context.stroke();

  //context.restore();
}

function withinDist(pos1, pos2, distance) {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return (dx * dx + dy * dy) <= distance * distance;
}