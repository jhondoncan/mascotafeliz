import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModeloPlan } from "src/app/modelo/plan.modelo";
import { PlanService } from "src/app/servicios/plan.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-listar-planes",
  templateUrl: "./listar-planes.component.html",
  styleUrls: ["./listar-planes.component.css"],
})
export class ListarPlanesComponent implements OnInit {
  listadoPlanes: ModeloPlan[] = [];

  constructor(private planServicio: PlanService, private router: Router) {}

  ngOnInit(): void {
    this.planServicio.obtenerPlanes().subscribe((planes) => {
      this.listadoPlanes = planes;
    });
  }

  obtenerListadoUsuarios() {
    this.planServicio.obtenerPlanes().subscribe((datos: ModeloPlan[]) => {
      this.listadoPlanes = datos;
    });
  }

  /* MENSAJES DE ALERTAS SWEETALERT2 */
  eliminarPlan(id: String) {
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
        this.router.navigate(["/eliminar-plan/", id]);
      }
    });
  }
}
