import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { SeguridadService } from "src/app/servicios/seguridad.service";
import Swal from "sweetalert2";
const cryptoJS = require("crypto-js");

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  focus;
  focus1;

  formularioLogin = new FormGroup({
    correo: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.servicioSeguridad.obtenerSession()) {
      this.router.navigate(["/inicio"]);
    }
  }

  identificarUsuario() {
    let correo = this.formularioLogin.value.correo;
    let password = this.formularioLogin.value.password;
    /* let passwordCifrada = cryptoJS.MD5(password).toString(); */
    this.servicioSeguridad.iniciarSesion(correo, password).subscribe(
      (datos: any) => {
        // ok
        this.servicioSeguridad.almacenarSession(datos);
        this.router.navigate(["/inicio"]);
      },
      (error: any) => {
        // error
        this.credencialesIncorrectas();
      }
    );
  }

  /* MENSAJES SWEETALERT */
  credencialesIncorrectas() {
    Swal.fire({
      title: "",
      text: "Correo o contraseña incorrectos.",
      icon: "error",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
  }

  credencialesCorrectas() {
    Swal.fire({
      title: "",
      text: "Bienvenido al sistema.",
      icon: "success",
      confirmButtonColor: "#5E72E4",
      confirmButtonText: "Aceptar",
    });
  }
}
