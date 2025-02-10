# Pacman Game
### Overview
This is a Pacman game for our web development course.<br>
We used JavaScript, jQuery, HTML, and CSS.

## Created by
* Eden Chai <br>
* Arie Katz

## Link to the game website
You can [click here](https://arie478.github.io/PacmanJS/) to play our game.

## Game Screens:
* **Home** - a page that contains a logo, Register, and Login buttons.
* **Register** - a page that allows the user to register to the site, using jQuery validation to make sure the inputs are valid.
* **Login** - a page that allows the user to log in, using jQuery validation to make sure the inputs are valid.
* **Settings** - a page that asks the user to select preferences for the game, such as keys to play, number of food balls, number of ghosts, time of the game, and colors for the food points. There is a random button that randomly changes the preferences.
* **Game** - a page that has the game itself and at the top of the game it shows: the username, score, time passed from the game's beginning, and how many lives the user has. On the side, the user sees the preferences he has chosen and a new game button.

## Game Rules:
* Use the keys selected to move around the board.
* Eat food for score. There are 3 kinds of food points, smaller worth 5 points, medium worth 15 points, and big worth 25 points.
* If a ghost catches the Pacman, you lose 1 life and 10 points off the score.
* If you eat the special moving candy, you get 50 points.
* Game ends when:
    * Win: if Pacman eats all the food on the board or time's up and the score is above 100 points.
    * Lose: if Pacman loses all its life (Loser) or time's up and the score is below 100 points.

## Functionality Added:
We've added the following special functionality:
* We added a pill that upon pickup grants the player an additional life.
* We added a snowflake that upon pickup freezes the ghosts and makes them move slower for 10 seconds.
* We added a clock that upon pickup adds additional time to the timer and allows the player to have more time to finish the stage.
