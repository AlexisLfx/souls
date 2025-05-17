function actualizarResumenPedido() {
    const memoria = JSON.parse(localStorage.getItem(keyLocalstorage)) || [];

    let subtotal = 0;
    memoria.forEach(producto => {
        subtotal += parseFloat(producto.precio) * producto.cantidad;
    });

    const envio = subtotal > 0 ? 9 : 0;
    const impuestos = subtotal * 0.16;
    const total = subtotal + envio;

    // Mostrar los valores con 2 decimales
    document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById("envio").innerText = `$${envio.toFixed(2)}`;
    document.getElementById("impuestos").innerText = `$${impuestos.toFixed(2)} de impuestos`;
    document.getElementById("total").innerText = `$${total.toFixed(2)}`;
}
document.addEventListener("DOMContentLoaded", () => {
    actualizarResumenPedido();
});
