// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 50;
        this.height = 50;

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        // if crossed the screen
        if (this.x > 505) {
            // reset its position after 1 second.
            setTimeout(() => this.x = -120, 1000);

        } else { // let it move
            this.x += this.speed * dt;
        }

        // check for collision
        // https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
        if(this.x < player.x + player.width &&
           this.x + this.width > player.x &&
           this.y < player.y + player.height &&
           this.y + this.height > player.y) {

            setTimeout(() => {
                player.y = 373.5;
                player.x = 200;
            }, 0);

        }

    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.width = 50;
        this.height = 50;
        this.sprite = 'images/char-boy.png';
    }

    update() {
        // if player reaches the water, rest player's position after the specified time.
        if(this.y === -41.5) {
            setTimeout(() => {
                this.y = 373.5;
                this.x = 200;
            }, 80);
        }
    }

    // receives the pressed key and moves the player based on it.
    handleInput(key) {
        // check which key is pressed
        switch(key) {

            case "left":
              // to make sure that the player won't cross the screen.
              if(this.x !== 0) {
                this.x -= 100;
              }
              break;

            case "up":
              // to make sure that the player won't cross the screen.
              if(this.y !== -41.5) {
                this.y -= 83;
              }
              break;

            case "right":
              // to make sure that the player won't cross the screen.
              if(this.x !== 400) {
                this.x += 100;
              }
              break;

            case "down":
              // to make sure that the player won't cross the screen.
              if(this.y !== 373.5) {
                this.y += 83;
              }

        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// enemy array
let allEnemies = [];

// creating enemies
const enemy1 = new Enemy(101, 60, 150),
enemy2 = new Enemy(202, 140, 200),
enemy3 = new Enemy(303, 220, 300);

// player
const player = new Player(200, 373.5);

// push all enemies to allEnemies array
allEnemies.push(enemy1, enemy2, enemy3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
