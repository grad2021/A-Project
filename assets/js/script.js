$('.navbar-nav .nav-link').click(function () {

    $('html, body').animate({

        scrollTop: $('#' + $(this).data('value')).offset().top

    }, 1000);

});


    var scrollIcon = $("#scroll-top");

    $(window).scroll(function () {
        if ($(this).scrollTop() >= 450) {

            scrollIcon.show(250);
        } else {
            scrollIcon.hide(250);
        }

    });

    scrollIcon.click(function () {
        $("body,html").animate({
            scrollTop: 0
        }, 1100);
    });
