$(function(){
    // hide the div on page load and use a slidedown effect
    $('.sliding_portion').fadeOut(0, function(){
        $(this).slideDown(500);
    });
    // capture link clicks and slide up then go to the links href attribute
    $('a.slide_page').click(function(e){
        e.preventDefault();
        var $href = $(this).attr('href');
        $('.sliding_portion').slideUp(500, function(){
            window.location = $href;
        });
    });

});