$(document).ready(function () {
    localStorage.setItem('k', 'k')

    // Check if username already exists
    $.validator.addMethod('is_exist', function (value, element) {
        return this.optional(element) || localStorage.getItem(value) == null;
    });

    // Check if password length has at least 6 characters
    $.validator.addMethod('password_length', function (value, element) {
        return this.optional(element) || value.length >= 6;
    });

    // Check if password contains at least one digit
    $.validator.addMethod('password_contains_one_digit', function (value, element) {
        return this.optional(element) || /\d/.test(value);
    });

    // Check if password contains at least one char
    $.validator.addMethod('password_contains_one_char', function (value, element) {
        return this.optional(element) || /[a-z]/i.test(value);
    });

    $.validator.addMethod('full_name_letters_only', function (value, element) {
        return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
    });

    $('#register_form').validate({
        rules:
        {
            username_register:
            {
                required: true,
                is_exist: true
            },

            password_register:
            {
                required: true,
                password_length: true,
                password_contains_one_digit: true,
                password_contains_one_char: true
            },

            full_name_register:
            {
                required: true,
                full_name_letters_only: true
            },

            email_register:
            {
                required: true,
                email: true
            },
            date_register:
            {
                required: true,
                min: '1900-01-01',
                max: '2022-01-01'
            }
        },

        messages:
        {
            username_register:
            {
                required: 'Please enter a user name',
                is_exist: 'Username already exists'
            },

            password_register:
            {
                required: 'Please enter a password',
                password_length: 'Password must be at least 6 characters',
                password_contains_one_digit: 'Password must be contains at least one digit',
                password_contains_one_char: 'Password must be contains at least one char'

            },

            full_name_register:
            {
                required: 'Please enter a full name',
                full_name_letters_only: 'Please enter letters only'
            },

            email_register:
            {
                required: 'Please enter an email',
                email: 'Please enter a valid email'
            },

            date_register:
            {
                required: 'Please enter a birthdate',
                min: 'Please enter a date after 01-01-1900',
                max: 'Please enter a date before 01-01-2022'
            }
        },
        errorPlacement: function (label, element) {
            label.addClass('error_message');
            label.insertAfter(element);
        },
        wrapper: 'span',

        submitHandler:
            function () {
                register();
                reset_register_form();
                showPage('login_screen');
            }
    });
});

function register() {
    let username = document.getElementById('username_register').value;
    let password = document.getElementById('password_register').value;
    localStorage.setItem(username, password);
}

function reset_register_form() {
    let form = document.getElementById('register_form');
    form.reset();

    let error = document.getElementsByClassName('error');
    [...error].forEach(element => {
        element.classList.remove('error');
        element.innerHTML = '';
    })
}