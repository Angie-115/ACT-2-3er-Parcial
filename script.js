

// Evento 4: Agregar un producto a "Favoritos" con doble clic 
document.querySelectorAll('.product-card').forEach(card => { 
    card.addEventListener('dblclick', function() { 
        const favoriteList = document.getElementById('favorites'); 
        const productName = this.querySelector('.product-name').textContent; 
        const newFavorite = document.createElement('li'); 
        newFavorite.textContent = productName; 
        favoriteList.appendChild(newFavorite); // Agregar a la lista de favoritos 
        alert(productName + ' ha sido agregado a tus favoritos.'); 
    }); 
});


// Evento 5: Actualizar el contador de productos en el carrito 
let cartItemCount = 0; 
document.querySelectorAll('.add-to-cart').forEach(button => { 
    button.addEventListener('click', function() { 
        cartItemCount++; // Incrementar el contador cuando se agrega un producto 
        document.getElementById('cart-item-count').textContent = cartItemCount; 
    }); 
});




// Evento 6: Notificación de producto agregado al carrito 
document.querySelectorAll('.add-to-cart').forEach(button => { 
    button.addEventListener('click', function() { 
        const notification = document.createElement('div'); 
        notification.className = 'cart-notification'; 
        notification.textContent = 'Producto agregado al carrito con éxito'; 
        
        document.body.appendChild(notification); // Mostrar notificación 
        setTimeout(() => { 
            notification.remove(); // Eliminar notificación después de 5 segundos 
        }, 5000); 
    }); 
});




// PRIMERA ACTIVIDADNuevo código para Evento 1
// Evento 1: Mostrar mensaje al hacer clic en el título del carrito
document.querySelector('#cart h2').addEventListener('click', function() {
    alert('El carrito está listo para pagar.');
});

// Nuevo código para Evento 2
// Evento 2: Cambiar el color del producto cuando se agregue al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.parentElement;
        productCard.style.backgroundColor = '#FFC0CB'; // Cambiar a rosa 
        setTimeout(() => {
            productCard.style.backgroundColor = ''; // Restaurar color original después de 10 segundo
        }, 10000);
    });
});

// Nuevo código para Evento 3
// Evento 3: Cambiar el total automáticamente cuando se ingresen puntos de lealtad
document.getElementById('loyalty-points').addEventListener('input', function() {
    const loyaltyPoints = parseInt(this.value);
    const discountCode = document.getElementById('discount-code').value;

    // Aplicar puntos de lealtad y código de descuento
    let newTotal = total - loyaltyPoints;
    if (discountCode === 'DESC10') {
        newTotal *= 0.9;
    }

    if (newTotal < 0) newTotal = 0;

    document.getElementById('cart-total').textContent = newTotal.toFixed(2);
});

// Evento extra
// Agregar evento de 'mouseenter' a cada producto
document.querySelectorAll('.product-card').forEach(product => {
    product.addEventListener('mouseenter', function() {
        // Cambiar el fondo del producto cuando el mouse se pasa sobre él
        this.style.backgroundColor = '#ff3371';

        // Mostrar un mensaje en el producto
        const hoverMessage = document.createElement('span');
        hoverMessage.textContent = '¡Explora este producto!';
        hoverMessage.className = 'hover-message';
        hoverMessage.style.fontSize = '12px';
        hoverMessage.style.color = '#333';
        hoverMessage.style.position = 'absolute';
        hoverMessage.style.bottom = '5px';
        hoverMessage.style.left = '5px';
        
        this.appendChild(hoverMessage);
    });

    product.addEventListener('mouseleave', function() {
        // Restaurar el fondo del producto y remover el mensaje cuando el mouse salga
        this.style.backgroundColor = '';

        const hoverMessage = this.querySelector('.hover-message');
        if (hoverMessage) {
            this.removeChild(hoverMessage);
        }
    });
});




// Inicializar total del carrito
let total = 0;

// Función para agregar producto al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const price = parseInt(this.getAttribute('data-price'));
        const productName = this.parentElement.querySelector('h2').textContent;

        // Actualizar total del carrito
        total += price;
        document.getElementById('cart-total').textContent = total;

        // Agregar el producto a la lista del carrito en el DOM
        const cartItems = document.getElementById('cart-items');
        const productItem = document.createElement('p');
        productItem.textContent = `${productName} - $${price}`;
        cartItems.appendChild(productItem);
    });
});

// Aplicar descuento usando el valor del input
document.getElementById('apply-discount').addEventListener('click', function() {
    const discountCode = document.getElementById('discount-code').value;
    const loyaltyPoints = parseInt(document.getElementById('loyalty-points').value);

    // Validar si el código de descuento es correcto (ejemplo: "DESC10" = 10% de descuento)
    if (discountCode === 'DESC10') {
        total = total * 0.9;  // Aplica 10% de descuento
    }

    // Aplicar puntos de lealtad (ejemplo: cada punto resta $1 del total)
    total = total - loyaltyPoints;

    // Asegurarse de que el total no sea negativo
    if (total < 0) total = 0;

    // Actualizar el total en el DOM
    document.getElementById('cart-total').textContent = total.toFixed(2);
});
