    var pageArray = [];
$(document).ready(function(){
    var navArray = [];
    var lastPage = 1;
    var currentPage = 1;
    var scrolled = false;
    var $windowHeight = $(window).innerHeight();
    var $scrollTop = 0;
    
	$('.icon').each (function(){
		navArray.push('#'+this.id);
	});
    
    assignPage();
    
    for(i=0; i<= navArray.length-1; i++){
        $(navArray[i]).click(function(){	
            event.preventDefault();
            for(i=0; i<= navArray.length-1 ;i++){
                if('nav' + (i+1) == this.id){
                    if( window.innerWidth <= 880 ){
                        $("html, body").stop().animate({ scrollTop: $('#section'+ (i+1)).offset().top - 50 }, 500);
                    }else{
                        $("html, body").stop().animate({ scrollTop: $('#section'+ (i+1)).offset().top }, 500);
                    }
                }
            }
        });
    }

    function assignPage(){
        for( i = 0; i < navArray.length - 1; i++){
            pageArray[i] = $( '#section' + (i+1) ).offset();
        }
    }

    $( window ).scroll(function() {
        scrolled = true;
    });

    function calcPage(){
        if ( scrolled === true ){
            console.log( 'doing work' );
            $scrollTop = $(document).scrollTop();
            //currentPage = ( ( ( $scrollTop - page_offset ) + $windowHeight ) / $windowHeight ); //I wrote this at 5:27am. Don't ask me how, but it works.
            //currentPage = Math.ceil( currentPage ); 
            
            currentPage = checkPage();

            if(lastPage != currentPage){
                checkNav(currentPage);
            } 
            lastPage = currentPage;  
            scrolled = false;
        }
    }

    $(window).resize(function(){
        var $windowHeight = $(window).innerHeight();
        assignPage();

    });

    function checkPage(){
        for( i = 0; i <= pageArray.length; i++ ){
            tempPage = pageArray[i].top;
            the_scroll = $scrollTop + ( $windowHeight / 2 );
            if( window.innerWidth <= 880 ){
                console.log( tempPage );
                the_scroll = the_scroll + 50;
            }
            if( i === 5 ){
                return 6;
            }else{
                if( the_scroll >= tempPage && the_scroll < pageArray[i+1].top ){
                    return i + 1;
                }
            }
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
    
    $('#menuIcon').click(function(){
        $('#iconText').toggleClass('m-active');
    });
    
});
