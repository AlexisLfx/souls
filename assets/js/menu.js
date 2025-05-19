// proyectT/assets/js/menu.js

function mostrarProductos(lista, productos, cantidad, id) {
    const contenedor = document.getElementById(id);
    if (!contenedor) return; // Added guard clause
    contenedor.innerHTML = "";

    const categoriesWithSizes = ["listaPlayeras", "listaHoodies", "listahoodiesZ", "listasportshirt", "listacompress", "listahoodiebrazo", "listapolos"];
    const showSizeMenu = categoriesWithSizes.includes(id);

    for (let i = 0; i < cantidad && i < productos.length; i++) {
        let div = document.createElement("div");
        div.className = "producto";

        let sizeMenuHTML = '';
        if (showSizeMenu) {
            sizeMenuHTML = `
            <div class="tallas-menu-container">
                <label for="talla-store-${productos[i].id}-${i}">Talla:</label>
                <select name="talla" id="talla-store-${productos[i].id}-${i}" class="talla-select">
                    <option value="S">S</option>
                    <option value="M" selected>M</option> <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>
            `;
        }

        div.innerHTML = `
            <a href="product-detail.html?id=${productos[i].id}&category=${id}" class="product-link">
                <div class="image-carousel-container">
                    <img src="${productos[i].img}" alt="${productos[i].nombre}" />
                </div>
                <h4>${productos[i].nombre}</h4>
            </a>

            ${sizeMenuHTML}
            <span class="precio">$${parseFloat(productos[i].precio).toFixed(2)}</span>
            <button class="btn-agregar" data-product-id="${productos[i].id}" data-select-id="talla-store-${productos[i].id}-${i}">Agregar al carrito</button>
        `;
        contenedor.appendChild(div);

        const addButton = div.querySelector(".btn-agregar");
        if (addButton) { // Check if button exists
            addButton.addEventListener("click", () => {
                let selectedSize = null;
                if (showSizeMenu) {
                    const sizeSelect = document.getElementById(addButton.dataset.selectId);
                    if (sizeSelect) { // Check if select element exists
                        selectedSize = sizeSelect.value;
                    }
                }
                // Pass the product and the selected size
                agregarAlCarrito(productos[i], selectedSize);
                // Optionally, provide user feedback
                alert(`${productos[i].nombre} ${selectedSize ? '(Talla: ' + selectedSize + ')' : ''} agregado al carrito.`);
            });
        }
    }
}

