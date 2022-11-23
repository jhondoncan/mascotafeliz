import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SeguridadService } from "src/app/servicios/seguridad.service";

@Component({
  selector: "app-crear-mascota",
  templateUrl: "./crear-mascota.component.html",
  styleUrls: ["./crear-mascota.component.css"],
})
export class CrearMascotaComponent implements OnInit {
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
