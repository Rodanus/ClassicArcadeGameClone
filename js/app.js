// Enemies our player must avoid
class Enemy {
    constructor(y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = -120;
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
                player.resetPosition();
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
    constructor(width, height) {
        super(width, height);
        this.x = 200;
        this.y = 373.5;
        this.sprite = 'images/char-boy.png';
    }

    update() {
        // if player reaches the water, reset player's position after the specified time.
        if(this.y === -41.5) {
            setTimeout(() => {
                this.resetPosition();
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

    // for reseting player's position
    resetPosition() {
        this.x = 200;
        this.y = 373.5;
    }
}


// enemies array
let allEnemies = [];

// will be used to set the y coordinate of the newly created enemy.
let yPosition = 0;

/*
   will change yPosition's value each time a new enemy is created.
   To make sure that the newly instantiated enemy will be on the next block instead
   of instantiating it on the same block.
*/
function yCoordinate() {
    switch(yPosition) {

        case 60:
          yPosition = 144;
          break;

        case 144:
          yPosition = 227;
          break;

        case 277:
          yPosition = 60;
          break;

        default:
          yPosition = 60;
    }

    return yPosition;
}

/*
   will be used in createEnemies function, it will set a random number between
   150 and 300 which will be the speed of the newly created enemy.

   https://appdividend.com/2019/02/20/javascript-math-random-tutorial-math-random-example/
*/
function speedGenerator() {
   let min = Math.ceil(150);
   let max = Math.floor(300);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
   for creating new enemies and pushing them to allEnemies array.
*/
function createEnemies(num) {
    for(let i = 0; i < num; i++) {
        allEnemies.push(new Enemy(yCoordinate(), speedGenerator()));
   }
}

// instantiate 4 enemies
createEnemies(4);

// player
const player = new Player();


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
