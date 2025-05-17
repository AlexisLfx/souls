function search(event) {
    event.preventDefault(); 

    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    if (query === "") {
        alert("Por favor, ingresa un término de búsqueda.");
        return;
    }

   
    const pages = {
        "carrito": "cart.html",
        "tienda": "store.html",
        "sobre nosotros": "about_us.html",
        "comunidad": "community.html", 
        "inicio": "index.html",
        "contacto": "index.html#footer", 
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

    };

    for (const key in pages) {
        if (query.includes(key)) {
            window.location.href = pages[key];
            return; 
        }
    }

  
    const elements = document.querySelectorAll("body *:not(script):not(style)"); 
    let found = false;

    elements.forEach(element => {
        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
            const elementText = element.textContent.trim().toLowerCase();
            if (elementText.includes(query)) {
                try {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });

                    element.style.backgroundColor = "yellow"; 
                    setTimeout(() => { element.style.backgroundColor = ""; }, 3000); 
                    found = true;
                } catch (e) {
                    console.warn("No se pudo hacer scroll hacia el elemento:", e);
                }
            }
        }
    });

    if (!found) {
        alert("No se encontró ninguna coincidencia para '" + query + "' en esta página, ni una redirección directa.");
    }
}