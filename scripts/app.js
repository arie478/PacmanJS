var context;
var player = new Object();
var board;
var score;
var pac_color;
var pac_direction;
var time_elapsed;
var interval;
var enemy_num;
var enemies;
var cell_height;
var cell_width;
var rows_num;
var cols_num;
var timer;
var frozen;
var power_up_clock;
var power_up_freeze;
var power_up_hp;
var power_up_cherry;
var interval_cherry;
var cherry;
var game_over;
var start_timer_aux;
var music_on;
var freeze_active;

$(document).ready(function () {
	//context = canvas.getContext("2d");
	window.addEventListener("keydown", function (e) {
		if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
			e.preventDefault();
		}
	}, false);
});

// SETTINGS
vol_food = 0.1;

player_up = new Image();
player_up.src = "./assets/images/PacManUp.png";

player_down = new Image();
player_down.src = "./assets/images/PacManDown.png";

player_right = new Image();
player_right.src = "./assets/images/PacManRight.png";

player_left = new Image();
player_left.src = "./assets/images/PacManLeft.png";

enemy_red = new Image();
enemy_red.src = "./assets/images/enemyRed.png";

enemy_blue = new Image();
enemy_blue.src = "./assets/images/enemyBlue.png";

enemy_green = new Image();
enemy_green.src = "./assets/images/enemyGreen.png";

enemy_orange = new Image();
enemy_orange.src = "./assets/images/enemyOrange.png";

coin5 = new Image();
coin5.src = "./assets/images/Coin5.png";

coin15 = new Image();
coin15.src = "./assets/images/Coin15.png";

coin25 = new Image();
coin25.src = "./assets/images/Coin25.png";

clock = new Image();
clock.src = "./assets/images/clock.png";

snowflake = new Image();
snowflake.src = "./assets/images/snowflake.png";

hpPill = new Image();
hpPill.src = "./assets/images/hpPill.png";

cherry = new Image();
cherry.src = "./assets/images/cherry.png";

background = new Image();
//background.src = "./assets/images/Background.png";
// background.src = "./assets/images/Background_Blue.png";
background.src = "./assets/images/Background_Light_Blue.png";

enemy_frozen = new Image();
enemy_frozen.src = "./assets/images/Frozen.png";

var audio_power_popup_1 = new Audio("./assets/sounds/bubble_effect_01.wav");
audio_power_popup_1.volume = 0.5;
var audio_power_popup_2 = new Audio("./assets/sounds/bubble_effect_02.wav");
audio_power_popup_2.volume = 0.5;
var audio_power_popup_3 = new Audio("./assets/sounds/bubble_effect_03.wav");
audio_power_popup_3.volume = 0.5;
var audio_power_popup_4 = new Audio("./assets/sounds/bubble_effect_04.wav");
audio_power_popup_4.volume = 0.5;
var audio_power_popup = [audio_power_popup_1, audio_power_popup_2, audio_power_popup_3, audio_power_popup_4];

var audio_collectFood_1 = new Audio("./assets/sounds/comedy_bite_chew_01.wav");
audio_collectFood_1.volume = vol_food;
var audio_collectFood_2 = new Audio("./assets/sounds/comedy_bite_chew_02.wav");
audio_collectFood_2.volume = vol_food;
var audio_collectFood_3 = new Audio("./assets/sounds/comedy_bite_chew_03.wav");
audio_collectFood_3.volume = vol_food;
var audio_collectFood_4 = new Audio("./assets/sounds/comedy_bite_chew_04.wav");
audio_collectFood_4.volume = vol_food;
var audio_collectFood_5 = new Audio("./assets/sounds/comedy_bite_chew_05.wav");
audio_collectFood_5.volume = vol_food;
var audio_collectFood_6 = new Audio("./assets/sounds/comedy_bite_chew_06.wav");
audio_collectFood_6.volume = vol_food;
var audio_collectFood = [audio_collectFood_1, audio_collectFood_2, audio_collectFood_3, audio_collectFood_4, audio_collectFood_5, audio_collectFood_6];

var audio_collectFood_big_1 = new Audio("./assets/sounds/comedy_bite_creature_eating_02.wav");
audio_collectFood_big_1.volume = vol_food;
var audio_collectFood_big_2 = new Audio("./assets/sounds/comedy_bite_creature_eating_03.wav");
audio_collectFood_big_2.volume = vol_food;
var audio_collectFood_big_3 = new Audio("./assets/sounds/comedy_bite_creature_eating_05.wav");
audio_collectFood_big_3.volume = vol_food;
var audio_collectFood_big = [audio_collectFood_big_1, audio_collectFood_big_2, audio_collectFood_big_3];

