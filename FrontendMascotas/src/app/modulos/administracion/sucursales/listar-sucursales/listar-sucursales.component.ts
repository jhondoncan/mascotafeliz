import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SeguridadService } from "src/app/servicios/seguridad.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-listar-sucursales",
  templateUrl: "./listar-sucursales.component.html",
  styleUrls: ["./listar-sucursales.component.css"],
})
export class ListarSucursalesComponent implements OnInit {
  eliminarSucursal() {
    Swal.fire({
      title: "",
      text: "¿Deseas eliminar esta sucursal?",
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
          text: "La sucursal ha sido eliminada.",
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
