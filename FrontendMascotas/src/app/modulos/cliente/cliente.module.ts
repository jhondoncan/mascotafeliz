import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { CrearMascotaComponent } from './mascotas/crear-mascota/crear-mascota.component';
import { EditarMascotaComponent } from './mascotas/editar-mascota/editar-mascota.component';
import { ListarMascotasComponent } from './mascotas/listar-mascotas/listar-mascotas.component';


@NgModule({
  declarations: [
    RegistroComponent,
    CrearMascotaComponent,
    EditarMascotaComponent,
    ListarMascotasComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
