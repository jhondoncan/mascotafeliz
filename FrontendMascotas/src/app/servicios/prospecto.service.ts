import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ModeloProspecto } from "../modelo/prospecto.modelo";

@Injectable({
  providedIn: "root",
})
export class ProspectoService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Crear prospecto
  crearProspecto(prospecto: ModeloProspecto): Observable<ModeloProspecto> {
    return this.http.post<ModeloProspecto>(
      `${this.baseUrl}` + "/prospectos",
      prospecto
    );
  }

  // Obtener prospectos
  obtenerProspectos(): Observable<ModeloProspecto[]> {
    return this.http.get<ModeloProspecto[]>(`${this.baseUrl}` + "/prospectos");
  }

  // Eliminar prospecto
  eliminarProspectos(id: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/prospectos/${id}`);
  }
}
