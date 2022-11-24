import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProspectoService } from "src/app/servicios/prospecto.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-eliminar-prospecto",
  templateUrl: "./eliminar-prospecto.component.html",
  styleUrls: ["./eliminar-prospecto.component.css"],
})
export class EliminarProspectoComponent implements OnInit {
  id: String = "";

  constructor(
    private prospectoServicio: ProspectoService,
    private router: Router,
    private routerActivo: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.routerActivo.snapshot.params["id"];
    this.prospectoServicio.eliminarProspectos(this.id).subscribe(
      (data) => {
        this.router.navigate(["/prospectos"]);
        Swal.fire({
          title: "",
          text: "El prospecto ha sido eliminado.",
          icon: "success",
          confirmButtonColor: "#5E72E4",
        });
      },
      (error) => {
        this.router.navigate(["/prospectos"]);
        Swal.fire({
          title: "",
          text: "Se ha producido un error al eliminar el usuario.",
          icon: "error",
          confirmButtonColor: "#5E72E4",
        });
      }
    );
  }
}
