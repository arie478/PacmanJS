$(document).ready(function () {

    // Save username and password in localStorage mechanism (no need to save full name, email and date)
    localStorage.setItem('k', 'k')

    $('#login_form').validate({
        rules:
        {
            username_login: { required: true },
            password_login: { required: true }
        },

        messages:
        {
            username_login: { required: 'Please enter a user name' },
            password_login: { required: 'Please enter a password' }
        },

        errorPlacement: function (label, element) {
            label.addClass('error_message');
            label.insertAfter(element);
        },
        wrapper: 'span',

        submitHandler:
            function ()
            {
                login();
                reset_login_form();
            }
    });
});

function login() 
{
    let username_input = document.getElementById('username_login').value;
    let passord_input = document.getElementById('password_login').value;
    let real_password = localStorage.getItem(username_input)

    if (real_password == passord_input) 
    {
        online_user = username_input;
        reset_setting_form();
        showPage('setting_screen');
    }
    else 
    {
        alert('Username or Password are invalid');
        showPage('login_screen');
    }
}

function reset_login_form()
{
    let form = document.getElementById('login_form');
    form.reset();

    let error = document.getElementsByClassName('error');
    [...error].forEach(element => {
        element.classList.remove('error');
        element.innerHTML = '';
    })
}