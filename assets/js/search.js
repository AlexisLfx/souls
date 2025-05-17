function search(event) {
    event.preventDefault(); // Prevenir el envío tradicional del formulario

    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    if (query === "") {
        alert("Por favor, ingresa un término de búsqueda.");
        return;
    }

    // Diccionario de búsqueda con términos clave y sus enlaces correspondientes
    // Asegúrate de que estos IDs existan en las páginas correspondientes si son anclas (#)
    const pages = {
        "carrito": "cart.html",
        "tienda": "store.html",
        "sobre nosotros": "about_us.html",
        "comunidad": "community.html", // Asumiendo que tienes community.html
        "inicio": "index.html",
        "contacto": "index.html#footer", // Ejemplo: redirige a la sección footer de index.html
        "gorras": "store.html#GORRAS",
        "hoodies": "store.html#HODDIES",
        "playeras": "store.html#PLAYERAS",
        "hoodies zipper": "store.html#HOODIESZ",
        "sportshirt": "store.html#SPORTSHIRT",
        "compress": "store.html#COMPRESS",
        "hoodie sin manga": "store.html#HOODIEBRAZO",
        "rezaque": "store.html#REZAQUE",
        "polos": "store.html#POLOS",
        "mangas": "store.html#MANGASS",
        "niños": "store.html#NINOS",
        "mochilas": "store.html#MOCHILAS",
        "mochilas cruzadas": "store.html#MOCHILASCRUZ",
        "tazas": "store.html#TAZAS",
        "termos": "store.html#TERMOS"
        // Agrega más términos y las URLs o anclas correspondientes aquí
    };

    // Lógica de redirección a páginas/secciones específicas
    for (const key in pages) {
        if (query.includes(key)) {
            window.location.href = pages[key];
            return; // Importante: salir de la función después de redirigir
        }
    }

    // Si no se redirige, intenta buscar en la página actual (scroll)
    // Esta parte es más compleja de hacerla funcionar perfectamente en todas las estructuras de página.
    // Una búsqueda de texto simple podría no ser ideal para la navegación.
    // Considera si realmente necesitas esta funcionalidad o si el diccionario 'pages' es suficiente.

    const elements = document.querySelectorAll("body *:not(script):not(style)"); // Excluir scripts y styles
    let found = false;

    elements.forEach(element => {
        // Verificar solo en elementos que puedan contener texto visible y no sean contenedores muy genéricos
        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
            const elementText = element.textContent.trim().toLowerCase();
            if (elementText.includes(query)) {
                try {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                    // Opcional: Resaltar el elemento encontrado
                    element.style.backgroundColor = "yellow"; // Ejemplo de resaltado
                    setTimeout(() => { element.style.backgroundColor = ""; }, 3000); // Quitar resaltado después de 3s
                    found = true;
                } catch (e) {
                    console.warn("No se pudo hacer scroll hacia el elemento:", e);
                }
                // No retornar aquí para permitir encontrar múltiples instancias,
                // aunque scrollIntoView solo funcionará para el primero en este bucle simple.
                // Si quieres detenerte en la primera coincidencia, usa 'return' dentro de un bucle que lo permita (ej. for...of con break)
            }
        }
    });

    if (!found) {
        alert("No se encontró ninguna coincidencia para '" + query + "' en esta página, ni una redirección directa.");
    }
}