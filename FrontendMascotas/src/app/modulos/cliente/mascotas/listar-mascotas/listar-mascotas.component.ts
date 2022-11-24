import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModeloMascota } from "src/app/modelo/mascota.modelo";
import { MascotaService } from "src/app/servicios/mascota.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-listar-mascotas",
  templateUrl: "./listar-mascotas.component.html",
  styleUrls: ["./listar-mascotas.component.css"],
})
export class ListarMascotasComponent implements OnInit {
  listadoMascotas: ModeloMascota[] = [];

  constructor(
    private mascotaServicio: MascotaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mascotaServicio.obtenerMascotas().subscribe((mascotas) => {
      this.listadoMascotas = mascotas;
    });
  }
  obtenerListadoMascotas() {
    this.mascotaServicio
      .obtenerMascotas()
      .subscribe((datos: ModeloMascota[]) => {
        this.listadoMascotas = datos;
      });
  }

  /* MENSAJES DE ALERTAS SWEETALERT2 */
  eliminarMascota(id: String) {
    Swal.fire({
      title: "",
      text: "¿Deseas eliminar esta mascota?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#5E72E4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["/eliminar-mascota/", id]);
      }
    });
  }
}
