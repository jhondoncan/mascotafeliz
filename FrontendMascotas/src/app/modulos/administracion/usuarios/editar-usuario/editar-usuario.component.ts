import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ModeloUsuario } from "src/app/modelo/usuario.modelo";
import { UsuarioService } from "src/app/servicios/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-editar-usuario",
  templateUrl: "./editar-usuario.component.html",
  styleUrls: ["./editar-usuario.component.css"],
})
export class EditarUsuarioComponent implements OnInit {
  focus;
  focus1;
  focus2;
  id: String = "";

  formularioUsuarioEditar = new FormGroup({
    id: new FormControl(""),
    cedula: new FormControl(""),
    nombres: new FormControl(""),
    apellidos: new FormControl(""),
    telefono: new FormControl(""),
    correo: new FormControl(""),
    rol: new FormControl(""),
  });

  constructor(
    private usuarioServicio: UsuarioService,
    private router: Router,
    private routerActivo: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.routerActivo.snapshot.params["id"];
    this.buscarUsuario();
  }

  editarUsuario() {
    let id = this.formularioUsuarioEditar.value.id;
    let cedula = this.formularioUsuarioEditar.value.cedula;
    let nombres = this.formularioUsuarioEditar.value.nombres;
    let apellidos = this.formularioUsuarioEditar.value.apellidos;
    let telefono = this.formularioUsuarioEditar.value.telefono;
    let correo = this.formularioUsuarioEditar.value.correo;
    let rol = this.formularioUsuarioEditar.value.rol;
    let usuario = new ModeloUsuario();
    if (
      cedula != "" &&
      nombres != "" &&
      apellidos != "" &&
      telefono != "" &&
      correo != "" &&
      rol != ""
    ) {
      usuario.id = id;
      usuario.cedula = cedula;
      usuario.nombres = nombres;
      usuario.apellidos = apellidos;
      usuario.telefono = telefono;
      usuario.correo = correo;
      usuario.rol = rol;

      this.usuarioServicio.actualizarUsuario(usuario).subscribe(
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

  buscarUsuario() {
    this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(
      (datos: ModeloUsuario) => {
        this.formularioUsuarioEditar.controls["id"].setValue(datos.id);
        this.formularioUsuarioEditar.controls["cedula"].setValue(datos.cedula);
        this.formularioUsuarioEditar.controls["nombres"].setValue(
          datos.nombres
        );
        this.formularioUsuarioEditar.controls["apellidos"].setValue(
          datos.apellidos
        );
        this.formularioUsuarioEditar.controls["telefono"].setValue(
          datos.telefono
        );
        this.formularioUsuarioEditar.controls["correo"].setValue(datos.correo);
        this.formularioUsuarioEditar.controls["rol"].setValue(datos.rol);
      },
      (error: any) => {
        this.errorCargarUsuario();
      }
    );
  }

  errorCrearUsuario() {
    Swal.fire({
      title: "",
      text: "Se ha producido un error al actualizar el usuario.",
      icon: "error",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
  }
  okCrearUsuario() {
    Swal.fire({
      title: "",
      text: "El usuario se ha actualizado con éxito.",
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

  errorCargarUsuario() {
    Swal.fire({
      title: "",
      text: "Se ha producido un error al obtener el usuario.",
      icon: "error",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
  }
}
