import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ background: '#0a0a0a', height: 500, width: 500 });

document.body.appendChild(app.view);

const ship = PIXI.Sprite.from('/assets/GalagianArtwork/raw/player/ship2.png');
const bulletTexture = PIXI.Texture.from('/assets/GalagianArtwork/raw/projectiles/shotoval.png');

ship.anchor.set(0.5);

ship.x = app.screen.width / 2;
ship.y = app.screen.height / 2;

// Enable interactivity
app.stage.interactive = true;

// Make sure the whole canvas area is interactive, not just the circle.
app.stage.hitArea = app.screen;

// Hide cursor
// app.stage.cursor = 'none';

var mousePosition;
var bullets = [];
var bulletSpeed = 10;
var shipMaxSpeed = 5;
var onMouseDown = false;
var bulletTimer = 0;

function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

// Follow the pointer
app.stage.on('pointermove', (e) => {
    mousePosition = e.global
});

// Gameloop
app.ticker.add((delta) => {
    if (mousePosition === undefined) return;

    // Set ship position to mouse position
    const xIncrement = (ship.position.x - mousePosition.x) * 0.05;
    const yIncrement = (ship.position.y - mousePosition.y) * 0.05;

    ship.position.x -= clamp(xIncrement, -shipMaxSpeed, shipMaxSpeed);
    ship.position.y -= clamp(yIncrement, -shipMaxSpeed, shipMaxSpeed);

    // Rotate ship to face mouse
    ship.rotation = rotateToPoint(mousePosition.x, mousePosition.y, ship.position.x, ship.position.y);

    // Move bullets
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].position.x += Math.cos(bullets[i].rotation) * bulletSpeed;
        bullets[i].position.y += Math.sin(bullets[i].rotation) * bulletSpeed;
    }

    // Remove bullets if they go out of bounds
    for (var i = 0; i < bullets.length; i++) {
        if (bullets[i].position.x < 0 || bullets[i].position.x > app.screen.width ||
            bullets[i].position.y < 0 || bullets[i].position.y > app.screen.height) {
            bullets[i].destroy();
            bullets.splice(i, 1);
        }
    }

    // Shoot bullets
    bulletTimer += delta;
    if (onMouseDown && bulletTimer > 10) {
        bulletTimer = 0;
        const rotation = ship.rotation - Math.PI / 2;
        shoot(rotation, {
            x: ship.position.x + Math.cos(rotation) * 40,
            y: ship.position.y + Math.sin(rotation) * 40
        });
    }
});

function rotateToPoint(mx, my, px, py) {
    var dist_Y = my - py;
    var dist_X = mx - px;
    var angle = Math.atan2(dist_Y, dist_X);
    return angle + Math.PI / 2;
}

function shoot(rotation, startPosition) {
    var bullet = new PIXI.Sprite(bulletTexture);
    bullet.anchor.set(0.5);
    bullet.position.x = startPosition.x;
    bullet.position.y = startPosition.y;
    bullet.rotation = rotation;
    app.stage.addChild(bullet);
    bullets.push(bullet);
}

app.stage.on('pointerdown', () => {
    onMouseDown = true;
});

app.stage.on('pointerup', () => {
    onMouseDown = false;
});

// Add ship to stage
app.stage.addChild(ship);
