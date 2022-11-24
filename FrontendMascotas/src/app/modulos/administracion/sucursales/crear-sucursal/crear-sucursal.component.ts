import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ModeloSucursal } from "src/app/modelo/sucursal.modelo";
import { SucursalService } from "src/app/servicios/sucursal.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-crear-sucursal",
  templateUrl: "./crear-sucursal.component.html",
  styleUrls: ["./crear-sucursal.component.css"],
})
export class CrearSucursalComponent implements OnInit {
  focus;
  focus1;
  focus2;

  formularioSucursal = new FormGroup({
    departamento: new FormControl(""),
    ciudad: new FormControl(""),
    direccion: new FormControl(""),
    telefono: new FormControl(""),
  });

  constructor(
    private sucursalServicio: SucursalService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  crearSucursal() {
    let departamento = this.formularioSucursal.value.departamento;
    let ciudad = this.formularioSucursal.value.ciudad;
    let direccion = this.formularioSucursal.value.direccion;
    let telefono = this.formularioSucursal.value.telefono;
    let sucursal = new ModeloSucursal();
    if (
      departamento != "" &&
      ciudad != "" &&
      direccion != "" &&
      telefono != ""
    ) {
      sucursal.departamento = departamento;
      sucursal.ciudad = ciudad;
      sucursal.direccion = direccion;
      sucursal.telefono = telefono;

      this.sucursalServicio.crearSucursal(sucursal).subscribe(
        (datos: ModeloSucursal) => {
          this.okCrearSucursal();
        },
        (error: any) => {
          this.errorCrearSucursal();
        }
      );
    } else {
      this.camposVacios();
    }
  }

  errorCrearSucursal() {
    Swal.fire({
      title: "",
      text: "Se ha producido un error al registrar la sucursal.",
      icon: "error",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
  }
  okCrearSucursal() {
    Swal.fire({
      title: "",
      text: "La sucursal se ha registrado con éxito.",
      icon: "success",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
    this.router.navigate(["/sucursales"]);
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
