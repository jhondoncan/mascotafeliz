import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ModeloSucursal } from "src/app/modelo/sucursal.modelo";
import { SucursalService } from "src/app/servicios/sucursal.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-editar-sucursal",
  templateUrl: "./editar-sucursal.component.html",
  styleUrls: ["./editar-sucursal.component.css"],
})
export class EditarSucursalComponent implements OnInit {
  focus;
  focus1;
  focus2;

  id: String = "";
  formularioSucursalEditar = new FormGroup({
    id: new FormControl(""),
    departamento: new FormControl(""),
    ciudad: new FormControl(""),
    direccion: new FormControl(""),
    telefono: new FormControl(""),
  });
  constructor(
    private sucursalServicio: SucursalService,
    private router: Router,
    private routerActivo: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.routerActivo.snapshot.params["id"];
    this.buscarSucursal();
  }

  editarSucursal() {
    let id = this.formularioSucursalEditar.value.id;
    let departamento = this.formularioSucursalEditar.value.departamento;
    let ciudad = this.formularioSucursalEditar.value.ciudad;
    let direccion = this.formularioSucursalEditar.value.direccion;
    let telefono = this.formularioSucursalEditar.value.telefono;

    let sucursal = new ModeloSucursal();
    if (
      departamento != "" &&
      ciudad != "" &&
      direccion != "" &&
      telefono != ""
    ) {
      sucursal.id = id;
      sucursal.departamento = departamento;
      sucursal.ciudad = ciudad;
      sucursal.direccion = direccion;
      sucursal.telefono = telefono;

      this.sucursalServicio.actualizarSucrusal(sucursal).subscribe(
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

  buscarSucursal() {
    this.sucursalServicio.obtenerSucursalPorId(this.id).subscribe(
      (datos: ModeloSucursal) => {
        this.formularioSucursalEditar.controls["id"].setValue(datos.id);
        this.formularioSucursalEditar.controls["departamento"].setValue(
          datos.departamento
        );
        this.formularioSucursalEditar.controls["ciudad"].setValue(datos.ciudad);
        this.formularioSucursalEditar.controls["direccion"].setValue(
          datos.direccion
        );
        this.formularioSucursalEditar.controls["telefono"].setValue(
          datos.telefono
        );
      },
      (error: any) => {
        this.errorCargarSucursal();
      }
    );
  }

  errorCrearSucursal() {
    Swal.fire({
      title: "",
      text: "Se ha producido un error al actualizar la sucursal.",
      icon: "error",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
  }
  okCrearSucursal() {
    Swal.fire({
      title: "",
      text: "La sucursal se ha actualizado con éxito.",
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

  errorCargarSucursal() {
    Swal.fire({
      title: "",
      text: "Se ha producido un error al obtener la sucursal.",
      icon: "error",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
  }
}
