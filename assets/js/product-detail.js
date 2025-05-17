// proyectT/assets/js/product-detail.js

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const productCategory = params.get('category');

    if (!productId || !productCategory) {
        displayProductNotFound();
        return;
    }

    let productDataArray;
    // Ensure window.gorras etc. are available or loaded appropriately
    switch (productCategory) {
        case 'listaGorras': productDataArray = window.gorras; break;
        case 'listaHoodies': productDataArray = window.hoodies; break;
        case 'listaPlayeras': productDataArray = window.playeras; break;
        case 'listahoodiesZ': productDataArray = window.hoodiesz; break;
        case 'listasportshirt': productDataArray = window.sportshirt; break;
        case 'listacompress': productDataArray = window.compress; break;
        case 'listahoodiebrazo': productDataArray = window.hoodiebrazo; break;
        case 'listarezaque': productDataArray = window.rezaque; break;
        case 'listapolos': productDataArray = window.polos; break;
        case 'listamangass': productDataArray = window.mangass; break;
        case 'listaninos': productDataArray = window.ninos; break;
        case 'listamochilas': productDataArray = window.mochilas; break;
        case 'listamochilacruz': productDataArray = window.mochilacruz; break;
        case 'listatazas': productDataArray = window.tazas; break;
        case 'listatermos': productDataArray = window.termos; break;
        default:
            displayProductNotFound();
            return;
    }

    if (!productDataArray) {
        displayProductNotFound();
        return;
    }

    const product = productDataArray.find(p => p.id === productId);

    if (product) {
        displayProductDetails(product, productCategory);
    } else {
        displayProductNotFound();
    }
});

function displayProductDetails(product, categoryId) {
    document.getElementById('product-name-title').textContent = product.nombre;
    document.getElementById('main-product-image').src = product.img; // Ensure product.img has correct path relative to product-detail.html
    document.getElementById('main-product-image').alt = product.nombre;
    document.getElementById('product-description').textContent = product.descripcion;
    document.getElementById('product-price').textContent = `$${parseFloat(product.precio).toFixed(2)}`;

    const sizeSelectorContainer = document.getElementById('product-size-selector-container');
    const categoriesWithSizes = ["listaPlayeras", "listaHoodies", "listahoodiesZ", "listasportshirt", "listacompress", "listahoodiebrazo", "listapolos"];
    const showSizeMenu = categoriesWithSizes.includes(categoryId);

    if (showSizeMenu) {
        sizeSelectorContainer.innerHTML = `
            <label for="talla-detail-${product.id}">Talla:</label>
            <select name="talla" id="talla-detail-${product.id}" class="talla-select">
                <option value="S">S</option>
                <option value="M" selected>M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
        `;
    }

    const addToCartButton = document.getElementById('add-to-cart-button');
    addToCartButton.addEventListener('click', () => {
        let selectedSize = null;
        if (showSizeMenu) {
            const sizeSelect = document.getElementById(`talla-detail-${product.id}`);
            if (sizeSelect) {
                selectedSize = sizeSelect.value;
            }
        }
        // Ensure agregarAlCarrito is accessible from this scope
        if (typeof agregarAlCarrito === 'function') {
            agregarAlCarrito(product, selectedSize);
             alert(`${product.nombre} ${selectedSize ? '(Talla: ' + selectedSize + ')' : ''} agregado al carrito.`);
        } else {
            console.error('agregarAlCarrito function is not defined. Ensure cartService.js is loaded.');
        }
    });
}

function displayProductNotFound() {
    const mainContent = document.getElementById('main-product-detail');
    if (mainContent) {
        mainContent.innerHTML = '<header><h2>Producto no encontrado</h2></header><p>Lo sentimos, el producto que buscas no está disponible.</p>';
    }
}