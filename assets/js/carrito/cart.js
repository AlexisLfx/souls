

const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage */
function crearTarjetasProductosCarrito() {
  if (!contenedorTarjetas) {
    return;
  }

  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem(keyLocalstorage)) || [];
  const esPaginaDePago = window.location.pathname.includes("pago.html");

  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevosProductos = document.createElement("div");
      nuevosProductos.classList = "tarjeta-producto";

      let controlesProductoHTML = "";
      const rutaImagen = producto.img;

      
      const tallaHTML = producto.size ? `<span class="product-size">Talla: ${producto.size}</span>` : ''; 

      if (esPaginaDePago) {
        controlesProductoHTML = `
          <div class="cantidad-display">
            <span>Cantidad: ${producto.cantidad}</span>
          </div>
        `;
      } else {
        controlesProductoHTML = `
          <div>
            <button class="boton-restar boton-comprar-responsive" data-product-id="${producto.id}" data-product-size="${producto.size || ''}">-</button>
            <span class="cantidad">${producto.cantidad}</span>
            <button class="boton-sumar boton-comprar-responsive" data-product-id="${producto.id}" data-product-size="${producto.size || ''}">+</button>
          </div>
        `;
      }

      nuevosProductos.innerHTML = `
        <img src="${rutaImagen}" alt="${producto.nombre || 'Producto'}">
        <h3>${producto.nombre || 'Nombre no disponible'}</h3>
        ${tallaHTML} 
        <span>$${parseFloat(producto.precio).toFixed(2) || '0.00'}</span>
        ${controlesProductoHTML}
      `;
      contenedorTarjetas.appendChild(nuevosProductos);

      if (!esPaginaDePago) {
        const botonRestar = nuevosProductos.querySelector(".boton-restar");
        const botonSumar = nuevosProductos.querySelector(".boton-sumar");

        if (botonRestar) {
          botonRestar.addEventListener("click", () => {
            restarAlCarrito(producto); 
            crearTarjetasProductosCarrito();
            if (typeof actualizarTotales === "function") actualizarTotales();
          });
        }

        if (botonSumar) {
          botonSumar.addEventListener("click", () => {
            agregarAlCarrito(producto, producto.size); 
            crearTarjetasProductosCarrito();
            if (typeof actualizarTotales === "function") actualizarTotales();
          });
        }
      }
    });
  }

  if (typeof revisarMensajeVacio === "function" && carritoVacioElement) {
    revisarMensajeVacio();
  }
  if (typeof actualizarTotales === "function" && totalesContainer && cantidadElement && precioElement) {
    actualizarTotales();
  }
  if (typeof actualizarNumeroCarrito === "function") {
    actualizarNumeroCarrito();
  }
  if (typeof actualizarResumenPedido === "function" && esPaginaDePago) {
      actualizarResumenPedido();
  }
}

document.addEventListener('DOMContentLoaded', () => {
    crearTarjetasProductosCarrito();
    if (typeof revisarMensajeVacio === "function" && document.getElementById("carrito-vacio")) {
        revisarMensajeVacio();
    }
    if (typeof actualizarTotales === "function" && document.getElementById("totales")) {
        actualizarTotales();
    }
});























