// Simular un carrito almacenado en localStorage para esta demo
// Supongamos que tenemos el siguiente carrito en el localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Seleccionar el contenedor donde se mostrarán los productos del carrito
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    // Limpiar el contenedor
    cartItemsContainer.innerHTML = '';

    // Si el carrito está vacío
    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío</p>';
        totalPriceElement.textContent = 'Total: $0.00';
        return;
    }

    // Recorrer los productos en el carrito y mostrarlos
    carrito.forEach((producto, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${producto.nombre} - $${producto.precio.toFixed(2)}</p>
            <button class="remove-item" data-index="${index}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Calcular y mostrar el precio total
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function eliminarProducto(event) {
    const button = event.target;
    const productIndex = button.getAttribute('data-index');
    
    // Eliminar el producto del array carrito
    carrito.splice(productIndex, 1);

    // Actualizar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la visualización del carrito
    mostrarCarrito();
}

// Asignar eventos de eliminación a los botones
cartItemsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-item')) {
        eliminarProducto(event);
    }
});

// Mostrar el carrito cuando se carga la página
mostrarCarrito();
document.getElementById("checkout-button").addEventListener("click", function() {
    Swal.fire({
        title: '¿Estás seguro Genio/a?',
        text: "Sos un Capo",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#8d4817',
        cancelButtonColor: '#000000',
        confirmButtonText: 'Sí, finalizar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Compra finalizada!',
                'Tu pedido ha sido procesado con éxito.',
                'success'
            )
            
        }
    })
});
