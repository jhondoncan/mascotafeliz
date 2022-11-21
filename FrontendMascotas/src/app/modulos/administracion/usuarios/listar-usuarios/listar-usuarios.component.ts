import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-listar-usuarios",
  templateUrl: "./listar-usuarios.component.html",
  styleUrls: ["./listar-usuarios.component.css"],
})
export class ListarUsuariosComponent implements OnInit {
  /* MENSAJES DE ALERTAS SWEETALERT2 */
  eliminarUsuario() {
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
        Swal.fire({
          title: "",
          text: "El usuario ha sido eliminado.",
          icon: "success",
          confirmButtonColor: "#5E72E4",
        });
      }
    });
  }
  focus;
  focus1;
  focus2;

  constructor() {}

  ngOnInit(): void {}
}
