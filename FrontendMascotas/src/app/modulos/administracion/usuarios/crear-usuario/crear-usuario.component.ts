import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Router } from "@angular/router";
import { ModeloUsuario } from "src/app/modelo/usuario.modelo";
import Swal from "sweetalert2";

@Component({
  selector: "app-crear-usuario",
  templateUrl: "./crear-usuario.component.html",
  styleUrls: ["./crear-usuario.component.css"],
})
export class CrearUsuarioComponent implements OnInit {
  focus;
  focus1;
  focus2;

  formularioUsuario = new FormGroup({
    cedula: new FormControl(""),
    nombres: new FormControl(""),
    apellidos: new FormControl(""),
    telefono: new FormControl(""),
    correo: new FormControl(""),
    rol: new FormControl(""),
  });
  constructor(
    private usuarioServicio: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  crearUsuario() {
    let cedula = this.formularioUsuario.value.cedula;
    let nombres = this.formularioUsuario.value.nombres;
    let apellidos = this.formularioUsuario.value.apellidos;
    let telefono = this.formularioUsuario.value.telefono;
    let correo = this.formularioUsuario.value.correo;
    let rol = this.formularioUsuario.value.rol;
    let usuario = new ModeloUsuario();
    if (
      cedula != "" &&
      nombres != "" &&
      apellidos != "" &&
      telefono != "" &&
      correo != "" &&
      rol != ""
    ) {
      usuario.cedula = cedula;
      usuario.nombres = nombres;
      usuario.apellidos = apellidos;
      usuario.telefono = telefono;
      usuario.correo = correo;
      usuario.rol = rol;

      this.usuarioServicio.crearUsuario(usuario).subscribe(
        (datos: ModeloUsuario) => {
          this.okCrearUsuario();
        },
        (error: any) => {
          this.errorCrearUsuario();
        }
      );
    } else {
      this.camposVacios();
    }
  }

  errorCrearUsuario() {
    Swal.fire({
      title: "",
      text: "Se ha producido un error al registrar el usuario.",
      icon: "error",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
  }
  okCrearUsuario() {
    Swal.fire({
      title: "",
      text: "El usuario se ha registrado con éxito.",
      icon: "success",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
    this.router.navigate(["/usuarios"]);
  }

  camposVacios() {
    Swal.fire({
      title: "",
      text: "Por favor, complete todos los campos.",
      icon: "warning",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
  }
}
