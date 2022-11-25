import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClienteRoutingModule } from "./cliente-routing.module";
import { RegistroComponent } from "./registro/registro.component";
import { CrearMascotaComponent } from "./mascotas/crear-mascota/crear-mascota.component";
import { EditarMascotaComponent } from "./mascotas/editar-mascota/editar-mascota.component";
import { ListarMascotasComponent } from "./mascotas/listar-mascotas/listar-mascotas.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EliminarMascotaComponent } from './mascotas/eliminar-mascota/eliminar-mascota.component';

@NgModule({
  declarations: [
    RegistroComponent,
    CrearMascotaComponent,
    EditarMascotaComponent,
    ListarMascotasComponent,
    EliminarMascotaComponent,
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ClienteModule {}
