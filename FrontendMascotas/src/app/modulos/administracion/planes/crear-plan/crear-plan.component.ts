import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ModeloPlan } from "src/app/modelo/plan.modelo";
import { PlanService } from "src/app/servicios/plan.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-crear-plan",
  templateUrl: "./crear-plan.component.html",
  styleUrls: ["./crear-plan.component.css"],
})
export class CrearPlanComponent implements OnInit {
  focus;
  focus1;
  focus2;

  formularioPlan = new FormGroup({
    nombre: new FormControl(""),
    precio: new FormControl(""),
    descripcion: new FormControl(""),
  });
  constructor(private planServicio: PlanService, private router: Router) {}

  ngOnInit(): void {}

  crearPlan() {
    let nombre = this.formularioPlan.value.nombre;
    let precio = this.formularioPlan.value.precio;
    let descripcion = this.formularioPlan.value.descripcion;

    let plan = new ModeloPlan();

    if (nombre != "" && descripcion != "" && precio != "") {
      plan.nombre = nombre;
      plan.precio = parseInt(precio);
      plan.descripcion = descripcion;

      this.planServicio.crearPlan(plan).subscribe(
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

  errorCrearPlan() {
    Swal.fire({
      title: "",
      text: "Se ha producido un error al registrar el plan.",
      icon: "error",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
  }
  okCrearPlan() {
    Swal.fire({
      title: "",
      text: "El plan se ha registrado con éxito.",
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
}