var audio_collectFood_huge_1 = new Audio("./assets/sounds/comedy_bite_creature_eating_07.wav");
audio_collectFood_huge_1.volume = vol_food;
var audio_collectFood_huge_2 = new Audio("./assets/sounds/comedy_bite_creature_eating_08.wav");
audio_collectFood_huge_2.volume = vol_food;
var audio_collectFood_huge = [audio_collectFood_huge_1, audio_collectFood_huge_2];

var audio_enemyHit = new Audio("./assets/sounds/retro_damage_hurt_ouch_21.wav");
audio_enemyHit.volume = 0.5;

var audio_snowflake = new Audio("./assets/sounds/Ice_4.mp3");
audio_snowflake.volume = 0.2;

var audio_clock = new Audio("./assets/sounds/clock-ticking-4.wav");

var audio_snowflake_end = new Audio("./assets/sounds/Ice_8.mp3");
audio_snowflake_end.volume = 0.2;

var audio_hpPill = new Audio("./assets/sounds/GetItem2.mp3");
audio_hpPill.volume = 0.5;

var audio_background = new Audio("./assets/sounds/ChipChippy_(loop).mp3");
audio_background.loop = true;
audio_background.volume = 0.1;

var audio_cherry_pick = new Audio("./assets/sounds/Food2.mp3");

const scale = 2;
const width = 16;
const height = 16;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
rows_num = 20;
cols_num = 20;
var cnt = 179;

var as = 0;
var am = 0;
var ab = 0;
var s = 0;
var m = 0;
var b = 0;

