// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set initial location and speed
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Update enemy location
    this.x += this.speed * dt;

    // Handle player collisions

    // When enemy reaches right edge, reset to left edge
    if (this.x > 505)
        this.reset();

};

// Reset enemy to starting row with new speed
Enemy.prototype.reset = function() {
    this.x = 0;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(row,col) {
    this.sprite = 'images/char-boy.png';
    // Set initial location
    this.x = col;
    this.y = row;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
};

// Update the player's position, required method for game
Player.prototype.update = function() {
    // Update player location

    // Handle enemy collisions?
};

// Handle user input regarding player movement
Player.prototype.handleInput = function(key) {
    // Move player (left, right, up, down)
    // Check that player does not move off screen
   switch (key) {
        case 'left':
            if (this.x > 0)
                this.x--;
            break;
        case 'right':
            if (this.x < 4)
                this.x++;
            break;
         case 'up':
            if (this.y > 0)
                this.y--;
            // If player reaches water, move player back to starting row
            if (this.y === 0)
                this.reset();
            break;
         case 'down':
            if (this.y < 5)
                this.y++;
            break;
     }
};

// Reset player to starting row
Player.prototype.reset = function() {
    this.y = playerStartRow;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var rowOffset = 73;

var allEnemies = [];
allEnemies.push(new Enemy(0,rowOffset * 3,110));
allEnemies.push(new Enemy(0,rowOffset * 2,100));
allEnemies.push(new Enemy(0,rowOffset * 1,150));

var playerStartRow = 5;
var playerStartCol = 2;
var player = new Player(playerStartRow,playerStartCol);


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
