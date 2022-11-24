import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-listar-planes",
  templateUrl: "./listar-planes.component.html",
  styleUrls: ["./listar-planes.component.css"],
})
export class ListarPlanesComponent implements OnInit {
  eliminarPlan() {
    Swal.fire({
      title: "",
      text: "¿Deseas eliminar este plan?",
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
          text: "El plan ha sido eliminado.",
          icon: "success",
          confirmButtonColor: "#5E72E4",
        });
      }
    });
  }

  constructor() {}

  ngOnInit(): void {}
}
