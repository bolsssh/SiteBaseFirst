$(document).ready(function () {

    $(window).on('scroll', function () {
        var y_scroll_pos = window.pageYOffset;
        var scroll_pos_test = 500 // Edit this number to define how far down the page the div fades in.

        if (y_scroll_pos > scroll_pos_test) {
            $('#upArrow').fadeTo(500, 1);
        }
    });

});
$('#upArrow').on("click", function () {
    $("html, body").animate({scrollTop: 0}, "slow");

});

