import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SeguridadService } from "src/app/servicios/seguridad.service";
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

  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.servicioSeguridad.obtenerSession()) {
      this.router.navigate(["/error"]);
    }
  }
}
