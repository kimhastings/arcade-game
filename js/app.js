// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set initial location and speed (random)
    // For enemies, which move smoothly, x and y are in pixels
    this.x = x;
    this.y = y;
    this.speed = this.randomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Update enemy location
    this.x += this.speed * dt;

    // Handle player collisions is done in player update function

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
    this.sprite = 'images/char-horn-girl.png';
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
    /*
    allEnemies.forEach(function(enemy) {
        if ((this.x === enemy.x) && (this.y === enemy.y)) {
            this.reset();
            break;
        }
    });
    */
    // Could not use allEnemies.forEach (above) because of break when collision detected
    for (var i = 0; i < allEnemies.length; i++) {
        // Checking enemy width inside for loop in case not all enemies are the same sprite
        var enemyWidth = Resources.get(allEnemies[i].sprite).width;
        var colMatch = (this.x > allEnemies[i].x - enemyWidth/2) && (this.x < allEnemies[i].x + enemyWidth/2)
        var rowMatch = (this.y === allEnemies[i].y + rowOffsetDifference);
        if (colMatch && rowMatch) {
            $.alert("Rats, you lost this round. Better luck next time!","Beat the Bugs");
            this.reset();
            break;
        }
    }
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
            // If player reaches water, move player back to starting row
            if (this.y < rowHeight) {
                $.alert("Congratulations, you made it!","Beat the Bugs");
                this.reset();                
            }
            else
                this.y -= rowHeight;
            break;
         case 'down':
            if (this.y < 5 * rowHeight + playerRowOffset)
                this.y += rowHeight;
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
var cellWidth = 101;
var rowHeight = 83;
var enemyRowOffset = -18;
var playerRowOffset = -10;
var rowOffsetDifference = playerRowOffset - enemyRowOffset;

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy(0,rowHeight * 3 + enemyRowOffset));
allEnemies.push(new Enemy(0,rowHeight * 2 + enemyRowOffset));
allEnemies.push(new Enemy(0,rowHeight * 1 + enemyRowOffset));

// Place the player object in a variable called player
var playerRows = [
    0 * rowHeight + playerRowOffset,
    1 * rowHeight + playerRowOffset,
    2 * rowHeight + playerRowOffset,
    3 * rowHeight + playerRowOffset,
    4 * rowHeight + playerRowOffset,
    5 * rowHeight + playerRowOffset
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