function Start() {
	freeze_active = false;
	music_on = true;
	settings_lives = 5;
	enemy_num = numbers['ghosts'];
	audio_background.play();

	cell_height = document.getElementById("canvas").height / rows_num;
	cell_width = document.getElementById("canvas").width / cols_num;
	board = new Array();
	enemies = new Array(enemy_num);
	player = new Array(2);
	score = 0;
	pac_color = "yellow";
	// Allocate food in 10 30 60 % manner
	var big_food_remain = Math.round(numbers['balls'] * 0.1);
	var med_food_remain = Math.round(numbers['balls'] * 0.3);
	var small_food_remain = Math.round(numbers['balls'] * 0.6);
	food_to_eat = big_food_remain + med_food_remain + small_food_remain;
	food_to_make = food_to_eat;

	frozen = false;
	power_up_clock = false;
	power_up_freeze = false;
	power_up_hp = false;
	power_up_cherry = false;

	for (var i = 0; i < rows_num; i++) {
		board[i] = new Array();
		for (var j = 0; j < cols_num; j++) {
			board[i][j] = "0";
		}
	}

	board[0][0] = "W";
	board[1][0] = "W";
	board[2][0] = "W";
	board[3][0] = "W";
	board[4][0] = "W";
	board[5][0] = "W";
	board[6][0] = "W";
	board[7][0] = "W";
	board[8][0] = "W";
	board[9][0] = "W";
	board[10][0] = "W";
	board[11][0] = "W";
	board[12][0] = "W";
	board[13][0] = "W";
	board[14][0] = "W";
	board[15][0] = "W";
	board[16][0] = "W";
	board[17][0] = "W";
	board[18][0] = "W";
	board[19][0] = "W";

	board[0][1] = "W";
	board[9][1] = "W";
	board[10][1] = "W";
	board[19][1] = "W";

	board[0][2] = "W";
	board[2][2] = "W";
	board[3][2] = "W";
	board[5][2] = "W";
	board[6][2] = "W";
	board[7][2] = "W";
	board[9][2] = "W";
	board[10][2] = "W";
	board[12][2] = "W";
	board[13][2] = "W";
	board[14][2] = "W";
	board[16][2] = "W";
	board[17][2] = "W";
	board[19][2] = "W";

	board[0][3] = "W";
	board[2][3] = "W";
	board[3][3] = "W";
	board[5][3] = "W";
	board[6][3] = "W";
	board[7][3] = "W";
	board[9][3] = "W";
	board[10][3] = "W";
	board[12][3] = "W";
	board[13][3] = "W";
	board[14][3] = "W";
	board[16][3] = "W";
	board[17][3] = "W";
	board[19][3] = "W";

	board[0][4] = "W";
	board[19][4] = "W";

	board[0][5] = "W";
	board[2][5] = "W";
	board[3][5] = "W";
	board[5][5] = "W";
	board[7][5] = "W";
	board[8][5] = "W";
	board[9][5] = "W";
	board[10][5] = "W";
	board[11][5] = "W";
	board[12][5] = "W";
	board[14][5] = "W";
	board[16][5] = "W";
	board[17][5] = "W";
	board[19][5] = "W";

	board[0][6] = "W";
	board[2][6] = "W";
	board[3][6] = "W";
	board[5][6] = "W";
	board[9][6] = "W";
	board[10][6] = "W";
	board[14][6] = "W";
	board[16][6] = "W";
	board[17][6] = "W";
	board[19][6] = "W";

	board[0][7] = "W";
	board[5][7] = "W";
	board[6][7] = "W";
	board[7][7] = "W";
	board[9][7] = "W";
	board[10][7] = "W";
	board[12][7] = "W";
	board[13][7] = "W";
	board[14][7] = "W";
	board[19][7] = "W";

	board[0][8] = "W";
	board[1][8] = "W";
	board[2][8] = "W";
	board[3][8] = "W";
	board[5][8] = "W";
	board[14][8] = "W";
	board[16][8] = "W";
	board[17][8] = "W";
	board[18][8] = "W";
	board[19][8] = "W";

	board[0][9] = "W";
	board[1][9] = "W";
	board[2][9] = "W";
	board[3][9] = "W";
	board[5][9] = "W";
	board[7][9] = "W";
	board[8][9] = "W";
	board[9][9] = "W";
	board[10][9] = "W";
	board[11][9] = "W";
	board[12][9] = "W";
	board[14][9] = "W";
	board[16][9] = "W";
	board[17][9] = "W";
	board[18][9] = "W";
	board[19][9] = "W";

	board[0][10] = "W";
	board[1][10] = "W";
	board[2][10] = "W";
	board[3][10] = "W";
	board[7][10] = "W";
	board[8][10] = "W";
	board[9][10] = "W";
	board[10][10] = "W";
	board[11][10] = "W";
	board[12][10] = "W";
	board[16][10] = "W";
	board[17][10] = "W";
	board[18][10] = "W";
	board[19][10] = "W";

	board[0][11] = "W";
	board[5][11] = "W";
	board[7][11] = "W";
	board[8][11] = "W";
	board[9][11] = "W";
	board[10][11] = "W";
	board[11][11] = "W";
	board[12][11] = "W";
	board[14][11] = "W";
	board[19][11] = "W";

	board[0][12] = "W";
	board[2][12] = "W";
	board[3][12] = "W";
	board[5][12] = "W";
	board[14][12] = "W";
	board[16][12] = "W";
	board[17][12] = "W";
	board[19][12] = "W";

	board[0][13] = "W";
	board[2][13] = "W";
	board[3][13] = "W";
	board[5][13] = "W";
	board[7][13] = "W";
	board[8][13] = "W";
	board[9][13] = "W";
	board[10][13] = "W";
	board[11][13] = "W";
	board[12][13] = "W";
	board[14][13] = "W";
	board[16][13] = "W";
	board[17][13] = "W";
	board[19][13] = "W";

	board[0][14] = "W";
	board[19][14] = "W";


	board[0][15] = "W";
	board[1][15] = "W";
	board[2][15] = "W";
	board[4][15] = "W";
	board[6][15] = "W";
	board[7][15] = "W";
	board[8][15] = "W";
	board[9][15] = "W";
	board[10][15] = "W";
	board[11][15] = "W";
	board[12][15] = "W";
	board[13][15] = "W";
	board[15][15] = "W";
	board[17][15] = "W";
	board[18][15] = "W";
	board[19][15] = "W";

	board[0][16] = "W";
	board[4][16] = "W";
	board[9][16] = "W";
	board[10][16] = "W";
	board[15][16] = "W";
	board[19][16] = "W";

	board[0][17] = "W";
	board[2][17] = "W";
	board[3][17] = "W";
	board[4][17] = "W";
	board[5][17] = "W";
	board[6][17] = "W";
	board[7][17] = "W";
	board[9][17] = "W";
	board[10][17] = "W";
	board[12][17] = "W";
	board[13][17] = "W";
	board[14][17] = "W";
	board[15][17] = "W";
	board[16][17] = "W";
	board[17][17] = "W";
	board[19][17] = "W";

	board[0][18] = "W";
	board[19][18] = "W";

	board[0][19] = "W";
	board[1][19] = "W";
	board[2][19] = "W";
	board[3][19] = "W";
	board[4][19] = "W";
	board[5][19] = "W";
	board[6][19] = "W";
	board[7][19] = "W";
	board[8][19] = "W";
	board[9][19] = "W";
	board[10][19] = "W";
	board[11][19] = "W";
	board[12][19] = "W";
	board[13][19] = "W";
	board[14][19] = "W";
	board[15][19] = "W";
	board[16][19] = "W";
	board[17][19] = "W";
	board[18][19] = "W";
	board[19][19] = "W";

	for (var i = 0; i < rows_num; i++) {
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		/**
		 * W = WALL
		 * F = FOOD
		 * P = PLAYER
		 * E = ENEMY
		 * 0 = EMPTY SPACE
		 */

		for (var j = 0; j < cols_num; j++) {
			// Make walls
			if (
				board[i][j] == "W"
			) {
				//board[i][j] = "W";
				continue;
			}
			else {
				//Make enemies
				if (
					((i == 1 && j == 1) ||
						(i == 1 && j == cols_num - 2) ||
						(i == rows_num - 2 && j == 1) ||
						(i == rows_num - 2 && j == cols_num - 2))
					&&
					enemy_num > 0
				) {
					if (i == 1 && j == 1) {
						enemies[enemy_num - 1] = ["RED", 1, 1, "0"];
					}

					if (i == 1 && j == cols_num - 2) {
						enemies[enemy_num - 1] = ["BLUE", 1, cols_num - 2, "0"];
					}

					if (i == rows_num - 2 && j == 1) {
						enemies[enemy_num - 1] = ["GREEN", rows_num - 2, 1, "0"];
					}

					if (i == rows_num - 2 && j == cols_num - 2) {
						enemies[enemy_num - 1] = ["ORANGE", rows_num - 2, cols_num - 2, "0"];
					}

					board[i][j] = "E";
					enemy_num--;
				}

				else {
					var randomNum = Math.random();
					//Make food
					if (randomNum <= (1.0 * food_to_make) / cnt) {
						var food_type = Math.random();
						if (food_type <= 0.1 && big_food_remain > 0) {
							board[i][j] = "F25";
							big_food_remain--;
							food_to_make--;

						}
						else if (food_type > 0.1 && food_type <= 0.4 && med_food_remain > 0) {
							board[i][j] = "F15";
							med_food_remain--;
							food_to_make--;


						}
						else if (food_type > 0.4 && small_food_remain > 0) {
							board[i][j] = "F5";
							small_food_remain--;
							food_to_make--;

						}
					}
					//Make empty space
					else {
						board[i][j] = "0";
					}
					cnt--;
				}
			}
		}
	}

	//Make random player
	var emptyCell = findRandomEmptyCell(board);
	player.i = emptyCell[0];
	player.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = "P";

	while (food_to_make > 0) {
		var emptyCell = findRandomEmptyCell(board);
		var food_type = Math.random();

		if (food_type <= 0.1 && big_food_remain > 0) {
			board[emptyCell[0]][emptyCell[01]] = "F25";
			big_food_remain--;
			food_to_make--;

		}
		else if (food_type > 0.1 && food_type <= 0.4 && med_food_remain > 0) {
			board[emptyCell[0]][emptyCell[1]] = "F15";
			med_food_remain--;
			food_to_make--;


		}
		else if (food_type > 0.4 && small_food_remain > 0) {
			board[emptyCell[0]][emptyCell[1]] = "F5";
			small_food_remain--;
			food_to_make--;

		}
	}

	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 50);
	interval_enemy = setInterval(moveEnemies, 1000);
	countDowntimer = startTimer(numbers['time'], document.getElementById("time"));
	power_ups = setInterval(spawn_power_up, 2000);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 18 + 1);
	var j = Math.floor(Math.random() * 18 + 1);
	while (board[i][j] != "0") {
		i = Math.floor(Math.random() * 18 + 1);
		j = Math.floor(Math.random() * 18 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[keys_code['up']]) { return 1; } // up
	if (keysDown[keys_code['down']]) { return 2; } // down
	if (keysDown[keys_code['left']]) { return 3; } // left
	if (keysDown[keys_code['right']]) { return 4; } // right
}

