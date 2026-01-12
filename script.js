$(document).ready(function() {
    const buttons = $('.buttons');
    const intro = $('#intro');
    const timeline = $('#timeline');
    const timelineContainer = $('.timeline-container');
    let timelineLocked = false;

    // Check if timeline is visible/in viewport
    function checkTimelinePosition() {
        const timelineTop = timeline.offset().top;
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        
        // Lock if timeline is at or above the top of viewport, OR if intro is shorter than viewport
        if (scrollTop >= timelineTop - 100 || intro.outerHeight() < windowHeight) {
            timelineLocked = true;
            console.log("Timeline locked!");
        } else {
            timelineLocked = false;
        }
    }
    
    // Check on load and after a brief delay (in case layout shifts)
    checkTimelinePosition();
    setTimeout(checkTimelinePosition, 100);

    // Handle fixed buttons and timeline state
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > intro.outerHeight() - 100) {
            buttons.addClass('fixed');
        } else {
            buttons.removeClass('fixed');
        }
        
        checkTimelinePosition();
    });

    // Mousewheel handler for horizontal scrolling
    $(document).mousewheel(function(evt, delta, deltaX, deltaY) {
        if (timelineLocked) {
            evt.preventDefault(); // Always prevent vertical scroll when locked
            
            const container = timelineContainer[0];
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            // Scroll timeline horizontally
            container.scrollLeft += (delta * 150);
            
            console.log("Timeline scrollLeft:", container.scrollLeft);
            
            // Only unlock if at the END (right) and trying to scroll forward
            if (container.scrollLeft >= maxScroll && delta > 0) {
                timelineLocked = false;
            }
        }
    });
});