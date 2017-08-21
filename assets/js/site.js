$(document).ready(() => {
    $(".hero:after").scrollTop(1);
    
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 1) {
            $(".navbar").addClass("affix").fadeIn(10000);        
        }
    
        if ($(window).scrollTop() < 1) {
            $(".navbar").removeClass("affix").fadeIn(10000);
        }
    });

    $(document).on("click", ".expand-nav", () => {
        switch ($("nav").css("display")) {
            case "none":
                $("nav").css("display", "block");
                $(".navbar").css("background-color", "#FFF");                
                break;
            default:
                $("nav").css("display", "none");
                $(".navbar").css("background-color", "");                                
                break;
        }
    });    
});