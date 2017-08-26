// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set initial location and speed
    // For enemies, which move smoothly, x and y are in pixels
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

    // Handle player collisions (enemy runs into player)

    // When enemy reaches right edge, reset to left edge
    if (this.x > ctx.canvas.width)
        this.reset();

};

// Reset enemy to starting row with new speed
Enemy.prototype.reset = function() {
    this.x = 0;
    this.speed = this.randomSpeed();
};

// Return new random speed for enemy
Enemy.prototype.randomSpeed = function() {
    var speedMin = 150;
    var speedMax = 300;
    return Math.random() * (speedMax - speedMin) + speedMin;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    // Set initial location
    this.x = x;
    this.y = y;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the player's position, required method for game
Player.prototype.update = function() {
    // Updating player location is actually done in handleInput()

    // Handle enemy collisions (player runs into enemy)
    allEnemies.forEach(function(enemy) {
        /*
        if (this.y === enemy.row) and (this.x === enemy.col) {
            this.reset();
            break;
        }
        */
    });
};

// Handle user input regarding player movement
Player.prototype.handleInput = function(key) {
    // Move player (left, right, up, down)
    // Check that player does not move off screen
   switch (key) {
        case 'left':
            if (this.x > 0)
                this.x -= cellWidth;
            break;
        case 'right':
            if (this.x < 4 * cellWidth)
                this.x += cellWidth;
            break;
         case 'up':
            if (this.y > offsetHeight)
                this.y -= cellHeight;
            // If player reaches water, move player back to starting row
            if (this.y <= offsetHeight)
                this.reset();
            break;
         case 'down':
            if (this.y < 5 * cellHeight + offsetHeight)
                this.y += cellHeight;
            break;
     }
};

// Reset player to starting row
Player.prototype.reset = function() {
    this.y = playerRows[playerStartRow];
    // Randomize start column when resetting
    this.x = playerCols[Math.floor(Math.random() * 5)];
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var rowOffset = -18;
var rowHeight = 83;
allEnemies.push(new Enemy(0,rowHeight * 3 + rowOffset,200));
allEnemies.push(new Enemy(0,rowHeight * 2 + rowOffset,125));
allEnemies.push(new Enemy(0,rowHeight * 1 + rowOffset,150));

// Place the player object in a variable called player
var cellHeight = 83;
var offsetHeight = -10;
var cellWidth = 101;
var playerRows = [
    0 * cellHeight + offsetHeight,
    1 * cellHeight + offsetHeight,
    2 * cellHeight + offsetHeight,
    3 * cellHeight + offsetHeight,
    4 * cellHeight + offsetHeight,
    5 * cellHeight + offsetHeight
];
var playerCols = [
    0 * cellWidth,
    1 * cellWidth,
    2 * cellWidth, 
    3 * cellWidth,
    4 * cellWidth
];

var playerStartRow = 5;
var playerStartCol = 2; 
var player = new Player(playerCols[playerStartCol],playerRows[playerStartRow]);

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
