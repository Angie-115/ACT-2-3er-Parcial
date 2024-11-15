
// Definir usuarios simulados
const usuariosSimulados = [
    { email: "angelaramirez@gmail.com", nombre: "Angela", rol: "admin", password: "admin123" },
    { email: "virlettepesina@gmail.com", nombre: "Virlette", rol: "admin", password: "admin123" },
    { email: "user1@ejemplo.com", nombre: "Usuario1", rol: "user", password: "password1" },
    { email: "user2@ejemplo.com", nombre: "Usuario2", rol: "user", password: "password2" }
];

// Almacenar en localStorage si no están ya guardados
if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify(usuariosSimulados));
}

function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value; // Obtenemos el rol del usuario
    let errorMsg = '';

    if (email === '') {
        errorMsg += 'El campo de email es obligatorio.\n';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        errorMsg += 'Por favor, ingrese un email válido.\n';
    }
    
    if (password === '') {
        errorMsg += 'El campo de contraseña es obligatorio.\n';
    }
    
    if (errorMsg !== '') {
        document.getElementById('error-message').innerText = errorMsg;
        return false;
    }


    // Obtener la lista de usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar si el usuario existe
    const usuarioEncontrado = usuarios.find(user => user.email === email && user.password === password && user.rol === role);

    if (usuarioEncontrado) {
        // Si existe, redirigir según el rol
        if (usuarioEncontrado.rol === 'admin') {
            window.location.href = "admin.html";
        } else {
            window.location.href = "index.html";
        }
    } else {
        errorMsg.innerText = 'Email o contraseña incorrectos, o rol inválido.';
    }

    return false; // Evita el envío del formulario

}