function Draw() {
	canvas.width = canvas.width; //clean board
	context.drawImage(background, 0, 0, width * 20, height * 20, 0, 0, cell_width * 20, cell_height * 20);

	lblPlayer.value = online_user;
	lblScore.value = score;
	lblLives.value = settings_lives;

	for (var i = 0; i < rows_num; i++) {
		for (var j = 0; j < cols_num; j++) {
			var center = new Object();
			center.x = i * 30 + 15;
			center.y = j * 30 + 15;

			if (board[i][j] == "P") {
				drawPlayer(center);
			}
			else if (board[i][j] == "F25") {
				drawFood(center, 25);
			}
			else if (board[i][j] == "F15") {
				drawFood(center, 15);
			}
			else if (board[i][j] == "F5") {
				drawFood(center, 5);
			}
			else if (board[i][j] == "W") {
				//drawWall(center);
			}

			else if (board[i][j] == "E") {
				drawEnemy(center, i, j);
			}

			else if (board[i][j] == "0") {
				drawEmptySpace(center);
			}

			else if (board[i][j] == "C") {
				drawClock(center);
			}

			else if (board[i][j] == "S") {
				drawSnowflake(center);
			}

			else if (board[i][j] == "HP") {
				drawHP(center);
			}

			if (i == cherry.i && j == cherry.j) {
				drawCherry(center);
			}
		}
	}
}

