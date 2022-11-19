import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsesorRoutingModule } from './asesor-routing.module';
import { AfiliacionesComponent } from './afiliaciones/afiliaciones.component';
import { AfiliarMascotaComponent } from './afiliar-mascota/afiliar-mascota.component';


@NgModule({
  declarations: [
    AfiliacionesComponent,
    AfiliarMascotaComponent
  ],
  imports: [
    CommonModule,
    AsesorRoutingModule
  ]
})
export class AsesorModule { }