// ... (rest of your menu.js code, ensuring that `agregarAlCarrito` is accessible,
// likely from cartService.js if it's properly linked in your HTML before menu.js)
// Example initialization (ensure product arrays like 'gorras', 'hoodies', etc. are defined):
document.addEventListener('DOMContentLoaded', () => {
    // Call mostrarProductos for each category as you currently do
    // Ensure this part of your script runs *after* cartService.js is loaded
    // and the `agregarAlCarrito` function is globally available or properly imported/scoped.

    if (typeof gorras !== 'undefined') mostrarProductos("listaGorras", gorras, mostradosGorras, "listaGorras");
    if (typeof hoodies !== 'undefined') mostrarProductos("listaHoodies", hoodies, mostradosHoodies, "listaHoodies");
    if (typeof playeras !== 'undefined') mostrarProductos("listaPlayeras", playeras, mostradosPlayeras, "listaPlayeras"); // Corrected variable name
    if (typeof hoodiesz !== 'undefined') mostrarProductos("listahoodiesZ", hoodiesz, mostradoshoodiesZ, "listahoodiesZ");
    if (typeof sportshirt !== 'undefined') mostrarProductos("listasportshirt", sportshirt, mostradossportshirt, "listasportshirt");
    if (typeof compress !== 'undefined') mostrarProductos("listacompress", compress, mostradoscompress, "listacompress");
    if (typeof hoodiebrazo !== 'undefined') mostrarProductos("listahoodiebrazo", hoodiebrazo, mostradoshoodiebrazo, "listahoodiebrazo");
    if (typeof rezaque !== 'undefined') mostrarProductos("listarezaque", rezaque, mostradosrezaque, "listarezaque");
    if (typeof polos !== 'undefined') mostrarProductos("listapolos", polos, mostradospolos, "listapolos");
    if (typeof mangass !== 'undefined') mostrarProductos("listamangass", mangass, mostradosmangass, "listamangass"); // Corrected variable name
    if (typeof ninos !== 'undefined') mostrarProductos("listaninos", ninos, mostradosninos, "listaninos");
    if (typeof mochilas !== 'undefined') mostrarProductos("listamochilas", mochilas, mostradosmochilas, "listamochilas");
    if (typeof mochilacruz !== 'undefined') mostrarProductos("listamochilacruz", mochilacruz, mostradosmochilacruz, "listamochilacruz");
    if (typeof tazas !== 'undefined') mostrarProductos("listatazas", tazas, mostradostazas, "listatazas");
    if (typeof termos !== 'undefined') mostrarProductos("listatermos", termos, mostradostermos, "listatermos");

    // Initialize "Ver más" / "Ver menos" buttons
    const buttonConfigs = [
        { listId: "listaGorras", products: typeof gorras !== 'undefined' ? gorras : [], countVar: 'mostradosGorras', initialCount: 4 },
        { listId: "listaHoodies", products: typeof hoodies !== 'undefined' ? hoodies : [], countVar: 'mostradosHoodies', initialCount: 4 },
        { listId: "listaPlayeras", products: typeof playeras !== 'undefined' ? playeras : [], countVar: 'mostradosPlayeras', initialCount: 4 },
        { listId: "listahoodiesZ", products: typeof hoodiesz !== 'undefined' ? hoodiesz : [], countVar: 'mostradoshoodiesZ', initialCount: 4 },
        { listId: "listasportshirt", products: typeof sportshirt !== 'undefined' ? sportshirt : [], countVar: 'mostradossportshirt', initialCount: 4 },
        { listId: "listacompress", products: typeof compress !== 'undefined' ? compress : [], countVar: 'mostradoscompress', initialCount: 4 },
        { listId: "listahoodiebrazo", products: typeof hoodiebrazo !== 'undefined' ? hoodiebrazo : [], countVar: 'mostradoshoodiebrazo', initialCount: 4 },
        { listId: "listarezaque", products: typeof rezaque !== 'undefined' ? rezaque : [], countVar: 'mostradosrezaque', initialCount: 4 },
        { listId: "listapolos", products: typeof polos !== 'undefined' ? polos : [], countVar: 'mostradospolos', initialCount: 4 },
        { listId: "listamangass", products: typeof mangass !== 'undefined' ? mangass : [], countVar: 'mostradosmangass', initialCount: 4 },
        { listId: "listaninos", products: typeof ninos !== 'undefined' ? ninos : [], countVar: 'mostradosninos', initialCount: 4 },
        { listId: "listamochilas", products: typeof mochilas !== 'undefined' ? mochilas : [], countVar: 'mostradosmochilas', initialCount: 4 },
        { listId: "listamochilacruz", products: typeof mochilacruz !== 'undefined' ? mochilacruz : [], countVar: 'mostradosmochilacruz', initialCount: 4 },
        { listId: "listatazas", products: typeof tazas !== 'undefined' ? tazas : [], countVar: 'mostradostazas', initialCount: 4 },
        { listId: "listatermos", products: typeof termos !== 'undefined' ? termos : [], countVar: 'mostradostermos', initialCount: 4 },
    ];

    buttonConfigs.forEach(config => {
        const verMasBtn = document.getElementById(`verMas${config.listId.substring(5)}`); // e.g., verMasGorras
        const verMenosBtn = document.getElementById(`verMenos${config.listId.substring(5)}`); // e.g., verMenosGorras

        if (verMasBtn) {
            verMasBtn.addEventListener("click", function() {
                window[config.countVar] = config.products.length; // Use window scope to access global 'mostradosGorras' etc.
                mostrarProductos(config.listId, config.products, window[config.countVar], config.listId);
                this.style.display = "none";
                if (verMenosBtn) verMenosBtn.style.display = "inline-block";
            });
        }

        if (verMenosBtn) {
            verMenosBtn.addEventListener("click", function() {
                window[config.countVar] = config.initialCount;
                mostrarProductos(config.listId, config.products, window[config.countVar], config.listId);
                this.style.display = "none";
                if (verMasBtn) verMasBtn.style.display = "inline-block";
            });
        }
    });
});
    

    let mostradosGorras = 4;
    let mostradosHoodies = 4;
    let mostradosplayeras = 4;
    let mostradoshoodiesZ = 4;
    let mostradossportshirt = 4;
    let mostradoscompress = 4;
    let mostradoshoodiebrazo = 4;
    let mostradosrezaque = 4;
    let mostradospolos = 4;
    let mostradosmangass = 4;
    let mostradosninos = 4;
    let mostradosmochilas = 4;
    let mostradosmochilacruz = 4;
    let mostradostazas = 4;
    let mostradostermos = 4;
    

    //Gorras
    document.getElementById("verMasGorras").addEventListener("click", function() {
        mostradosGorras = gorras.length;
        mostrarProductos("listaGorras", gorras, mostradosGorras, "listaGorras");
        this.style.display = "none";
        document.getElementById("verMenosGorras").style.display = "inline-block";
    });

    document.getElementById("verMenosGorras").addEventListener("click", function() {
        mostradosGorras = 4;
        mostrarProductos("listaGorras", gorras, mostradosGorras, "listaGorras");
        this.style.display = "none";
        document.getElementById("verMasGorras").style.display = "inline-block";
    });

    //Hoddies
    document.getElementById("verMasHoodies").addEventListener("click", function() {
        mostradosHoodies = hoodies.length;
        mostrarProductos("listaHoodies", hoodies, mostradosHoodies, "listaHoodies");
        this.style.display = "none";
        document.getElementById("verMenosHoodies").style.display = "inline-block";
    });

    document.getElementById("verMenosHoodies").addEventListener("click", function() {
        mostradosHoodies = 4;
        mostrarProductos("listaHoodies", hoodies, mostradosHoodies, "listaHoodies");
        this.style.display = "none";
        document.getElementById("verMasHoodies").style.display = "inline-block";
    });

    //Playeras
    document.getElementById("verMasPlayeras").addEventListener("click", function() {
        mostradosPlayeras = playeras.length;
        mostrarProductos("listaPlayeras", playeras, mostradosPlayeras, "listaPlayeras");
        this.style.display = "none";
        document.getElementById("verMenosPlayeras").style.display = "inline-block";
    });

    document.getElementById("verMenosPlayeras").addEventListener("click", function() {
        mostradosPlayeras = 4;
        mostrarProductos("listaPlayeras", playeras, mostradosPlayeras, "listaPlayeras");
        this.style.display = "none";
        document.getElementById("verMasPlayeras").style.display = "inline-block";
    });

    //hoodiesZ
    document.getElementById("verMashoodiesZ").addEventListener("click", function() {
        mostradoshoodiesZ = hoodiesz.length;
        mostrarProductos("listahoodiesZ", hoodiesz, mostradoshoodiesZ, "listahoodiesZ");
        this.style.display = "none";
        document.getElementById("verMenoshoodiesZ").style.display = "inline-block";
    });

    document.getElementById("verMenoshoodiesZ").addEventListener("click", function() {
        mostradoshoodiesZ = 4;
        mostrarProductos("listahoodiesZ", hoodiesz, mostradoshoodiesZ, "listahoodiesZ");
        this.style.display = "none";
        document.getElementById("verMashoodiesZ").style.display = "inline-block";
    });

    //sportshirt
