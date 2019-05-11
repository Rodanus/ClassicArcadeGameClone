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

          player.resetPosition();
          player.lostLife();
          decreaseScore(300);

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
        this.y = 400;
        this.remainingLives = 3;
        this.sprite = 'images/char-boy.png';

    }

    update() {
        // if player reaches the water, reset player's position and increase the score and the level.
        if(this.y === -15) {
          this.resetPosition();
          increaseScore(500);
          level += 1;
          renderNewGems();

          // if player passes 4 levels, create one more enemy.
          if(level % 4 === 0 && level !== 20) {
            createEnemies(1);
          }
        }
      }

    // this method is invoked when collision happens, it removes one heart.
    lostLife() {
      if(this.remainingLives > 1) {
        hearts.pop();
        this.remainingLives--;
        xPositionForHearts -= 30;
      } else {
        alert('Game over');
        resetGame();
      }
    }

    // to add one life to player.
    addLife() {
      if(this.remainingLives < 3) {
        const heart = new Heart(xPositionForHearts);
        hearts.push(heart);
        this.remainingLives++;
        xPositionForHearts += 30;
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
              if(this.y !== -15) {
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
              if(this.y !== 400) {
                this.y += 83;
              }

        }
    }

    // for reseting player's position
    resetPosition() {
        this.x = 200;
        this.y = 400;
    }
}

class Heart {
  // Create Heart constructor with position coordinates parameters
  constructor(x, y) {
      this.sprite = 'images/Heart.png';
      this.x = x;
      this.y = 0;
      //Resize image
      this.width = 25;
      this.height = 42;
  }
  // Draw the live object (hearts) on our canvas:
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
  }
}

class Gem {
  constructor(sprite, x, y, width, height) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 120;
  }

  // Draw the live object (gems) on our canvas:
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
  }

  update() {
    // check for collision
    if(this.x < player.x + player.width &&
       this.x + 60 > player.x &&
       this.y < player.y + player.height &&
       this.y + 30 > player.y) {

       // increase the score based on which gem is it.
       switch(this.sprite) {
        case "images/orange-gem.png":
          increaseScore(200);
          break;

        case "images/green-gem.png":
          increaseScore(300);
          break;

        case "images/blue-gem.png":
          increaseScore(400);
       }

       // remove the gem from gems array.
       gems.splice(gems.indexOf(this), 1);
    }
  }
}

// used to increase the score.
function increaseScore(points) {
  score += points;
}

// used to decrease the score.
function decreaseScore(points) {
  if(score > 0) {
    score -= points;
  }
}


// will be used to draw/update the score.
function renderScore() {
  ctx.font = '24px arial';
  ctx.color = "#333";
  ctx.fillText(`Score: ${score}`, 205, 31);
  ctx.fillText(`level ${level}`, 15, 31);
}

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
   for creating new enemies and pushing them into allEnemies array.
*/
function createEnemies(num) {
    for(let i = 0; i < num; i++) {
        allEnemies.push(new Enemy(yCoordinate(), speedGenerator()));
   }
}

// for creating gems.
function renderNewGems() {
  // first, remove current gems.
  for(let n = 1; n <= 3; n++) {
    gems.pop();
  }

  // add three gems, orange, green, and blue.
  for(let i = 1; i <= 3; i++) {

    // to store into it a random position form allowedPositionsForGems array.
    // https://www.kirupa.com/html5/picking_random_item_from_array.htm
    const positionForGem = allowedPositionsForGems[Math.floor(Math.random() * allowedPositionsForGems.length)];

    /*
      based on i's value, the new gem will be created and it'll be positioned
      using a random x value and y value which are inside an array that's stored inside positionForGem
      now.
    */
    switch(i) {
      case 1:
        gems.push(new Gem("images/orange-gem.png", positionForGem[0], positionForGem[1]));
        break;

      case 2:
        gems.push(new Gem("images/green-gem.png", positionForGem[0], positionForGem[1]));
        break;

      case 3:
        gems.push(new Gem("images/blue-gem.png", positionForGem[0], positionForGem[1]));
    }
  }
}


// will be used to reset everything
function resetGame() {

  level = 0;
  score = 0;

  // add lives
  for(let i = 0; i < 2; i++) {
    player.addLife();
  }

  // if enemies are more than 3, delete them and keep only 3.
  if(allEnemies.length > 3) {
    for(let n = allEnemies.length; n > 3; n--) {
      allEnemies.pop();
    }
  }

  renderNewGems();
}

// represents player's score.
let score = 0;

// represents player's level.
let level = 0;

// enemies array
let allEnemies = [];

// will be used to set the y coordinate of the newly created enemy.
let yPosition = 0;

// player
const player = new Player();

// instantiate 4 enemies
createEnemies(4);

// to store our rendered gems.
let gems = [];

// Create hearts array to put new hearts into it.
let hearts = [];

// used to determine the next heart's x position.
let xPositionForHearts = 410;

// create 3 hearts depending on initial player remainingLives
for (let i = 1; i <= player.remainingLives; i++) {
  let heart = new Heart(xPositionForHearts);// create new heart object
  hearts.push(heart);// Add it to hearts array
  xPositionForHearts += 30;
}

// allowed positions for rendering gems.
const allowedPositionsForGems = [];
// to fill our allowedPositionsForGems with allowed positions for rendering gems.
for(let y = 94; y <= 260; y += 83) {
  for(let x = 12; x <= 416; x += 101) {
    allowedPositionsForGems.push([x, y]);
  }
}

// render/create gems.
renderNewGems();


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
