

const cuentaCarritoElement = document.getElementById("cuenta-carrito");
const keyLocalstorage = "productos";

/** 🛒 Agrega un producto al carrito */
function agregarAlCarrito(producto, selectedSize = null) { 
    let memoria = JSON.parse(localStorage.getItem(keyLocalstorage)) || [];
    const indiceProducto = memoria.findIndex(item => item.id === producto.id && item.size === selectedSize); 
    let cantidadProductoFinal = 1;

    if (indiceProducto === -1) {
        
        memoria.push({ ...producto, cantidad: 1, size: selectedSize });
    } else {
        
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


function restarAlCarrito(producto) { 
    let memoria = JSON.parse(localStorage.getItem(keyLocalstorage)) || [];
    
    const indiceProducto = memoria.findIndex(item => item.id === producto.id && item.size === producto.size); 

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