$(document).ready(function () {

    $("#nav-links a").click(function (e) {
        e.preventDefault();

        $("#nav-links a").removeClass("active");
        $(this).addClass("active");

        let page = $(this).text().trim().toLowerCase();
        $(".page").removeClass("page-active");
        $("#" + page).addClass("page-active");

        if ($(window).width() <= 1200) $("#nav-links").slideUp(200);
    });

    $("#hamburger").click(function () {
        $("#nav-links").slideToggle(200);
    });
});

$(window).resize(function () {
    $("#nav-links").css("display",
        $(window).width() > 1200 ? "flex" : "none"
    );
});
