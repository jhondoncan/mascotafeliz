import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PlanService } from "src/app/servicios/plan.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-eliminar-plan",
  templateUrl: "./eliminar-plan.component.html",
  styleUrls: ["./eliminar-plan.component.css"],
})
export class EliminarPlanComponent implements OnInit {
  id: String = "";

  constructor(
    private planServicio: PlanService,
    private router: Router,
    private routerActivo: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.routerActivo.snapshot.params["id"];
    this.planServicio.eliminarPlan(this.id).subscribe(
      (data) => {
        this.router.navigate(["/planes"]);
        Swal.fire({
          title: "",
          text: "El plan ha sido eliminado.",
          icon: "success",
          confirmButtonColor: "#5E72E4",
        });
      },
      (error) => {
        this.router.navigate(["/planes"]);
        Swal.fire({
          title: "",
          text: "Se ha producido un error al eliminar el plan.",
          icon: "error",
          confirmButtonColor: "#5E72E4",
        });
      }
    );
  }
}