function drawPlayer(center) {
	if (pac_direction == "down") {
		// Facing down
		context.drawImage(player_down, 0, 0, width, height, center.x - 16, center.y - 14, scaledWidth, scaledHeight);
	}

	else if (pac_direction == "left") {
		// Facing left
		context.drawImage(player_left, 0, 0, width, height, center.x - 16, center.y - 14, scaledWidth, scaledHeight);
	}

	else if (pac_direction == "up") {
		// Facing up
		context.drawImage(player_up, 0, 0, width, height, center.x - 16, center.y - 14, scaledWidth, scaledHeight);
	}

	else {
		// Facing right
		context.drawImage(player_right, 0, 0, width, height, center.x - 16, center.y - 14, scaledWidth, scaledHeight);
	}
}

function drawFood(center, type) {
	context.beginPath();
	if (type == 25) {
		context.arc(center.x, center.y + 2, 12, 0, 2 * Math.PI); // circle
		context.fillStyle = colors['25']; //color
		context.fill();
		context.drawImage(coin25, 0, 0, width, height, center.x - 16, center.y - 14, scaledWidth, scaledHeight);
	}
	if (type == 15) {
		context.arc(center.x, center.y + 2, 10, 0, 2 * Math.PI); // circle
		context.fillStyle = colors['15']; //color
		context.fill();
		context.drawImage(coin15, 0, 0, width, height, center.x - 16, center.y - 14, scaledWidth, scaledHeight);
	}
	if (type == 5) {
		context.arc(center.x, center.y + 2, 7, 0, 2 * Math.PI); // circle
		context.fillStyle = colors['5']; //color
		context.fill();
		context.drawImage(coin5, 0, 0, width, height, center.x - 16, center.y - 14, scaledWidth, scaledHeight);
	}
}

function drawWall(center) {
	context.beginPath();
	context.rect(center.x - 15, center.y - 15, cell_width, cell_height);
	context.fillStyle = "grey"; //color
	context.fill();
}

function drawClock(center) {
	context.drawImage(clock, 0, 0, width, height, center.x - 13, center.y - 14, scaledWidth * 0.9, scaledHeight * 0.9);
}

function drawSnowflake(center) {
	context.drawImage(snowflake, 0, 0, 294, 280, center.x - 13, center.y - 14, scaledWidth * 0.7, scaledHeight * 0.7);
}

function drawHP(center) {
	context.drawImage(hpPill, 0, 0, 32, 16, center.x - 13, center.y - 14, cell_width * 0.9, cell_height * 0.6);
}

function drawCherry(center) {
	context.drawImage(cherry, 0, 0, 29, 29, center.x - 13, center.y - 14, cell_width * 0.9, cell_height * 0.6);
}

function drawEnemy(center, i, j) {
	// Facing up


	for (var k = 0; k < enemies.length; k++) {
		if (enemies[k][1] == i && enemies[k][2] == j) {
			color = enemies[k][0];
		}

	}

	if (color == "RED") {
		context.drawImage(enemy_red, 0, 0, width, height, center.x - 16, center.y - 14, scaledWidth, scaledHeight);
	}

	if (color == "BLUE") {
		context.drawImage(enemy_blue, 0, 0, width, height, center.x - 16, center.y - 14, scaledWidth, scaledHeight);
	}

	if (color == "GREEN") {
		context.drawImage(enemy_green, 0, 0, width, height, center.x - 16, center.y - 14, scaledWidth, scaledHeight);
	}

	if (color == "ORANGE") {
		context.drawImage(enemy_orange, 0, 0, width, height, center.x - 16, center.y - 14, scaledWidth, scaledHeight);
	}

	if (frozen) {
		context.drawImage(enemy_frozen, 0, 0, width, height, center.x - 16, center.y - 14, scaledWidth, scaledHeight);
	}

}

// Calculate if the move is in the direction of the player
function isApproachingPlayer(i_pre, j_pre, i_post, j_post) {

	var distance_pre_i = i_pre - player.i;
	var distance_pre_j = j_pre - player.j;

	var distance_post_i = i_post - player.i;
	var distance_post_j = j_post - player.j;

	var distance_pre = Math.sqrt(distance_pre_i * distance_pre_i + distance_pre_j * distance_pre_j);

	var distance_post = Math.sqrt(distance_post_i * distance_post_i + distance_post_j * distance_post_j);

	if (distance_post <= distance_pre) {
		return true;
	}
	return false;
}

