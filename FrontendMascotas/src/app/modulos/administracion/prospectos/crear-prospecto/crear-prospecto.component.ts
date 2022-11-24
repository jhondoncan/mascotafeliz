import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ModeloProspecto } from "src/app/modelo/prospecto.modelo";
import { ProspectoService } from "src/app/servicios/prospecto.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-crear-prospecto",
  templateUrl: "./crear-prospecto.component.html",
  styleUrls: ["./crear-prospecto.component.css"],
})
export class CrearProspectoComponent implements OnInit {
  focus: any;
  focus1: any;

  formularioProspecto = new FormGroup({
    nombres: new FormControl(""),
    apellidos: new FormControl(""),
    correo: new FormControl(""),
    celular: new FormControl(""),
    comentario: new FormControl(""),
  });
  constructor(
    private prospectoServicio: ProspectoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  crearProspecto() {
    let nombres = this.formularioProspecto.value.nombres;
    let apellidos = this.formularioProspecto.value.apellidos;
    let correo = this.formularioProspecto.value.correo;
    let celular = this.formularioProspecto.value.celular;
    let comentario = this.formularioProspecto.value.comentario;

    let prospecto = new ModeloProspecto();
    if (
      nombres != "" &&
      apellidos != "" &&
      correo != "" &&
      celular != "" &&
      comentario != ""
    ) {
      prospecto.nombres = nombres;
      prospecto.apellidos = apellidos;
      prospecto.correo = correo;
      prospecto.celular = celular;
      prospecto.comentario = comentario;

      this.prospectoServicio.crearProspecto(prospecto).subscribe(
        (datos: ModeloProspecto) => {
          this.okCrearProspecto();
        },
        (error: any) => {
          this.errorCrearProspecto();
        }
      );
    } else {
      this.camposVacios();
    }
  }

  errorCrearProspecto() {
    Swal.fire({
      title: "",
      text: "Se ha producido un error al enviar tu mensaje.",
      icon: "error",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
  }
  okCrearProspecto() {
    Swal.fire({
      title: "",
      text: "El mensaje ha sido enviado con éxito, pronto uno de nuestros asesores se pondrá en contacto contigo.",
      icon: "success",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
    this.router.navigate(["/inicio"]);
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
