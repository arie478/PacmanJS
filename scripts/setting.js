var keys_symbol = { 'up': 'ArrowUp', 'down': 'ArrowDown', 'left': 'ArrowLeft', 'right': 'ArrowRight' };
var keys_code = { 'up': 38, 'down': 40, 'left': 37, 'right': 39 };
var colors = { '5': '#ff0000', '15': '#0000ff', '25': '#3079a6' };
var numbers = { 'balls': 70, 'ghosts': 3, 'time': 60 };
var default_keys=[33,34,35,36,37,38,39,40];

$(document).ready(function () {
    $('#setting_form').validate({
        rules:
        {
            up: { required: true },
            down: { required: true },
            left: { required: true },
            right: { required: true },
            time: { required: true },
            balls: { required: true },
            ghosts: { required: true },
        },
        messages:
        {
            up: { required: 'Please enter up button' },
            down: { required: 'Please enter down button' },
            left: { required: 'Please enter left button' },
            right: { required: 'Please enter right button' },
            time:
            {
                required: 'Please enter a number',
                min: 'Minimum 60 seconds'
            },
            balls:
            {
                required: 'Please enter a number',
                min: 'Minimum 50 balls',
                max: 'Maximum 90 balls'
            },
            ghosts:
            {
                required: 'Please enter a number',
                min: 'Minimum 1 ghost',
                max: 'Maximum 4 ghosts'
            },
        },
        errorPlacement: function (label, element) 
        {
            label.addClass('error_message');
            label.insertAfter(element);
        },
        wrapper: 'span'
    });
});

// Take the user input key and insert it to keys_dict
function set_key_pressed(key_pressed) 
{
    $(document).keydown(function (event) 
    {
    // if (document.getElementById(key_pressed).value != '')
    // {
    //     document.getElementById(key_pressed).value = '';
    // }
        keys_code[key_pressed] = event.keycode;
        keys_symbol[key_pressed] = event.key;
        document.getElementById(key_pressed).value = keys_symbol[key_pressed];
        // if (event.kecode > 33 && event.kecode < 90)
        // {
        //     document.getElementById(key_pressed).value = keys_symbol[key_pressed];
        // }
        // else
        // {
        //     document.getElementById(key_pressed).value = '';
        // }
        $(document).unbind();
    });
}

function set_user_settings() 
{
    if ($('#setting_form').valid()) 
    {
        // Check if two or more keys are equals
        if (keys_code['up'] == keys_code['down'] || keys_code['up'] == keys_code['left'] || keys_code['up'] == keys_code['right'] ||
            keys_code['down'] == keys_code['left'] || keys_code['down'] == keys_code['right'] || keys_code['left'] == keys_code['right']) 
            {
            alert('Some of the keys are equals');
            return;
        }

        // Check if two or more colors are equals
        if (colors['5'] == colors['15'] || colors['5'] == colors['25'] || colors['15'] == colors['25'])
        {
            alert('Some of the colors are equals');
            return;
        }

        colors['5'] = document.getElementById('5_points').value;
        colors['15'] = document.getElementById('15_points').value;
        colors['25'] = document.getElementById('25_points').value;

        numbers['time'] = parseInt(document.getElementById('time').value);
        numbers['balls'] = parseInt(document.getElementById('balls').value);
        numbers['ghosts'] = parseInt(document.getElementById('ghosts').value);

        showPage('game_screen');
        show_settings()
        context = canvas.getContext("2d");
        Start();
    }
}

function set_random_settings() 
{
    reset_setting_form();
    
    // KEYS
    keys_code['up'] = 38;
    keys_code['down'] = 40;
    keys_code['left'] = 37;
    keys_code['right'] = 39;

    keys_symbol['up'] = 'ArrowUp';
    keys_symbol['down'] = 'ArrowDown';
    keys_symbol['left'] = 'ArrowLeft';
    keys_symbol['right'] = 'ArrowRight';

    document.getElementById('up').value = 'ArrowUp';
    document.getElementById('down').value = 'ArrowDown';
    document.getElementById('left').value = 'ArrowLeft';
    document.getElementById('right').value = 'ArrowRight';

    // COLORS
    colors['5'] = generate_random_color();
    colors['15'] = generate_random_color();
    colors['25'] = generate_random_color();

    document.getElementById('5_points').value = colors['5'];
    document.getElementById('15_points').value = colors['15'];
    document.getElementById('25_points').value = colors['25'];

    // NUMBERS
    numbers['time'] = generate_random_number(60, 1000);
    numbers['balls'] = generate_random_number(50, 90);
    numbers['ghosts'] = generate_random_number(1, 4);

    document.getElementById('time').value = numbers['time'];
    document.getElementById('balls').value = numbers['balls'];
    document.getElementById('ghosts').value = numbers['ghosts'];
}

function generate_random_color() 
{
    let letters = '0123456789ABCDEF';
    let color = '#';
    
    for (var i = 0; i < 6; i++) 
    {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generate_random_number(min, max) 
{
    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}

function reset_setting_form() {
    let form = document.getElementById('setting_form');
    form.reset();

    let error = document.getElementsByClassName('error');
    [...error].forEach((element) => {
        element.classList.remove('error');
        element.innerHTML = '';
    });
}

// Clear adding in URL after submitting form
document.getElementById("start_game").addEventListener("click", function (event) {
    event.preventDefault()
});

document.getElementById("random_game").addEventListener("click", function (event) {
    event.preventDefault()
});


