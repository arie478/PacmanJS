function showPage(div_id) 
{
    if (document.getElementById('game_screen').style.display == '')
    {
        gameOver();
    }
    $('.screen').hide();    // hide all screens
    $('#' + div_id).show(); // show only desired screen
    $('#' + div_id).focus();
};

