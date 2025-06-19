const cartBtn = document.getElementById('cart-btn')
const cartPanel = document.getElementById('cart-panel')
const contenedorProducto = document.getElementById("contenedor-productos")
let dejoAbiertoElCarrito =
    JSON.parse(localStorage.getItem("carrito_open")) || false


if (dejoAbiertoElCarrito) {
    cartPanel.classList.add('active')
} else {
    cartPanel.classList.remove('active')
}



cartBtn.addEventListener('click', (PerritoConChaucha) => {
    localStorage.setItem('carrito_open', JSON.stringify(dejoAbiertoElCarrito))
})
if (dejoAbiertoElCarrito) {
    cartPanel.classList.add('active')
} else {
    cartPanel.classList.remove('active')
}


function renderizarCards() {
    products.forEach(el => {
        console.log(el);
        
        let producto = `
            <div class="product-card">
                <img 
                    src="img/2-2.jpg" 
                    alt="reme marron oscura"
                />
                <h3>Day After Day</h3>
                <p>Remera Oversize - Algodon</p>
                <span class="price">$23.000</span>
                <button id="add-to-cart-btn" class="add-to-cart">
                    Agregar al Carrito
                </button>
            </div>`

        contenedorProducto.innerHTML += producto
    })
}

renderizarCards()