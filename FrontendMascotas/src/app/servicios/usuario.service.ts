import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ModeloUsuario } from "../modelo/usuario.modelo";
import { SeguridadService } from "./seguridad.service";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  baseUrl = environment.baseUrl;
  token: String = "";
  constructor(
    private http: HttpClient,
    private seguridadServicio: SeguridadService
  ) {
    this.token = this.seguridadServicio.obtenerToken();
  }

  obtenerUsuarios(): Observable<ModeloUsuario[]> {
    return this.http.get<ModeloUsuario[]>(`${this.baseUrl}` + "/usuarios");
  }

  obtenerUsuarioPorId(id: String): Observable<ModeloUsuario> {
    return this.http.get<ModeloUsuario>(`${this.baseUrl}/usuarios/${id}`);
  }

  crearUsuario(usuario: ModeloUsuario): Observable<ModeloUsuario> {
    return this.http.post<ModeloUsuario>(
      `${this.baseUrl}` + "/usuarios",
      usuario,
      {
        headers: {
          Authorization: "Bearer " + `${this.token}`,
        },
      }
    );
  }

  actualizarUsuario(usuario: ModeloUsuario): Observable<ModeloUsuario> {
    return this.http.patch<ModeloUsuario>(
      `${this.baseUrl}/usuarios/${usuario.id}`,
      usuario
    );
  }

  eliminarUsuario(id: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/usuarios/${id}`, {
      headers: {
        Authorization: "Bearer " + `${this.token}`,
      },
    });
  }
}
