// URL de la API
const URL_API = "http://localhost:3000";


// Funcion para crear un usuario
function crearUsuario() {

    let cedula = document.getElementById("txtCedula").value;
    let nombres = document.getElementById("txtNombres").value;
    let apellidos = document.getElementById("txtApellidos").value;
    let correo = document.getElementById("txtCorreo").value;
    let celuar = document.getElementById("txtCelular").value;
    let rol = document.getElementById("selectRol").value;

    let usuario = {
        cedula: cedula,
        nombres: nombres,
        apellidos: apellidos,
        correo: correo,
        telefono: celuar,
        rol: rol
    };


    fetch(URL_API + "/usuarios", {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((res) => res.json())
        .then((mensaje) => {
            console.log(mensaje);
            if (!mensaje.id) {
                alertaUsuarioError();
            }
            alertaUsuarioCreado();
        });
}

// Función para iniciar sesión
function iniciarSesion() {
    let correo = document.getElementById("txtLoginCorreo").value;
    let password = document.getElementById("txtLoginPassword").value;

    let credenciales = {
        correo: correo,
        password: password
    }

    fetch(URL_API + "/login", {

        method: "POST",
        body: JSON.stringify(credenciales),
        headers: {
            "Content-Type": "application/json",
        }

    }).then((res) => res.json())
        .then((mensaje) => {
            console.log(mensaje);
            if (mensaje.error) {
                alertaErrorLogin();
            } else {
                alertaLoginSucces(mensaje.token);
            }

        });
}

// Función para mostrar alerta de usuario creado
function alertaUsuarioCreado() {
    Swal.fire(
        {
            title: "",
            text: "El usuario se ha registrado con éxito.",
            icon: 'success',
            confirmButtonColor: "#2a82eb",
            confirmButtonText: "Aceptar",
        }
    )
    document.getElementById("txtCedula").value = "";
    document.getElementById("txtNombres").value = "";
    document.getElementById("txtApellidos").value = "";
    document.getElementById("txtCorreo").value = "";
    document.getElementById("txtCelular").value = "";
    document.getElementById("selectRol").value = "";

}

// Función para mostrar alerta de error al crear el usuario
function alertaUsuarioError() {
    Swal.fire(
        {
            title: "",
            text: "Se ha producido un error al registrar el usuario.",
            icon: 'error',
            confirmButtonColor: "#2a82eb",
            confirmButtonText: "Aceptar",
        }
    )
}

// Funcion para mostrar alertar de error al iniciar sesión
function alertaErrorLogin() {
    Swal.fire(
        {
            title: "",
            text: "Correo o contraseña incorrectos.",
            icon: 'error',
            confirmButtonColor: "#2a82eb",
            confirmButtonText: "Aceptar",
        }
    )
}


// Función para mostrar alerta de inicio de sesión exitoso
function alertaLoginSucces(token) {
    Swal.fire(
        {
            title: "Token de acceso",
            text: token,
            icon: 'success',
            confirmButtonColor: "#2a82eb",
            confirmButtonText: "Aceptar",
        }
    )
    document.getElementById("txtLoginCorreo").value = "";
    document.getElementById("txtLoginPassword").value = "";
}




