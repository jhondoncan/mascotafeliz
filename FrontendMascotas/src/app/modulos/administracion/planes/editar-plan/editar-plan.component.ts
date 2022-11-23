import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SeguridadService } from "src/app/servicios/seguridad.service";

@Component({
  selector: "app-editar-plan",
  templateUrl: "./editar-plan.component.html",
  styleUrls: ["./editar-plan.component.css"],
})
export class EditarPlanComponent implements OnInit {
  focus;
  focus1;
  focus2;
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
