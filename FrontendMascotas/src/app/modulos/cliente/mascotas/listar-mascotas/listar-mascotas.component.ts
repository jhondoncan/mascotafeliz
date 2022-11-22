import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-listar-mascotas",
  templateUrl: "./listar-mascotas.component.html",
  styleUrls: ["./listar-mascotas.component.css"],
})
export class ListarMascotasComponent implements OnInit {
  /* MENSAJES DE ALERTAS SWEETALERT2 */
  eliminarMascota() {
    Swal.fire({
      title: "",
      text: "¿Deseas eliminar esta mascota?",
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
          text: "La mascota ha sido eliminada.",
          icon: "success",
          confirmButtonColor: "#5E72E4",
        });
      }
    });
  }

  constructor() {}

  ngOnInit(): void {}
}