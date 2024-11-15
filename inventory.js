
// Cargar productos desde el almacenamiento local al iniciar la página
document.addEventListener('DOMContentLoaded', loadInventory);

// Función para cargar el inventario y mostrarlo en la tabla
function loadInventory() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const tableBody = document.querySelector('#inventoryTable tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de cargar

    inventory.forEach((product, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Función para agregar un nuevo producto
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    
    if (name && price) {
        const newProduct = { name, price: parseFloat(price) };
        
        // Obtener el inventario actual, agregar el nuevo producto y guardar en localStorage
        const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        inventory.push(newProduct);
        localStorage.setItem('inventory', JSON.stringify(inventory));

        // Limpiar los campos del formulario y recargar el inventario
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        loadInventory();
    } else {
        alert('Por favor, complete todos los campos');
    }
}

// Función para eliminar un producto
function deleteProduct(index) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    inventory.splice(index, 1); // Eliminar el producto por índice
    localStorage.setItem('inventory', JSON.stringify(inventory));
    loadInventory();
}

// Función para editar un producto
function editProduct(index) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const product = inventory[index];

    // Pedir al usuario nuevos valores para el producto
    const newName = prompt("Nuevo nombre del producto:", product.name);
    const newPrice = prompt("Nuevo precio del producto:", product.price);

    if (newName !== null && newPrice !== null) {
        // Actualizar el producto y guardar en localStorage
        inventory[index] = { name: newName, price: parseFloat(newPrice) };
        localStorage.setItem('inventory', JSON.stringify(inventory));
        loadInventory();
    }
}
