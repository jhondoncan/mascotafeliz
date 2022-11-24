import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ModeloUsuario } from "src/app/modelo/usuario.modelo";
import { SeguridadService } from "src/app/servicios/seguridad.service";
import { UsuarioService } from "src/app/servicios/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  test: Date = new Date();
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
    private servicioSeguridad: SeguridadService,
    private router: Router,
    private usuarioServicio: UsuarioService
  ) {}

  ngOnInit(): void {
    if (this.servicioSeguridad.obtenerSession()) {
      this.router.navigate(["/inicio"]);
    }
  }

  crearUsuario() {
    let cedula = this.formularioUsuario.value.cedula;
    let nombres = this.formularioUsuario.value.nombres;
    let apellidos = this.formularioUsuario.value.apellidos;
    let telefono = this.formularioUsuario.value.telefono;
    let correo = this.formularioUsuario.value.correo;
    let rol = "cliente";
    let usuario = new ModeloUsuario();
    if (
      cedula != "" &&
      nombres != "" &&
      apellidos != "" &&
      telefono != "" &&
      correo != ""
    ) {
      usuario.cedula = cedula;
      usuario.nombres = nombres;
      usuario.apellidos = apellidos;
      usuario.telefono = telefono;
      usuario.correo = correo;
      usuario.rol = rol;

      this.usuarioServicio.crearUsuario(usuario).subscribe(
        (datos: ModeloUsuario) => {
          this.okCrearUsuario(usuario.correo);
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
  okCrearUsuario(correo: String) {
    Swal.fire({
      title: "",
      text:
        "Te has registrado con éxito, tu contraseña fue enviada al correo: " +
        correo,
      icon: "success",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
    this.router.navigate(["/login"]);
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
