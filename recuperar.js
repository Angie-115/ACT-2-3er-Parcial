
// Definir usuarios simulados
const usuariosSimulados = [
    { email: "angelaramirez@gmail.com", nombre: "Angela", rol: "admin", password: "admin123" },
    { email: "virlettepesina@gmail.com", nombre: "Virlette", rol: "admin", password: "admin123" },
    { email: "user1@ejemplo.com", nombre: "Usuario1", rol: "user", password: "password1" },
    { email: "user2@ejemplo.com", nombre: "Usuario2", rol: "user", password: "password2" }
];

function recuperarPassword() {
    const email = document.getElementById('email').value;
    const errorMsg = document.getElementById('error-message');
    const successMsg = document.getElementById('success-message');
    errorMsg.innerText = '';
    successMsg.innerText = '';

    // Validar que el campo de email no esté vacío y sea válido
    if (email === '') {
        errorMsg.innerText = 'El campo de email es obligatorio.';
        return false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        errorMsg.innerText = 'Por favor, ingrese un email válido.';
        return false;
    }

    // Obtener la lista de usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(user => user.email === email);

    if (usuarioEncontrado) {
        // Pedir una nueva contraseña
        const newPassword = prompt("Por favor, ingresa la nueva contraseña (mínimo 6 caracteres):");

        if (newPassword && newPassword.length >= 6) {
            // Actualizar la contraseña en el objeto y guardarlo en localStorage
            usuarioEncontrado.password = newPassword;

            // Guardar la lista actualizada en localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            successMsg.innerText = 'Contraseña actualizada con éxito. Inicia sesión con tu nueva contraseña.';
        } else {
            errorMsg.innerText = 'La nueva contraseña debe tener al menos 6 caracteres.';
        }
    } else {
        errorMsg.innerText = 'El email no coincide con ninguna cuenta registrada.';
    }

    return false; // Evita el envío del formulario
}
