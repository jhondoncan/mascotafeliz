import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-listar-prospectos",
  templateUrl: "./listar-prospectos.component.html",
  styleUrls: ["./listar-prospectos.component.css"],
})
export class ListarProspectosComponent implements OnInit {
  eliminarProspecto() {
    Swal.fire({
      title: "",
      text: "¿Deseas eliminar este prospecto?",
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
          text: "El prospecto ha sido eliminado.",
          icon: "success",
          confirmButtonColor: "#5E72E4",
        });
      }
    });
  }
  constructor() {}

  ngOnInit(): void {}
}
