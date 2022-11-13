const URL_API = "http://localhost:3000/usuarios";


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


    fetch(URL_API, {
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

function alertaUsuarioCreado() {
    Swal.fire(
        {
            title: "",
            text: "Se ha registrado el usuario",
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

function alertaUsuarioError() {
    Swal.fire(
        {
            title: "",
            text: "Error al registrar el usuario",
            icon: 'error',
            confirmButtonColor: "#2a82eb",
            confirmButtonText: "Aceptar",
        }
    )
}





