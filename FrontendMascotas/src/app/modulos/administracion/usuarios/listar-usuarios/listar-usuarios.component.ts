import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModeloUsuario } from "src/app/modelo/usuario.modelo";
import { SeguridadService } from "src/app/servicios/seguridad.service";
import { UsuarioService } from "src/app/servicios/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-listar-usuarios",
  templateUrl: "./listar-usuarios.component.html",
  styleUrls: ["./listar-usuarios.component.css"],
})
export class ListarUsuariosComponent implements OnInit {
  focus;
  focus1;
  focus2;

  listadoUsuarios: ModeloUsuario[] = [];

  constructor(
    private usuarioServicio: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioServicio.obtenerUsuarios().subscribe((usuarios) => {
      this.listadoUsuarios = usuarios;
    });
  }
  obtenerListadoUsuarios() {
    this.usuarioServicio
      .obtenerUsuarios()
      .subscribe((datos: ModeloUsuario[]) => {
        this.listadoUsuarios = datos;
      });
  }

  /* MENSAJES DE ALERTAS SWEETALERT2 */
  eliminarUsuario(id: String) {
    Swal.fire({
      title: "",
      text: "¿Deseas eliminar este usuario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#5E72E4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["/eliminar-usuario/", id]);
      }
    });
  }
}