function isLegalMove(i_post, j_post) {
	// Can't move outside boundries of i
	if (i_post >= board.length || i_post < 0) {
		return false;
	}
	// Can't move outside boundries of j
	if (j_post >= board[0].length || j_post < 0) {

		return false;
	}

	// Can't move into a wall
	if (board[i_post][j_post] == "W") {
		return false
	}
	//Can't moveinto another enenmy
	if (board[i_post][j_post] == "E") {
		return false
	}
	// If can move there and legal space, move there

	return true;
}

function moveEnemy() {

	let moveOptions = new Array();
	//DOWN
	if (isLegalMove(i, j + 1) && isApproachingPlayer(i, j, i, j + 1)) {
		moveOptions.push([i, j + 1]);
	}
	//UP
	if (isLegalMove(i, j - 1) && isApproachingPlayer(i, j, i, j - 1)) {
		moveOptions.push([i, j - 1]);
	}
	//LEFT
	if (isLegalMove(i - 1, j) && isApproachingPlayer(i, j, i - 1, j)) {
		moveOptions.push([i - 1, j]);
	}
	//RIGHT
	if (isLegalMove(i + 1, j) && isApproachingPlayer(i, j, i + 1, j)) {
		moveOptions.push([i + 1, j]);
	}

	if (moveOptions.length == 0) {
		return randomMove(i, j);
	}
	//Pick an option at random

	var move = moveOptions[Math.floor(Math.random() * moveOptions.length)];
	return move;
}

function cherry_step() {

	let cherryOptions = new Array();
	//DOWN
	if (isLegalMove(cherry.i, cherry.j + 1)) {
		cherryOptions.push([cherry.i, cherry.j + 1]);
	}
	//UP
	if (isLegalMove(cherry.i, cherry.j - 1)) {
		cherryOptions.push([cherry.i, cherry.j - 1]);
	}
	//LEFT
	if (isLegalMove(cherry.i - 1, cherry.j)) {
		cherryOptions.push([cherry.i - 1, cherry.j]);
	}
	//RIGHT
	if (isLegalMove(cherry.i + 1, cherry.j)) {
		cherryOptions.push([cherry.i + 1, cherry.j]);
	}

	if (cherryOptions.length == 0) {
		return randomMove(cherry.i, cherry.j);
	}
	//Pick an option at random

	var cherry_move = cherryOptions[Math.floor(Math.random() * cherryOptions.length)];
	return cherry_move;
}

function randomMove(i, j) {
	//If can't get closer by moving, move to random space
	let moveOptions = new Array();
	//DOWN
	if (isLegalMove(i, j + 1)) {
		moveOptions.push([i, j + 1]);
	}
	//UP
	if (isLegalMove(i, j - 1)) {
		moveOptions.push([i, j - 1]);
	}
	//LEFT
	if (isLegalMove(i - 1, j)) {
		moveOptions.push([i - 1, j]);
	}
	//RIGHT
	if (isLegalMove(i + 1, j)) {
		moveOptions.push([i + 1, j]);
	}

	if (moveOptions.length == 0) {
		return [i, j];
	}

	//Pick an option at random
	var move = moveOptions[Math.floor(Math.random() * moveOptions.length)];
	return move;
}

function moveEnemies() {
	for (var k = 0; k < enemies.length; k++) {
		// return a good step [x,y] to make
		i = enemies[k][1];
		j = enemies[k][2];
		let move = moveEnemy(i, j);
		//Mark that the enemy moved from last spot

		//If was on tile
		if (enemies[k][3] != "0") {
			board[enemies[k][1]][enemies[k][2]] = enemies[k][3]
			enemies[k][3] = "0"
		}
		//If was on empty space
		else {
			board[enemies[k][1]][enemies[k][2]] = "0"
		}

		enemies[k][1] = move[0];
		enemies[k][2] = move[1];
		//Mark that the enemy moved to the new spot
		if (board[enemies[k][1]][enemies[k][2]] != "0" && board[enemies[k][1]][enemies[k][2]] != "P") {
			enemies[k][3] = board[enemies[k][1]][enemies[k][2]]
		}
		board[enemies[k][1]][enemies[k][2]] = "E"
		if (enemies[k][1] == player.i && enemies[k][2] == player.j) {
			//If player gets hit
			audio_enemyHit.play();
			if (settings_lives > 1) {
				settings_lives--;
				score -= 10;
				resetAfterHit();
			}
			else {
				settings_lives--;
				Draw();
				gameOver();

				setTimeout(function () {
					showMessage();
				}, 300);
			}
		}
		else {
			Draw();
		}

	}
}