document.getElementById("verMassportshirt").addEventListener("click", function() {
    mostradossportshirt = sportshirt.length;
    mostrarProductos("listasportshirt", sportshirt, mostradossportshirt, "listasportshirt");
    this.style.display = "none";
    document.getElementById("verMenossportshirt").style.display = "inline-block";
});

document.getElementById("verMenossportshirt").addEventListener("click", function() {
    mostradossportshirt = 4;
    mostrarProductos("listasportshirt", sportshirt, mostradossportshirt, "listasportshirt");
    this.style.display = "none";
    document.getElementById("verMassportshirt").style.display = "inline-block";
});
    
    //compress
document.getElementById("verMascompress").addEventListener("click", function() {
    mostradoscompress = compress.length;
    mostrarProductos("listacompress", compress, mostradoscompress, "listacompress");
    this.style.display = "none";
    document.getElementById("verMenoscompress").style.display = "inline-block";
});

document.getElementById("verMenoscompress").addEventListener("click", function() {
    mostradoscompress = 4;
    mostrarProductos("listacompress", compress, mostradoscompress, "listacompress");
    this.style.display = "none";
    document.getElementById("verMascompress").style.display = "inline-block";
});

//hoodiebrazo
document.getElementById("verMashoodiebrazo").addEventListener("click", function() {
    mostradoshoodiebrazo = hoodiebrazo.length;
    mostrarProductos("listahoodiebrazo", hoodiebrazo, mostradoshoodiebrazo, "listahoodiebrazo");
    this.style.display = "none";
    document.getElementById("verMenoshoodiebrazo").style.display = "inline-block";
});

