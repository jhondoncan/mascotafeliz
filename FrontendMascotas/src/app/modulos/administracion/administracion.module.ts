import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { CrearProspectoComponent } from './prospectos/crear-prospecto/crear-prospecto.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { CrearPlanComponent } from './planes/crear-plan/crear-plan.component';
import { EditarPlanComponent } from './planes/editar-plan/editar-plan.component';
import { CrearSucursalComponent } from './sucursales/crear-sucursal/crear-sucursal.component';
import { EditarSucursalComponent } from './sucursales/editar-sucursal/editar-sucursal.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { ListarPlanesComponent } from './planes/listar-planes/listar-planes.component';
import { ListarSucursalesComponent } from './sucursales/listar-sucursales/listar-sucursales.component';
import { ListarProspectosComponent } from './prospectos/listar-prospectos/listar-prospectos.component';


@NgModule({
  declarations: [
    CrearProspectoComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    CrearPlanComponent,
    EditarPlanComponent,
    CrearSucursalComponent,
    EditarSucursalComponent,
    ListarUsuariosComponent,
    ListarPlanesComponent,
    ListarSucursalesComponent,
    ListarProspectosComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule
  ]
})
export class AdministracionModule { }
