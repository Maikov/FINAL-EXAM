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

