// When the document is ready
$(document).ready(function () {
    // Add a click event listener to all links with the class 'click-scroll'
    $('.click-scroll').click(function (e) {
        e.preventDefault(); // Prevent default link behavior
        
        // Get the href attribute of the clicked link (e.g., '#section_2')
        var targetSection = $(this).attr('href');
        
        // Calculate the offset of the target section from the top of the page
        var offset = $(targetSection).offset().top - 90;
        
        // Animate scrolling to the target section
        $('html, body').animate({
            scrollTop: offset
        }, 300);
    });
});

// When the user scrolls
$(document).scroll(function () {
    // Get the current scroll position
    var docScroll = $(document).scrollTop();

    // Loop through the section IDs
    $.each(sectionArray, function (index, value) {
        // Calculate the offset of the current section from the top of the page
        var offsetSection = $('#section_' + value).offset().top + 90;

        // Check if the user has scrolled to or past this section
        if (docScroll >= offsetSection) {
            // Remove 'active' class from all nav links
            $('.navbar-nav .nav-item .nav-link').removeClass('active');
            $('.navbar-nav .nav-item .nav-link').addClass('inactive');

            // Add 'active' class to the corresponding nav link
            $('.navbar-nav .nav-item .nav-link[href="#section_' + value + '"]').addClass('active');
            $('.navbar-nav .nav-item .nav-link[href="#section_' + value + '"]').removeClass('inactive');
        }
    });
});

// Initialize the page with the first nav link as 'active'
$(document).ready(function () {
    $('.navbar-nav .nav-item .nav-link[href="#section_1"]').addClass('active');
    $('.navbar-nav .nav-item .nav-link').not('[href="#section_1"]').addClass('inactive');
});