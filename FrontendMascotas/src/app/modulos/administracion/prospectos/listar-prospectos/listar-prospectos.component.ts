import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModeloProspecto } from "src/app/modelo/prospecto.modelo";
import { ProspectoService } from "src/app/servicios/prospecto.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-listar-prospectos",
  templateUrl: "./listar-prospectos.component.html",
  styleUrls: ["./listar-prospectos.component.css"],
})
export class ListarProspectosComponent implements OnInit {
  listadoProspectos: ModeloProspecto[] = [];

  constructor(
    private prospectoServicio: ProspectoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prospectoServicio.obtenerProspectos().subscribe((prospectos) => {
      this.listadoProspectos = prospectos;
    });
  }

  obtenerListadoProspectos() {
    this.prospectoServicio
      .obtenerProspectos()
      .subscribe((datos: ModeloProspecto[]) => {
        this.listadoProspectos = datos;
      });
  }

  /* MENSAJES DE ALERTAS SWEETALERT2 */
  eliminarProspecto(id: String) {
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
        this.router.navigate(["/eliminar-prospecto/", id]);
      }
    });
  }
}
