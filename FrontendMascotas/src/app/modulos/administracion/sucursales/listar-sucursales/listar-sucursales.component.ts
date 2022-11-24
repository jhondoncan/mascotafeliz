import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModeloSucursal } from "src/app/modelo/sucursal.modelo";
import { SucursalService } from "src/app/servicios/sucursal.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-listar-sucursales",
  templateUrl: "./listar-sucursales.component.html",
  styleUrls: ["./listar-sucursales.component.css"],
})
export class ListarSucursalesComponent implements OnInit {
  listadoSucursales: ModeloSucursal[] = [];

  constructor(
    private sucrusalServicio: SucursalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sucrusalServicio.obtenerSucursales().subscribe((sucursales) => {
      this.listadoSucursales = sucursales;
    });
  }

  obtenerListadoSucursales() {
    this.sucrusalServicio
      .obtenerSucursales()
      .subscribe((datos: ModeloSucursal[]) => {
        this.listadoSucursales = datos;
      });
  }

  /* MENSAJES DE ALERTAS SWEETALERT2 */
  eliminarSucursal(id: String) {
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
        this.router.navigate(["/eliminar-sucursal/", id]);
      }
    });
  }
}
