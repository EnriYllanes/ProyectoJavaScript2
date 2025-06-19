const cartBtn = document.getElementById('cart-btn');
const cartPanel = document.getElementById('cart-panel');
const contenedorProducto = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("cart-items");

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let dejoAbiertoElCarrito = JSON.parse(localStorage.getItem("carrito_open")) || false;

if (dejoAbiertoElCarrito) {
    cartPanel.classList.add('visible');
}

cartBtn.addEventListener('click', () => {
    cartPanel.classList.toggle('visible');
    dejoAbiertoElCarrito = cartPanel.classList.contains('visible');
    localStorage.setItem('carrito_open', JSON.stringify(dejoAbiertoElCarrito));
});

const products = [
    {
        id: 1,
        nombre: "Day After Day",
        descripcion: "Remera Oversize - Algodon",
        precio: 23000,
        imagen: "img/2-2.jpg"
    },
    {
        id: 2,
        nombre: "Cargo Oxided",
        descripcion: "Cargo de Jean Mom",
        precio: 50000,
        imagen: "img/cargo1.jpg"
    },
    {
        id: 3,
        nombre: "iets Frans",
        descripcion: "Remera Regular - Algodón",
        precio: 16000,
        imagen: "img/2-3.jpg"
    },
    {
        id: 4,
        nombre: "Cargo Baggy",
        descripcion: "Cargo de Jean Marrón",
        precio: 54000,
        imagen: "img/cargo2.jpg"
    },
    {
        id: 5,
        nombre: "Vans knu Skool",
        descripcion: "Zapas de Gamuza",
        precio: 130000,
        imagen: "img/zapatilla1.jpg"
    },
    {
        id: 6,
        nombre: "Visera Curva A.",
        descripcion: "Gorra importada A. | curva | Cerrada",
        precio: 28000,
        imagen: "img/gorra2.jpg"
    },
    {
        id: 7,
        nombre: "Zapas Vuitton",
        descripcion: "Zapatillas de Cuero",
        precio: 120000,
        imagen: "img/zapatilla3.png"
    },
    {
        id: 8,
        nombre: "Visera Curva",
        descripcion: "Gorra forrada en doble tela | Ajustable",
        precio: 16000,
        imagen: "img/gorra1.jpg"
    }
];

function renderizarCards() {
    contenedorProducto.innerHTML = "";
    products.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <span class="price">$${producto.precio.toLocaleString()}</span>
            <button class="add-to-cart" data-id="${producto.id}">Agregar al Carrito</button>
        `;
        contenedorProducto.appendChild(div);
    });

    activarBotones();
}

function activarBotones() {
    const botones = document.querySelectorAll(".add-to-cart");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const idProducto = parseInt(boton.getAttribute("data-id"));
            const producto = products.find(p => p.id === idProducto);

            // Opcional: si no quieres duplicados, checkea si ya está
            const existe = carrito.find(p => p.id === producto.id);
            if (!existe) {
                carrito.push(producto);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                renderizarCarrito();
            } else {
                alert("Producto ya agregado al carrito.");
            }
        });
    });
}

function renderizarCarrito() {
    contenedorCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, index) => {
        const item = document.createElement("div");
        item.classList.add("item-carrito");
        item.innerHTML = `
            <p>${producto.nombre} - $${producto.precio.toLocaleString()}</p>
            <button class="eliminar-item" data-index="${index}">❌</button>
        `;
        contenedorCarrito.appendChild(item);
        total += producto.precio;
    });

    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong>Total: $${total.toLocaleString()}</strong>`;
    contenedorCarrito.appendChild(totalDiv);

    activarEliminar();
}

function activarEliminar() {
    const botonesEliminar = document.querySelectorAll(".eliminar-item");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            const index = parseInt(boton.getAttribute("data-index"));
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        });
    });
}

renderizarCards();
renderizarCarrito();