document.getElementById("verMenoshoodiebrazo").addEventListener("click", function() {
    mostradoshoodiebrazo = 4;
    mostrarProductos("listahoodiebrazo", hoodiebrazo, mostradoshoodiebrazo, "listahoodiebrazo");
    this.style.display = "none";
    document.getElementById("verMashoodiebrazo").style.display = "inline-block";
});

//rezaque
document.getElementById("verMasrezaque").addEventListener("click", function() {
    mostradosrezaque = rezaque.length;
    mostrarProductos("listarezaque", rezaque, mostradosrezaque, "listarezaque");
    this.style.display = "none";
    document.getElementById("verMenosrezaque").style.display = "inline-block";
});

document.getElementById("verMenosrezaque").addEventListener("click", function() {
    mostradosrezaque = 4;
    mostrarProductos("listarezaque", rezaque, mostradosrezaque, "listarezaque");
    this.style.display = "none";
    document.getElementById("verMasrezaque").style.display = "inline-block";
});

//polos
document.getElementById("verMaspolos").addEventListener("click", function() {
    mostradospolos = polos.length;
    mostrarProductos("listapolos", polos, mostradospolos, "listapolos");
    this.style.display = "none";
    document.getElementById("verMenospolos").style.display = "inline-block";
});

document.getElementById("verMenospolos").addEventListener("click", function() {
    mostradospolos = 4;
    mostrarProductos("listapolos", polos, mostradospolos, "listapolos");
    this.style.display = "none";
    document.getElementById("verMaspolos").style.display = "inline-block";
});

//mangass
document.getElementById("verMasmangass").addEventListener("click", function() {
    mostradosmangass = mangass.length; 
    mostrarProductos("listamangass", mangass, mostradosmangass, "listamangass"); 
    this.style.display = "none";
    document.getElementById("verMenosmangass").style.display = "inline-block";
});

document.getElementById("verMenosmangass").addEventListener("click", function() {
    mostradosmangass = 4; 
    mostrarProductos("listamangass", mangass, mostradosmangass, "listamangass"); 
    this.style.display = "none";
    document.getElementById("verMasmangass").style.display = "inline-block";
});

//ninos
document.getElementById("verMasninos").addEventListener("click", function() {
    mostradosninos = ninos.length;
    mostrarProductos("listaninos", ninos, mostradosninos, "listaninos");
    this.style.display = "none";
    document.getElementById("verMenosninos").style.display = "inline-block";
});

document.getElementById("verMenosninos").addEventListener("click", function() {
    mostradosninos = 4;
    mostrarProductos("listaninos", ninos, mostradosninos, "listaninos");
    this.style.display = "none";
    document.getElementById("verMasninos").style.display = "inline-block";
});

