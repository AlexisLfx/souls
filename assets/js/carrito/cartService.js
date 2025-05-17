// proyectT/assets/js/carrito/cartService.js

const cuentaCarritoElement = document.getElementById("cuenta-carrito");
const keyLocalstorage = "productos";

/** 🛒 Agrega un producto al carrito */
function agregarAlCarrito(producto, selectedSize = null) { // Added selectedSize parameter
    let memoria = JSON.parse(localStorage.getItem(keyLocalstorage)) || [];
    const indiceProducto = memoria.findIndex(item => item.id === producto.id && item.size === selectedSize); // Check for ID and size
    let cantidadProductoFinal = 1;

    if (indiceProducto === -1) {
        // If product with specific size not found, add new entry
        memoria.push({ ...producto, cantidad: 1, size: selectedSize });
    } else {
        // If product with specific size found, increment quantity
        memoria[indiceProducto].cantidad++;
        cantidadProductoFinal = memoria[indiceProducto].cantidad;
    }

    localStorage.setItem(keyLocalstorage, JSON.stringify(memoria));
    actualizarNumeroCarrito();
    if (typeof actualizarResumenPedido === 'function') {
        actualizarResumenPedido();
    }

    return cantidadProductoFinal;
}

/** 🔽 Resta una unidad de un producto del carrito */
// Update restarAlCarrito if you need to handle sizes there as well, for example, if items with different sizes are treated as distinct cart entries.
// For now, assuming size makes items distinct, so removing one specific item if its quantity becomes 0.
function restarAlCarrito(producto) { // You might need to pass size here too if items are distinct by size
    let memoria = JSON.parse(localStorage.getItem(keyLocalstorage)) || [];
    // Find the index based on ID and potentially size if your cart treats same product with different sizes as distinct items
    const indiceProducto = memoria.findIndex(item => item.id === producto.id && item.size === producto.size); // Assuming producto object passed to restarAlCarrito contains its size

    if (indiceProducto === -1) return 0;

    memoria[indiceProducto].cantidad--;
    if (memoria[indiceProducto].cantidad === 0) {
        memoria.splice(indiceProducto, 1);
    }

    if (memoria.length > 0) {
        localStorage.setItem(keyLocalstorage, JSON.stringify(memoria));
    } else {
        localStorage.removeItem(keyLocalstorage);
    }

    actualizarNumeroCarrito();
    if (typeof actualizarResumenPedido === 'function') {
        actualizarResumenPedido();
    }

    return memoria[indiceProducto]?.cantidad || 0;
}


/** 🔢 Actualiza el número del carrito en el header */
function actualizarNumeroCarrito() {
    if (cuentaCarritoElement) {
        const memoria = JSON.parse(localStorage.getItem(keyLocalstorage)) || [];
        const cuenta = memoria.reduce((acum, item) => acum + item.cantidad, 0);
        cuentaCarritoElement.innerText = cuenta;
    }
}

/** 🗑 Reinicia el carrito */
function reiniciarCarrito() {
    localStorage.removeItem(keyLocalstorage);
    actualizarNumeroCarrito();
    if (typeof actualizarResumenPedido === 'function') {
        actualizarResumenPedido();
    }
    return "Carrito reiniciado";
}

actualizarNumeroCarrito();

if (typeof actualizarResumenPedido === 'function') {
    actualizarResumenPedido();
}