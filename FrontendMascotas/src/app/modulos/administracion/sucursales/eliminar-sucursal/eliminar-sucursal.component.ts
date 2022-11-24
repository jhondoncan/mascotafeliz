import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SucursalService } from "src/app/servicios/sucursal.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-eliminar-sucursal",
  templateUrl: "./eliminar-sucursal.component.html",
  styleUrls: ["./eliminar-sucursal.component.css"],
})
export class EliminarSucursalComponent implements OnInit {
  id: String = "";

  constructor(
    private sucursalServicio: SucursalService,
    private router: Router,
    private routerActivo: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.routerActivo.snapshot.params["id"];
    this.sucursalServicio.eliminarSucursal(this.id).subscribe(
      (data) => {
        this.router.navigate(["/sucursales"]);
        Swal.fire({
          title: "",
          text: "La sucursal ha sido eliminada.",
          icon: "success",
          confirmButtonColor: "#5E72E4",
        });
      },
      (error) => {
        this.router.navigate(["/sucursales"]);
        Swal.fire({
          title: "",
          text: "Se ha producido un error al eliminar la sucursal.",
          icon: "error",
          confirmButtonColor: "#5E72E4",
        });
      }
    );
  }
}
