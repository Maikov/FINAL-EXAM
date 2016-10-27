'use strict'

$(function() {

    $('.jcarousel')
        .jcarousel({
            animation: 'slow',
            wrap: 'circular'
        })

    .jcarouselAutoscroll({
        interval: 6000,
        target: '+=1',
        autostart: true
    });

    $('.jcarousel_prev').jcarouselControl({
        target: '-=1'
    });

    $('.jcarousel_next').jcarouselControl({
        target: '+=1'
    });  
});


var $grid = $('.grid');

function isotopInit() {
	var $grid = $('.grid');
	$grid.masonry({
		// options
		itemSelector: '.grid-item',
		columnWidth: '.grid-item',
		percentPosition: true
	});
};
// function isotopInit() {
// 	$grid.isotope({
// 		// options
// 		itemSelector: '.grid-item',
// 		layoutMode: 'fitRows'
// 	});
// }

// 	$grid.isotope({
// 		itemSelector: '.grid-item',
// 		masonry: {
//         columnWidth: 300
//         }
// 	});
// }

function ajaxRequest(search) {
	var urlPixabay = "https://pixabay.com/api/";
	var API_KEY = '3297254-79da6932ff97f2db0b75bf2b8'; // My Reg KEY
	// var URL = "https://pixabay.com/api/?key=" + API_KEY +"&q=" + search + '&image_type=photo&pretty=true&per_page=7&orientation=horizontal';
	var URL = urlPixabay + '?key=' + API_KEY + '&per_page=7&callback='+ '&q=' + encodeURIComponent(search);
	$.ajax({
        // dataType: "json",
        dataType: "jsonp",
        url: URL,
	  success: function(data) {
	  	console.log(data);

	    for (var i = 0; i < data.hits.length; i++) {
	    	var listItem = '<div class="grid-item">'+
                '<img src="'+data.hits[i].userImageURL+'">'+
                '<div class="grid-name"><p>'+data.hits[i].tags+'</p></div>'+'</div>';
	    	$('.js-grid').append(listItem);
	    }
    	isotopInit();
	  }
	});
}

(function($){
	$(function(){

		ajaxRequest('cactus');

		$('body').on('click', '.search__button', function(e){
			e.preventDefault();
			$grid.isotope('destroy');
			var valueSearch = $('.search__input').val().replace(" ","+");
			$('.grid').find('.grid-item').remove();
			ajaxRequest(valueSearch);
		});
	});
})(jQuery);