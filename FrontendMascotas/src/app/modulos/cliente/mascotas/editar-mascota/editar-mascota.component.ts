import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SeguridadService } from "src/app/servicios/seguridad.service";

@Component({
  selector: "app-editar-mascota",
  templateUrl: "./editar-mascota.component.html",
  styleUrls: ["./editar-mascota.component.css"],
})
export class EditarMascotaComponent implements OnInit {
  focus;
  focus1;
  focus5;
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
