document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const categoryName = params.get('category'); // e.g., "listaGorras"

    // Mapping from categoryName to actual product array name
    const categoryMap = {
        'listaGorras': gorras,
        'listaHoodies': hoodies,
        'listaPlayeras': playeras,
        'listahoodiesZ': hoodiesz,
        'listasportshirt': sportshirt,
        'listacompress': compress,
        'listahoodiebrazo': hoodiebrazo,
        'listarezaque': rezaque,
        'listapolos': polos,
        'listamangass': mangass,
        'listaninos': ninos,
        'listamochilas': mochilas,
        'listamochilacruz': mochilacruz,
        'listatazas': tazas,
        'listatermos': termos
    };

    const productArray = categoryMap[categoryName];
    let currentProduct = null;

    if (productArray && productId) {
        currentProduct = productArray.find(p => p.id === productId);
    }

    if (currentProduct) {
        document.getElementById('product-name-title').textContent = currentProduct.nombre;
        document.getElementById('main-product-image').src = currentProduct.img;
        document.getElementById('main-product-image').alt = currentProduct.nombre;
        document.getElementById('product-description').textContent = currentProduct.descripcion;
        document.getElementById('product-price').textContent = `$${parseFloat(currentProduct.precio).toFixed(2)}`;

        // Show size selector only for relevant categories
        const categoriesWithSizes = ["listaPlayeras", "listaHoodies", "listahoodiesZ", "listasportshirt", "listacompress", "listahoodiebrazo", "listapolos"];
        const sizeSelectorContainer = document.getElementById('size-selector-container');
        if (categoriesWithSizes.includes(categoryName)) {
            sizeSelectorContainer.style.display = 'block';
        } else {
            sizeSelectorContainer.style.display = 'none';
        }


        // Example: Add thumbnails if you have multiple images per product
        // For now, we'll just use the main image as the only thumbnail
        const thumbnailsContainer = document.getElementById('product-thumbnails');
        if (thumbnailsContainer) {
            const thumb = document.createElement('img');
            thumb.src = currentProduct.img;
            thumb.alt = `Thumbnail ${currentProduct.nombre}`;
            thumb.className = 'thumbnail-img active'; // Mark as active by default
            thumb.addEventListener('click', () => {
                document.getElementById('main-product-image').src = currentProduct.img;
                // Logic to update active thumbnail if multiple exist
                document.querySelectorAll('.thumbnail-img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            thumbnailsContainer.appendChild(thumb);
        }


        const addToCartButton = document.getElementById('add-to-cart-button');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                let selectedSize = null;
                if (sizeSelectorContainer.style.display !== 'none') {
                    const tallaSelect = document.getElementById('talla-product-detail');
                    if (tallaSelect) {
                        selectedSize = tallaSelect.value;
                    }
                }
                agregarAlCarrito(currentProduct, selectedSize); // from cartService.js
                alert(`${currentProduct.nombre} ${selectedSize ? '(Talla: ' + selectedSize + ')' : ''} agregado al carrito.`);
                actualizarNumeroCarritoDetalle(); // Update cart count on detail page
            });
        }
    } else {
        document.getElementById('product-name-title').textContent = 'Producto no encontrado';
        document.querySelector('.product-layout').innerHTML = '<p>El producto que buscas no está disponible.</p>';
    }

    // Function to update cart count specifically for the detail page
    function actualizarNumeroCarritoDetalle() {
        const cuentaCarritoElementDetalle = document.getElementById("cuenta-carrito-detalle");
        if (cuentaCarritoElementDetalle) {
            const memoria = JSON.parse(localStorage.getItem("productos")) || [];
            const cuenta = memoria.reduce((acum, item) => acum + item.cantidad, 0);
            cuentaCarritoElementDetalle.innerText = cuenta;
        }
    }
    actualizarNumeroCarritoDetalle(); // Initial call
});

// Ensure the search function is available if you have a search bar on this page too.
// You might want to move the search function to a more global script if used on multiple pages.
function search(event) {
    event.preventDefault();
    const query = document.getElementById("searchInputDetail").value.trim().toLowerCase(); // Use the correct ID
    if (query === "") {
        alert("Por favor, ingresa un término de búsqueda.");
        return;
    }
    // Basic redirect for store if needed
    if (query.includes("tienda") || query.includes("store")) {
        window.location.href = "store.html";
    } else {
        // Fallback or more complex search logic if needed
        alert("Búsqueda para: " + query + " (funcionalidad de búsqueda en detalle no implementada completamente)");
    }
}