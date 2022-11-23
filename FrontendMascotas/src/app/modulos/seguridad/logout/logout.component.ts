import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SeguridadService } from "src/app/servicios/seguridad.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"],
})
export class LogoutComponent implements OnInit {
  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.servicioSeguridad.cerrarSesion();
    this.router.navigate(["/inicio"]);
    /*  Swal.fire({
      title: "",
      text: "¿Desea cerrar la sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2a82eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cerrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioSeguridad.cerrarSesion();
        this.router.navigate(["/inicio"]);
      }
    }); */
  }
}
