import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { CrearMascotaComponent } from './mascotas/crear-mascota/crear-mascota.component';
import { EditarMascotaComponent } from './mascotas/editar-mascota/editar-mascota.component';
import { BuscarMascotaComponent } from './mascotas/buscar-mascota/buscar-mascota.component';
import { EliminarMascotaComponent } from './mascotas/eliminar-mascota/eliminar-mascota.component';
import { SolicitudesComponent } from './solicitudes/solicitudes/solicitudes.component';
import { CrearSolicitudComponent } from './solicitudes/crear-solicitud/crear-solicitud.component';
import { AfiliacionesComponent } from './asesor/afiliaciones/afiliaciones.component';


@NgModule({
  declarations: [
    RegistroComponent,
    MascotasComponent,
    CrearMascotaComponent,
    EditarMascotaComponent,
    BuscarMascotaComponent,
    EliminarMascotaComponent,
    SolicitudesComponent,
    CrearSolicitudComponent,
    AfiliacionesComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
