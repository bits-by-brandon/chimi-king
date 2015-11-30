$(document).ready(function(){
    var navArray = [];
    var lastPage = 1;
    var currentPage = 1;
    var scrolled = false;
    
	$('.icon').each (function(){
		navArray.push('#'+this.id);
	});
    
    for(i=0; i<= navArray.length-1; i++){
		$(navArray[i]).click(function(){	
            event.preventDefault();
            for(i=0; i<= navArray.length-1 ;i++){
                if('nav' + (i+1) == this.id){
                    $("html, body").stop().animate({ scrollTop: $('#section'+ (i+1)).offset().top }, 500);
                }
            }
        });
    }

    $( window ).scroll(function() {
        scrolled = true;
    });

    function calcPage(){
        if ( scrolled == true ){
            console.log( 'doing work' );
            $scrollTop = $(document).scrollTop();
            $windowHeight = $(window).innerHeight();
            page_offset = ( $scrollTop + $windowHeight * 0.5 ) % ( $windowHeight / 2 );
            currentPage = ( ( ( $scrollTop - page_offset ) + $windowHeight ) / $windowHeight ); //I wrote this at 5:27am. Don't ask me how, but it works.

            currentPage = Math.ceil( currentPage ); 
            if(lastPage != currentPage){
                checkNav(currentPage);
            } 
            lastPage = currentPage;  
            scrolled = false;
        }
    }

    window.setInterval(calcPage, 100);
    
    function checkNav(page){
        $('.icon').each (function(){
            $(this).removeClass("active");
        });
        $("#nav"+page).addClass("active");
    }
    
    checkNav(currentPage);
    
    $('header').click(function(){
        $('header').toggleClass('m-active');
    });
    
});
