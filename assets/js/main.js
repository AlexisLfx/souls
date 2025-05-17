
(function($) {

    var $window = $(window),
        $body = $('body');

    // Breakpoints.
        breakpoints({
            xlarge:  [ '1281px',  '1680px' ],
            large:   [ '981px',   '1280px' ],
            medium:  [ '737px',   '980px'  ],
            small:   [ null,      '736px'  ]
        });

    // Play initial animations on page load.
        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-preload');
            }, 100);
        });


    // Dropdowns.
        $('#nav > ul').dropotron({
            mode: 'fade',
            noOpenerFade: true,
            hoverDelay: 150,
            hideDelay: 350
        });

//carrusel
function changeImage(imageSrc) {
    const currentImageElement = document.getElementById('current-image');
    if (currentImageElement) {
        currentImageElement.src = imageSrc;
    } else {
        console.warn("Elemento 'current-image' no encontrado. La función changeImage no tendrá efecto.");
    }
}
    // Nav.

        // boton de compra
    const comprarButtons = document.querySelectorAll('.btn-comprar');
    if (comprarButtons.length > 0) {
        comprarButtons.forEach(button => {
            button.addEventListener('click', function() {
                const url = this.getAttribute('data-url'); 
                if (url) { 
                    window.location.href = url; 
                }
            });
        });
    }


       
        if ($body && typeof $body.panel === 'function' && typeof $('#nav').navList === 'function' && $('#nav').length > 0) {
            $(
                '<div id="titleBar">' +
                    '<a href="#navPanel" class="toggle"></a>' + // Este es el elemento con clase 'toggle'
                '</div>'
            )
                .appendTo($body);

            // Panel.
            $(
                '<div id="navPanel">' +
                    '<nav>' +
                        $('#nav').navList() +
                    '</nav>' +
                '</div>'
            )
                .appendTo($body)
                .panel({
                    delay: 500,
                    hideOnClick: true,
                    hideOnSwipe: true,
                    resetScroll: true,
                    resetForms: true,
                    side: 'left',
                    target: $body,
                    visibleClass: 'navPanel-visible'
                });
        }


})(jQuery);


document.addEventListener('DOMContentLoaded', function() {
   
    const menuToggle = document.querySelector('.toggle'); 
    const menuPrincipal = document.querySelector('.menu-principal'); 


    if (menuToggle) { // Si no hay '.toggle', no se añade el listener
        menuToggle.addEventListener('click', (event) => {
            event.preventDefault(); 

            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', String(!expanded));

            if (menuPrincipal) {
                menuPrincipal.classList.toggle('active'); 
            }
        });
    }


    const menuToggleStatic = document.querySelector('.menu-toggle'); 
    const menuPrincipalStatic = document.querySelector('.menu-principal');

    if (menuToggleStatic && menuPrincipalStatic) {
      menuToggleStatic.addEventListener('click', () => {
        const expanded = menuToggleStatic.getAttribute('aria-expanded') === 'true' || false;
        menuToggleStatic.setAttribute('aria-expanded', !expanded);
        menuPrincipalStatic.classList.toggle('active');
      });
    }
});