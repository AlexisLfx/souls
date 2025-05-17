/*Alexis Lopez Fregoso*/

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
    // Verificar si el elemento 'current-image' existe antes de usarlo
    const currentImageElement = document.getElementById('current-image');
    if (currentImageElement) {
        currentImageElement.src = imageSrc;
    } else {
        console.warn("Elemento 'current-image' no encontrado. La función changeImage no tendrá efecto.");
    }
}
    // Nav.

        // boton de compra
    // Solo ejecutar si existen botones con la clase .btn-comprar
    const comprarButtons = document.querySelectorAll('.btn-comprar');
    if (comprarButtons.length > 0) {
        comprarButtons.forEach(button => {
            button.addEventListener('click', function() {
                const url = this.getAttribute('data-url'); // Obtiene la URL del botón
                if (url) { // Asegúrate de que la URL no sea null
                    window.location.href = url; // Redirige a la página del producto
                }
            });
        });
    }


        // Title Bar.
        // Esta parte del código (que usa jQuery) añade dinámicamente #titleBar y #navPanel.
        // Si el error ocurre porque .menu-toggle (que parece ser parte de #titleBar)
        // no existe CUANDO el script de abajo intenta accederlo,
        // puede ser por el orden de ejecución o porque #titleBar no se añade en todas las páginas.
        // Por ahora, el script de abajo se protegerá, pero considera si #titleBar
        // y #navPanel deben estar en product-detail.html
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
    // Esta es la parte que causaba el error.
    // Seleccionamos los elementos.
    const menuToggle = document.querySelector('.toggle'); // Cambiado de .menu-toggle a .toggle para que coincida con lo que se añade dinámicamente arriba
    const menuPrincipal = document.querySelector('.menu-principal'); // Este elemento parece ser parte de tu HTML estático para el menú móvil

    // Verificamos si menuToggle (el botón) existe ANTES de añadir el event listener.
    // menuPrincipal también debe existir si la lógica depende de él.
    if (menuToggle) { // Si no hay '.toggle', no se añade el listener
        menuToggle.addEventListener('click', (event) => {
            event.preventDefault(); // Es buena idea prevenir la acción por defecto de un enlace si es un <a>

            // Cambia la propiedad aria-expanded entre true y false
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', String(!expanded)); // Convertir a string

            // Agrega o elimina la clase 'active' para mover el menú
            // Esto asume que #navPanel es el menú que quieres mostrar/ocultar con este toggle,
            // y que la clase .navPanel-visible es la que controla su visibilidad.
            // La lógica original de panel() ya maneja esto para $body.
            // Si '.menu-principal' es un menú diferente, asegúrate de que exista.
            if (menuPrincipal) {
                menuPrincipal.classList.toggle('active'); // O la clase que uses para tu menú móvil estático
            }

            // Para el panel dinámico (navPanel), su visibilidad es manejada por el plugin .panel()
            // y la clase 'navPanel-visible' en $body. El clic en el '.toggle' ya debería
            // ser manejado por ese plugin.
            // Si este `menuToggle` es INDEPENDIENTE del que crea el plugin `panel`,
            // entonces el `querySelector('.menu-toggle')` original podría referirse a otro elemento.
            // Dado que el HTML generado dinámicamente usa la clase 'toggle', he cambiado el selector.
        });
    }

    // El siguiente bloque es para el menú móvil que tienes en tu HTML directamente.
    // Es posible que tengas dos sistemas de menú (uno dinámico con jQuery y otro estático).
    const menuToggleStatic = document.querySelector('.menu-toggle'); // Este es el que tienes en tu HTML
    const menuPrincipalStatic = document.querySelector('.menu-principal');

    if (menuToggleStatic && menuPrincipalStatic) {
      menuToggleStatic.addEventListener('click', () => {
        const expanded = menuToggleStatic.getAttribute('aria-expanded') === 'true' || false;
        menuToggleStatic.setAttribute('aria-expanded', !expanded);
        menuPrincipalStatic.classList.toggle('active');
      });
    }
});