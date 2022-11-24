import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ModeloPlan } from "src/app/modelo/plan.modelo";
import { PlanService } from "src/app/servicios/plan.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-editar-plan",
  templateUrl: "./editar-plan.component.html",
  styleUrls: ["./editar-plan.component.css"],
})
export class EditarPlanComponent implements OnInit {
  focus;
  focus1;
  focus2;

  id: String = "";

  formularioPlanEditar = new FormGroup({
    id: new FormControl(""),
    nombre: new FormControl(""),
    precio: new FormControl(""),
    descripcion: new FormControl(""),
  });

  constructor(
    private planServicio: PlanService,
    private router: Router,
    private routerActivo: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.routerActivo.snapshot.params["id"];
    this.buscarPlan();
  }

  editarPlan() {
    let id = this.formularioPlanEditar.value.id;
    let nombre = this.formularioPlanEditar.value.nombre;
    let precio = this.formularioPlanEditar.value.precio;
    let descripcion = this.formularioPlanEditar.value.descripcion;

    let plan = new ModeloPlan();
    if (nombre != "" && precio != "" && descripcion != "") {
      plan.id = id;
      plan.nombre = nombre;
      plan.precio = precio;
      plan.descripcion = descripcion;

      this.planServicio.actualizarPlan(plan).subscribe(
        (datos: ModeloPlan) => {
          this.okCrearPlan();
        },
        (error: any) => {
          this.errorCrearPlan();
        }
      );
    } else {
      this.camposVacios();
    }
  }

  buscarPlan() {
    this.planServicio.obtenerPlanPorId(this.id).subscribe(
      (datos: ModeloPlan) => {
        this.formularioPlanEditar.controls["id"].setValue(datos.id);
        this.formularioPlanEditar.controls["nombre"].setValue(datos.nombre);
        this.formularioPlanEditar.controls["precio"].setValue(datos.precio);
        this.formularioPlanEditar.controls["descripcion"].setValue(
          datos.descripcion
        );
      },
      (error: any) => {
        this.errorCargarPlan();
      }
    );
  }

  errorCrearPlan() {
    Swal.fire({
      title: "",
      text: "Se ha producido un error al actualizar el plan.",
      icon: "error",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
  }
  okCrearPlan() {
    Swal.fire({
      title: "",
      text: "El plan se ha actualizado con éxito.",
      icon: "success",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
    this.router.navigate(["/planes"]);
  }

  camposVacios() {
    Swal.fire({
      title: "",
      text: "Por favor, complete todos los campos.",
      icon: "warning",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
  }

  errorCargarPlan() {
    Swal.fire({
      title: "",
      text: "Se ha producido un error al obtener el plan.",
      icon: "error",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
    this.router.navigate(["/planes"]);
  }
}
