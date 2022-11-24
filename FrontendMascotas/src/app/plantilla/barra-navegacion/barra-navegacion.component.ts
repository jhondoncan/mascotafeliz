import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Location, PopStateEvent } from "@angular/common";
import { SeguridadService } from "src/app/servicios/seguridad.service";
import { Subscription } from "rxjs";
import { ModeloIdentificar } from "src/app/modelo/identificar.modelo";
import Swal from "sweetalert2";

@Component({
  selector: "app-barra-navegacion",
  templateUrl: "./barra-navegacion.component.html",
  styleUrls: ["./barra-navegacion.component.css"],
})
export class BarraNavegacionComponent implements OnInit {
  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  seInicioSesion: boolean = false;

  subscribirse: Subscription = new Subscription();

  constructor(
    public location: Location,
    private router: Router,
    private seguridadServicio: SeguridadService
  ) {}

  ngOnInit() {
    this.subscribirse = this.seguridadServicio
      .obtenerDatosUsuarioEnSesion()
      .subscribe((datos: ModeloIdentificar) => {
        this.seInicioSesion = datos.estaIdentificado;
      });

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else window.scrollTo(0, 0);
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
  }

  isHome() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === "/home") {
      return true;
    } else {
      return false;
    }
  }
  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === "#/documentation") {
      return true;
    } else {
      return false;
    }
  }

  cerrarSesion() {
    Swal.fire({
      title: "",
      text: "¿Desea cerrar la sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#5E72E4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cerrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["/logout"]);
      }
    });
  }
}
