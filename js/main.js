// Productos disponibles en la tienda (normalmente vendrían de una base de datos)
const productos = [
    { id: 1, nombre: 'Producto 1', precio: 227.00 },
    { id: 2, nombre: 'Producto 2', precio: 175.00 },
    { id: 3, nombre: 'Producto 3', precio: 188.00 }
];

// Array para almacenar los productos añadidos al carrito
let carrito = [];

// Seleccionar todos los botones de "Añadir al carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Seleccionar el elemento que muestra la cantidad de productos en el carrito y el total
const cartCount = document.getElementById('cart-count');
const cartTotal = document.createElement('p');
cartTotal.id = 'cart-total';
document.querySelector('.cart').appendChild(cartTotal);

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    // Mostrar la cantidad de productos en el carrito
    cartCount.textContent = carrito.length;

    // Calcular el total del carrito
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);

    // Mostrar el total del carrito
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Función para añadir productos al carrito
function addToCart(event) {
    const button = event.target;
    
    // Determinar el producto según el índice del botón clicado
    const productIndex = Array.from(addToCartButtons).indexOf(button);
    const productoSeleccionado = productos[productIndex];
    
    // Añadir el producto al array de carrito
    carrito.push(productoSeleccionado);
    
    // Actualizar la visualización del carrito
    actualizarCarrito();
}

// Función para eliminar el último producto añadido (opcional)
function eliminarUltimoProducto() {
    carrito.pop();
    actualizarCarrito();
}

// Asignar el evento de clic a cada botón de "Añadir al carrito"
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Crear un botón para eliminar el último producto añadido (opcional)
const removeButton = document.createElement('button');
removeButton.textContent = 'Eliminar último producto';
removeButton.style.backgroundColor = '#000000';
removeButton.style.color = 'white';
removeButton.style.border = 'none';
removeButton.style.padding = '0.75rem';
removeButton.style.borderRadius = '5px';
removeButton.style.cursor = 'pointer';
removeButton.style.marginTop = '1rem';

// Asignar el evento de clic para eliminar el último producto añadido
removeButton.addEventListener('click', eliminarUltimoProducto);

// Añadir el botón de eliminar al DOM
document.querySelector('.cart').appendChild(removeButton);

// Inicializar la visualización del carrito
actualizarCarrito();

// Función para añadir productos al carrito
function addToCart(event) {
    const button = event.target;
    
    // Determinar el producto según el índice del botón clicado
    const productIndex = Array.from(addToCartButtons).indexOf(button);
    const productoSeleccionado = productos[productIndex];
    
    // Añadir el producto al array de carrito
    carrito.push(productoSeleccionado);
    
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la visualización del carrito
    actualizarCarrito();
}