function UpdatePosition() {
	board[player.i][player.j] = "0";

	var x = GetKeyPressed();
	if (x == 1) {
		if (player.j > 0 && board[player.i][player.j - 1] != "W") {
			player.j--;
			pac_direction = "up"
		}
	}
	if (x == 2) {
		if (player.j < cols_num - 1 && board[player.i][player.j + 1] != "W") {
			player.j++;
			pac_direction = "down"
		}
	}
	if (x == 3) {
		if (player.i > 0 && board[player.i - 1][player.j] != "W") {
			player.i--;
			pac_direction = "left"
		}
	}
	if (x == 4) {
		if (player.i < rows_num - 1 && board[player.i + 1][player.j] != "W") {
			player.i++;
			pac_direction = "right"
		}
	}

	// Collecting food worth 25 points
	if (board[player.i][player.j] == "F25") {
		score += 25;
		audio_collectFood_huge[Math.floor(Math.random() * audio_collectFood_huge.length)].play();
		food_to_eat--;
	}

	// Collecting food worth 15 points
	if (board[player.i][player.j] == "F15") {
		score += 15;
		audio_collectFood_big[Math.floor(Math.random() * audio_collectFood_big.length)].play();
		food_to_eat--;
	}

	// Collecting food worth 5 points
	if (board[player.i][player.j] == "F5") {
		score += 5;
		audio_collectFood[Math.floor(Math.random() * audio_collectFood.length)].play();
		food_to_eat--;
	}

	// Collecting food worth 5 points
	if (board[player.i] == cherry.i && board[player.j] == cherry.j) {
		score += 50;
		audio_cherry.play();
	}

	// Timer bonus pickup
	if (board[player.i][player.j] == "C") {
		power_up_clock = false;
		timer += 20;
		audio_clock.play();
	}

	// Snow flake bonus pickup
	if (board[player.i][player.j] == "S") {
		audio_snowflake.play();
		freeze_active = true;
		setTimeout(function () {
			window.clearInterval(interval_enemy);
			interval_enemy = setInterval(moveEnemies, 2000);
			frozen = true;
			freeze_timer = setTimeout(function () {
				audio_snowflake_end.play();
				window.clearInterval(interval_enemy);
				interval_enemy = setInterval(moveEnemies, 1000);
				frozen = false;
				power_up_freeze = false;
				freeze_active = false;;
			}, 10000);
		}, 300);
	}

	// Hp bonus pickup
	if (board[player.i][player.j] == "HP") {
		power_up_hp = false;
		settings_lives++;
		audio_hpPill.play();
	}

	//Picking up a cherry
	if (cherry.i == player.i && cherry.j == player.j) {
		//Get bonus 50 points
		score += 50;
		window.clearInterval(interval_cherry);
		cherry.i = -1;
		cherry.j = -1;
		cherry.memory = "0";
		power_up_cherry = false;
		audio_cherry_pick.play();
	}

	// Hitting Enemy
	if (board[player.i][player.j] == "E") {
		//If player gets hit
		audio_enemyHit.play();
		if (settings_lives > 1) {
			settings_lives--;
			score -= 10;

			var enemies_temp = JSON.parse(JSON.stringify(enemies));

			resetAfterHit();

			for (var k = 0; k < enemies_temp.length; k++) {
				//Mark that the enemy moved from last spot
				//If was on tile
				if (enemies_temp[k][3] != "0") {
					board[enemies_temp[k][1]][enemies_temp[k][2]] = enemies_temp[k][3]
				}
			}
		}
		else {
			settings_lives--;
			Draw();
			gameOver();
			setTimeout(function () {
				showMessage();
			}, 300);
		}
	}

	board[player.i][player.j] = "P";

	if (food_to_eat == 0) {
		Draw();
		gameOver();
		setTimeout(function () {
			showMessage();
		}, 300);
	} else {
		Draw();
	}
}

