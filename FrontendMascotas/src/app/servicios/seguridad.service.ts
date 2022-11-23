import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ModeloIdentificar } from "../modelo/identificar.modelo";

@Injectable({
  providedIn: "root",
})
export class SeguridadService {
  constructor(private http: HttpClient, private router: Router) {
    this.verificarSesionActual();
  }

  baseUrl = environment.baseUrl;
  datosUsuarioEnSesion = new BehaviorSubject<ModeloIdentificar>(
    new ModeloIdentificar()
  );

  iniciarSesion(
    correo: string,
    password: string
  ): Observable<ModeloIdentificar> {
    return this.http.post<ModeloIdentificar>(`${this.baseUrl}` + "/login", {
      correo: correo,
      password: password,
    });
  }

  almacenarSession(datos: ModeloIdentificar) {
    datos.estaIdentificado = true;
    let datosUsuario = JSON.stringify(datos);
    localStorage.setItem("datosSesion", datosUsuario);
    this.refrescarDatosUsuarioEnSesion(datos);
  }

  obtenerSession() {
    let datosUsuario = JSON.parse(localStorage.getItem("datosSesion"));
    if (!datosUsuario) {
      return null;
    }
    return datosUsuario;
  }

  cerrarSesion() {
    localStorage.removeItem("datosSesion");
    this.refrescarDatosUsuarioEnSesion(new ModeloIdentificar());
    this.router.navigate(["/inicio"]);
  }

  seHaIniciadoSesion() {}

  verificarSesionActual() {
    let datosUsuario = this.obtenerSession();
    if (datosUsuario) {
      this.refrescarDatosUsuarioEnSesion(datosUsuario);
    }
  }

  refrescarDatosUsuarioEnSesion(datosUsuario: ModeloIdentificar) {
    this.datosUsuarioEnSesion.next(datosUsuario);
  }

  obtenerDatosUsuarioEnSesion() {
    return this.datosUsuarioEnSesion.asObservable();
  }
}
