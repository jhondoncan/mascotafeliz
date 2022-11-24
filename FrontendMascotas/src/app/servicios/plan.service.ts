import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ModeloPlan } from "../modelo/plan.modelo";
import { SeguridadService } from "./seguridad.service";

@Injectable({
  providedIn: "root",
})
export class PlanService {
  baseUrl = environment.baseUrl;
  token: String = "";

  constructor(
    private http: HttpClient,
    private seguridadServicio: SeguridadService
  ) {
    this.token = this.seguridadServicio.obtenerToken();
  }

  obtenerPlanes(): Observable<ModeloPlan[]> {
    return this.http.get<ModeloPlan[]>(`${this.baseUrl}` + "/planes");
  }

  obtenerPlanPorId(id: String): Observable<ModeloPlan> {
    return this.http.get<ModeloPlan>(`${this.baseUrl}/planes/${id}`);
  }

  crearPlan(plan: ModeloPlan): Observable<ModeloPlan> {
    return this.http.post<ModeloPlan>(`${this.baseUrl}` + "/planes", plan, {
      headers: {
        Authorization: "Bearer " + `${this.token}`,
      },
    });
  }

  actualizarPlan(plan: ModeloPlan): Observable<ModeloPlan> {
    return this.http.put<ModeloPlan>(`${this.baseUrl}/planes/${plan.id}`, plan);
  }

  eliminarPlan(id: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/planes/${id}`, {
      headers: {
        Authorization: "Bearer " + `${this.token}`,
      },
    });
  }
}
