// proyectT/assets/js/email.js

/**

 * @param {HTMLFormElement} formElement 
 * @param {string[]} fieldNames 
 * @param {Object.<string, string>} fieldAlerts 
 * @returns {boolean} 
 */
function validateFormFields(formElement, fieldNames, fieldAlerts) {
  for (const fieldName of fieldNames) {
      const inputElement = formElement.elements[fieldName]; 

      if (!inputElement) {
          console.warn(`Campo con nombre '${fieldName}' no encontrado en el formulario.`);
         
          continue; 
      }

      if (inputElement.value.trim() === "") {
          const alertMessage = fieldAlerts[fieldName] || `El campo '${fieldName}' es obligatorio.`;
          alert(alertMessage);
          inputElement.focus();
          return false; 
      }
  }
  return true; 
}

// --- Lógica para el FORMULARIO DE CONTACTO ---
const contactForm = document.getElementById('form'); 
const contactBtn = document.getElementById('button');

if (contactForm && contactBtn) {
  contactForm.addEventListener('submit', function(event) {
      event.preventDefault();


      const fieldsToValidate = ['name', 'email', 'message'];
      const alertMessages = {
          'name': 'Ingresa tu nombre.',
          'email': 'Ingresa tu correo electrónico.',
          'message': 'Escribe tu mensaje.'
      };

      if (!validateFormFields(this, fieldsToValidate, alertMessages)) {
          return; 
      }

      contactBtn.value = 'Sending...';
      const serviceID = 'default_service';
      const templateID = 'template_o6na2nf'; 

      emailjs.sendForm(serviceID, templateID, this)
          .then(() => {
              contactBtn.value = 'Send Email';
              alert('Sent!');
              this.reset();
          }, (err) => {
              contactBtn.value = 'Send Email';
              alert(JSON.stringify(err));
          });
  });
}


const shippingForm = document.getElementById('form'); 
const shippingBtn = document.getElementById('boton');

if (shippingForm && shippingBtn && window.location.pathname.includes('cart.html')) {
  shippingForm.addEventListener('submit', function(event) {
      event.preventDefault();

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
      };

      if (!validateFormFields(this, fieldsToValidateShipping, shippingAlertMessages)) {
          return; 
      }

      shippingBtn.value = 'Redirigiendo...';
      const serviceID = 'default_service';
      const templateID = 'template_pblhwn6'; 

      emailjs.sendForm(serviceID, templateID, this)
          .then(() => {
              window.location.href = 'pago.html';
          }, (err) => {
              shippingBtn.value = 'Continuar'; 
              alert(JSON.stringify(err));
          });
  });
}
