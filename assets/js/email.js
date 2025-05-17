// proyectT/assets/js/email.js

/**
 * Valida una lista de campos de un formulario.
 * @param {HTMLFormElement} formElement - El elemento del formulario.
 * @param {string[]} fieldNames - Un array con los nombres (atributo 'name') de los campos a validar.
 * @param {Object.<string, string>} fieldAlerts - Un objeto que mapea fieldName a mensaje de alerta.
 * @returns {boolean} - True si todos los campos son válidos, false si alguno está vacío.
 */
function validateFormFields(formElement, fieldNames, fieldAlerts) {
  for (const fieldName of fieldNames) {
      const inputElement = formElement.elements[fieldName]; // Acceder por el atributo 'name'

      if (!inputElement) {
          console.warn(`Campo con nombre '${fieldName}' no encontrado en el formulario.`);
          // Podrías mostrar una alerta genérica aquí si lo deseas, o simplemente continuar
          // asumiendo que el campo no es crítico si no se encuentra.
          // Por seguridad, si un campo esperado no existe, es mejor considerarlo un error de configuración.
          // alert(`Error de configuración: campo ${fieldName} no encontrado.`);
          // return false; // Opcional: fallar si el campo no existe
          continue; // O simplemente saltarlo si podría ser opcional en el HTML
      }

      if (inputElement.value.trim() === "") {
          const alertMessage = fieldAlerts[fieldName] || `El campo '${fieldName}' es obligatorio.`;
          alert(alertMessage);
          inputElement.focus();
          return false; // Detiene la validación y el envío
      }
  }
  return true; // Todos los campos especificados son válidos
}

// --- Lógica para el FORMULARIO DE CONTACTO ---
const contactForm = document.getElementById('form'); // Asumiendo id="form" para contacto
const contactBtn = document.getElementById('button');

if (contactForm && contactBtn) {
  contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Campos a validar para el formulario de contacto y sus mensajes
      const fieldsToValidate = ['name', 'email', 'message']; // Usa los atributos 'name' de tus inputs
      const alertMessages = {
          'name': 'Ingresa tu nombre.',
          'email': 'Ingresa tu correo electrónico.',
          'message': 'Escribe tu mensaje.'
      };

      if (!validateFormFields(this, fieldsToValidate, alertMessages)) {
          return; // Detiene el envío si la validación falla
      }

      contactBtn.value = 'Sending...';
      const serviceID = 'default_service';
      const templateID = 'template_o6na2nf'; // Para el formulario de contacto

      emailjs.sendForm(serviceID, templateID, this)
          .then(() => {
              contactBtn.value = 'Send Email';
              alert('Sent!');
              this.reset(); // Limpiar formulario
          }, (err) => {
              contactBtn.value = 'Send Email';
              alert(JSON.stringify(err));
          });
  });
}

// --- Lógica para el FORMULARIO DE DATOS DE ENVÍO (en cart.html) ---
// Asumimos que este formulario tiene un ID diferente, por ejemplo "shippingForm"
// y el botón "Continuar" tiene id="boton"
const shippingForm = document.getElementById('form'); // ¡CUIDADO! Si ambos formularios tienen id="form", esto es un problema.
                                                     // Deberías usar IDs diferentes para formularios diferentes.
                                                     // Por ejemplo, id="shippingForm" para el de cart.html
const shippingBtn = document.getElementById('boton');

// Solo ejecutar si estamos en cart.html y los elementos existen
// Puedes cambiar 'cart.html' por el nombre real de tu página de carrito
if (shippingForm && shippingBtn && window.location.pathname.includes('cart.html')) {
  shippingForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Campos a validar para el formulario de envío y sus mensajes
      // Ajusta estos nombres de campo a los atributos 'name' de tus inputs en cart.html
      const fieldsToValidateShipping = ['nombre', 'email', 'telefono', 'direccion', 'codigo_postal', 'pais', 'estado', 'ciudad'];
      const shippingAlertMessages = {
          'nombre': 'Ingresa tu nombre completo.',
          'email': 'Ingresa tu correo electrónico.',
          'telefono': 'Ingresa tu número de teléfono.',
          'direccion': 'Ingresa tu dirección de envío.',
          'codigo_postal': 'Ingresa tu código postal.',
          'pais': 'Ingresa tu país.',
          'estado': 'Ingresa tu estado/provincia.',
          'ciudad': 'Ingresa tu ciudad.'
          // 'info' es opcional, así que no lo incluimos aquí
      };

      if (!validateFormFields(this, fieldsToValidateShipping, shippingAlertMessages)) {
          return; // Detiene el envío si la validación falla
      }

      shippingBtn.value = 'Redirigiendo...';
      const serviceID = 'default_service';
      const templateID = 'template_pblhwn6'; // Para el formulario de envío

      emailjs.sendForm(serviceID, templateID, this)
          .then(() => {
              // No es necesario cambiar shippingBtn.value si se redirige inmediatamente
              window.location.href = 'pago.html';
              // Podrías querer limpiar el localStorage del carrito aquí o en la página de confirmación de pago
          }, (err) => {
              shippingBtn.value = 'Continuar'; // O el texto original del botón
              alert(JSON.stringify(err));
          });
  });
}
