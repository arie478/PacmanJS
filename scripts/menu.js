function showPage(div_id) 
{
    $(".screen").hide();    // hide all screens
    $('#' + div_id).show(); // show only desired screen
    $('#' + div_id).focus();
};