//mochilas
document.getElementById("verMasmochilas").addEventListener("click", function() {
    mostradosmochilas = mochilas.length;
    mostrarProductos("listamochilas", mochilas, mostradosmochilas, "listamochilas");
    this.style.display = "none";
    document.getElementById("verMenosmochilas").style.display = "inline-block";
});

document.getElementById("verMenosmochilas").addEventListener("click", function() {
    mostradosmochilas = 4;
    mostrarProductos("listamochilas", mochilas, mostradosmochilas, "listamochilas");
    this.style.display = "none";
    document.getElementById("verMasmochilas").style.display = "inline-block";
});

//mochilacruz
document.getElementById("verMasmochilacruz").addEventListener("click", function() {
    mostradosmochilacruz = mochilacruz.length;
    mostrarProductos("listamochilacruz", mochilacruz, mostradosmochilacruz, "listamochilacruz");
    this.style.display = "none";
    document.getElementById("verMenosmochilacruz").style.display = "inline-block";
});

document.getElementById("verMenosmochilacruz").addEventListener("click", function() {
    mostradosmochilacruz = 4;
    mostrarProductos("listamochilacruz", mochilacruz, mostradosmochilacruz, "listamochilacruz");
    this.style.display = "none";
    document.getElementById("verMasmochilacruz").style.display = "inline-block";
});

//tazas
document.getElementById("verMastazas").addEventListener("click", function() {
    mostradostazas = tazas.length;
    mostrarProductos("listatazas", tazas, mostradostazas, "listatazas");
    this.style.display = "none";
    document.getElementById("verMenostazas").style.display = "inline-block";
});

document.getElementById("verMenostazas").addEventListener("click", function() {
    mostradostazas = 4;
    mostrarProductos("listatazas", tazas, mostradostazas, "listatazas");
    this.style.display = "none";
    document.getElementById("verMastazas").style.display = "inline-block";
});

//termos
document.getElementById("verMastermos").addEventListener("click", function() {
    mostradostermos = termos.length;
    mostrarProductos("listatermos", termos, mostradostermos, "listatermos");
    this.style.display = "none";
    document.getElementById("verMenostermos").style.display = "inline-block";
});

document.getElementById("verMenostermos").addEventListener("click", function() {
    mostradostermos = 4;
    mostrarProductos("listatermos", termos, mostradostermos, "listatermos");
    this.style.display = "none";
    document.getElementById("verMastermos").style.display = "inline-block";
});

    mostrarProductos("listaGorras", gorras, mostradosGorras, "listaGorras");
    mostrarProductos("listaHoodies", hoodies, mostradosHoodies, "listaHoodies");
    mostrarProductos("listaPlayeras", playeras, mostradosplayeras, "listaPlayeras");
    mostrarProductos("listahoodiesZ", hoodiesz, mostradoshoodiesZ, "listahoodiesZ");
    mostrarProductos("listasportshirt", sportshirt, mostradossportshirt, "listasportshirt");
    mostrarProductos("listacompress", compress, mostradoscompress, "listacompress");
    mostrarProductos("listahoodiebrazo", hoodiebrazo, mostradoshoodiebrazo, "listahoodiebrazo");
    mostrarProductos("listarezaque", rezaque, mostradosrezaque, "listarezaque");
    mostrarProductos("listapolos", polos, mostradospolos, "listapolos");
    mostrarProductos("listamangass", mangass, mostradosmangass, "listamangass");
    mostrarProductos("listaninos", ninos, mostradosninos, "listaninos");
    mostrarProductos("listamochilas", mochilas, mostradosmochilas, "listamochilas");
    mostrarProductos("listamochilacruz", mochilacruz, mostradosmochilacruz, "listamochilacruz");
    mostrarProductos("listatazas", tazas, mostradostazas, "listatazas");
    mostrarProductos("listatermos", termos, mostradostermos, "listatermos");