function resetAfterHit() {
	window.clearInterval(interval);
	window.clearInterval(interval_enemy);
	window.clearInterval(time);

	// Clear Enemies
	for (let i = 0; i < enemies.length; i++) {
		//Sort food memoery
		if (enemies[i][3] == "F") {
			board[enemies[i][1]][enemies[i][2]] = "F"
			enemies[i][3] == "0"
		}
		else {
			board[enemies[i][1]][enemies[i][2]] = "0"
		}

		if (enemies[i][0] == "RED") {
			enemies[i][1] = 1;
			enemies[i][2] = 1;
		}

		else if (enemies[i][0] == "BLUE") {
			enemies[i][1] = 1;
			enemies[i][2] = cols_num - 2;
		}

		else if (enemies[i][0] == "GREEN") {
			enemies[i][1] = rows_num - 2;
			enemies[i][2] = 1;
		}

		else if (enemies[i][0] == "ORANGE") {
			enemies[i][1] = rows_num - 2;
			enemies[i][2] = cols_num - 2;
		}
	}

	//Clear player
	board[player.i][player.j] == "0"

	let randomStart = findRandomEmptyCell(board);
	player.i = randomStart[0];
	player.j = randomStart[1];

	interval = setInterval(UpdatePosition, 50);
	interval_enemy = setInterval(moveEnemies, 1000);

}

function startTimer(gameDuration, timer_div) {
	var minutes, seconds;
	timer = gameDuration;
	start_timer_aux = setInterval(function () {
		minutes = parseInt(timer / 60, 10)
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		lblTime.value = minutes + ":" + seconds;

		if (--timer < 0) {
			//Game over here
			Draw();
			gameOver();
			setTimeout(function () {
				showMessage();
			}, 300);
		}
	}, 1000);
}

function spawn_power_up() {
	var randomNum = Math.random();

	if (settings_lives < 5 && !power_up_hp && randomNum <= 0.25) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = "HP";
		power_up_hp = true;
		audio_power_popup[Math.floor(Math.random() * audio_power_popup.length)].play();
	}


	if (!power_up_clock && randomNum > 0.25 && randomNum <= 0.5) {
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = "C";
		power_up_clock = true;
		audio_power_popup[Math.floor(Math.random() * audio_power_popup.length)].play();
	}


	if (!power_up_freeze && randomNum > 0.5 && randomNum <= 0.75) {
		power_up_freeze = true;
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = "S";
		audio_power_popup[Math.floor(Math.random() * audio_power_popup.length)].play();
	}

	if (!power_up_cherry && randomNum > 0.75) {
		emptyCell = [9, 8];
		cherry.i = emptyCell[0];
		cherry.j = emptyCell[1];
		cherry.memory = "0"
		power_up_cherry = true;
		audio_power_popup[Math.floor(Math.random() * audio_power_popup.length)].play();
		interval_cherry = setInterval(moveCherry, 500);
	}
}

function moveCherry() {
	// return a good step [x,y] to make
	let cherryMove = cherry_step(cherry.i, cherry.j);
	//Mark that the cherry moved from last spot

	//If was on tile
	if (cherry.memory != "0" && cherry.memory != "E") {
		board[cherry.i][cherry.j] = cherry.memory
		cherry.memory = "0"
	}
	//If was on empty space
	else {
		board[cherry.i][cherry.j] = "0"
	}

	cherry.i = cherryMove[0];
	cherry.j = cherryMove[1];
	//Mark that the cherry moved to the new spot
	if (board[cherry.i][cherry.j] != "0" && board[cherry.i][cherry.j] != "P") {
		cherry.memory = board[cherry.i][cherry.j]
	}

	if (cherry.i == player.i && cherry.j == player.j) {
		//Get bonus 50 points
		score += 50;
		window.clearInterval(interval_cherry);
		cherry.i = -1;
		cherry.j = -1;
		cherry.memory = "0";
		power_up_cherry = false;
		audio_cherry_pick.play();
	}
	else {
		Draw();
	}
}

function gameOver() {
	window.clearInterval(interval);
	window.clearInterval(interval_enemy);
	window.clearInterval(countDowntimer);
	window.clearInterval(power_ups);
	window.clearInterval(start_timer_aux);
	window.clearInterval(interval_cherry);
	cherry.i = -1;
	cherry.j = -1;
	if (freeze_active) {
		window.clearInterval(freeze_timer);
	}
	audio_background.pause();
}

function showMessage() {
	if (settings_lives == 0) {
		window.alert("Loser!");
	}
	else if (score < 100) {
		window.alert("You are better than " + score + " points!");
	}
	else {
		window.alert("Winner!!!");
	}
}

function show_settings() {
	lblUp.value = keys_symbol['up'];
	lblDown.value = keys_symbol['down'];
	lblRight.value = keys_symbol['right'];
	lblLeft.value = keys_symbol['left'];
	lbl5.value = colors['5'];
	lbl15.value = colors['15'];
	lbl25.value = colors['25'];
	lblBalls.value = numbers['balls'];
	lblGameTime.value = numbers['time'];
	lblGhosts.value = numbers['ghosts'];
}

function check_music() 
{
	if (music_on) 
	{
		audio_background.pause();
		music_on = false;
	}
	else 
	{
		audio_background.play();
		music_on = true;
	}
}