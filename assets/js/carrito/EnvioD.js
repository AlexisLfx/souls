function actualizarFechaEnvio(tipo = "standard") {
  const fechaActual = new Date();
  const diasEnvio = tipo === "express" ? 3 : 7; // 3 días para envío express, 7 para estándar
  fechaActual.setDate(fechaActual.getDate() + diasEnvio);

  const opcionesFecha = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  const fechaFormateada = fechaActual.toLocaleDateString('es-MX', opcionesFecha);
  const capitalizada = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

  document.getElementById("fecha-envio").textContent = capitalizada;

  const costo = tipo === "express" ? "$180.00" : "$75.00";
  document.getElementById("envio").textContent = costo;

}

actualizarFechaEnvio();

document.getElementById("tipo-envio").addEventListener("change", function() {
  actualizarFechaEnvio(this.value);
});

