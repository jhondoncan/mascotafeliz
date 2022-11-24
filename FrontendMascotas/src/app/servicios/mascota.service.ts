import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ModeloMascota } from "../modelo/mascota.modelo";
import { SeguridadService } from "./seguridad.service";

@Injectable({
  providedIn: "root",
})
export class MascotaService {
  baseUrl = environment.baseUrl;
  token: String = "";
  constructor(
    private http: HttpClient,
    private seguridadServicio: SeguridadService
  ) {
    this.token = this.seguridadServicio.obtenerToken();
  }

  obtenerMascotas(): Observable<ModeloMascota[]> {
    return this.http.get<ModeloMascota[]>(`${this.baseUrl}` + "/mascotas");
  }

  obtenerMascotaPorId(id: String): Observable<ModeloMascota> {
    return this.http.get<ModeloMascota>(`${this.baseUrl}/mascotas/${id}`);
  }

  crearMascota(mascota: ModeloMascota): Observable<ModeloMascota> {
    return this.http.post<ModeloMascota>(
      `${this.baseUrl}` + "/mascotas",
      mascota,
      {
        headers: {
          Authorization: "Bearer " + `${this.token}`,
        },
      }
    );
  }

  actualizarMascota(mascota: ModeloMascota): Observable<ModeloMascota> {
    return this.http.put<ModeloMascota>(
      `${this.baseUrl}/mascotas/${mascota.id}`,
      mascota
    );
  }

  eliminarMascota(id: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/mascotas/${id}`, {
      headers: {
        Authorization: "Bearer " + `${this.token}`,
      },
    });
  }
}
