import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ModeloSucursal } from "../modelo/sucursal.modelo";
import { SeguridadService } from "./seguridad.service";

@Injectable({
  providedIn: "root",
})
export class SucursalService {
  baseUrl = environment.baseUrl;
  token: String = "";

  constructor(
    private http: HttpClient,
    private seguridadServicio: SeguridadService
  ) {
    this.token = this.seguridadServicio.obtenerToken();
  }

  obtenerSucursales(): Observable<ModeloSucursal[]> {
    return this.http.get<ModeloSucursal[]>(`${this.baseUrl}` + "/sucursales");
  }

  obtenerSucursalPorId(id: String): Observable<ModeloSucursal> {
    return this.http.get<ModeloSucursal>(`${this.baseUrl}/sucursales/${id}`);
  }

  crearSucursal(sucursal: ModeloSucursal): Observable<ModeloSucursal> {
    return this.http.post<ModeloSucursal>(
      `${this.baseUrl}` + "/sucursales",
      sucursal,
      {
        headers: {
          Authorization: "Bearer " + `${this.token}`,
        },
      }
    );
  }

  actualizarSucrusal(sucursal: ModeloSucursal): Observable<ModeloSucursal> {
    return this.http.put<ModeloSucursal>(
      `${this.baseUrl}/sucursales/${sucursal.id}`,
      sucursal
    );
  }

  eliminarSucursal(id: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/sucursales/${id}`, {
      headers: {
        Authorization: "Bearer " + `${this.token}`,
      },
    });
  }
}
