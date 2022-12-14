import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./modulos/seguridad/login/login.component";
import { RegistroComponent } from "./modulos/cliente/registro/registro.component";
import { RecuperarClaveComponent } from "./modulos/seguridad/recuperar-clave/recuperar-clave.component";
import { CrearProspectoComponent } from "./modulos/administracion/prospectos/crear-prospecto/crear-prospecto.component";
import { CrearMascotaComponent } from "./modulos/cliente/mascotas/crear-mascota/crear-mascota.component";
import { CrearUsuarioComponent } from "./modulos/administracion/usuarios/crear-usuario/crear-usuario.component";
import { CrearPlanComponent } from "./modulos/administracion/planes/crear-plan/crear-plan.component";
import { EditarPlanComponent } from "./modulos/administracion/planes/editar-plan/editar-plan.component";
import { EditarUsuarioComponent } from "./modulos/administracion/usuarios/editar-usuario/editar-usuario.component";
import { EditarMascotaComponent } from "./modulos/cliente/mascotas/editar-mascota/editar-mascota.component";
import { CrearSucursalComponent } from "./modulos/administracion/sucursales/crear-sucursal/crear-sucursal.component";
import { EditarSucursalComponent } from "./modulos/administracion/sucursales/editar-sucursal/editar-sucursal.component";
import { ListarUsuariosComponent } from "./modulos/administracion/usuarios/listar-usuarios/listar-usuarios.component";
import { ListarMascotasComponent } from "./modulos/cliente/mascotas/listar-mascotas/listar-mascotas.component";
import { ListarPlanesComponent } from "./modulos/administracion/planes/listar-planes/listar-planes.component";
import { ListarSucursalesComponent } from "./modulos/administracion/sucursales/listar-sucursales/listar-sucursales.component";
import { ListarProspectosComponent } from "./modulos/administracion/prospectos/listar-prospectos/listar-prospectos.component";
import { InicioComponent } from "./plantilla/inicio/inicio.component";
import { ErrorComponent } from "./plantilla/error/error.component";
import { LogoutComponent } from "./modulos/seguridad/logout/logout.component";
import { EliminarUsuarioComponent } from "./modulos/administracion/usuarios/eliminar-usuario/eliminar-usuario.component";
import { ValidadorSesionGuard } from "./guardianes/validador-sesion.guard";
import { EliminarProspectoComponent } from "./modulos/administracion/prospectos/eliminar-prospecto/eliminar-prospecto.component";
import { EliminarSucursalComponent } from "./modulos/administracion/sucursales/eliminar-sucursal/eliminar-sucursal.component";
import { EliminarPlanComponent } from "./modulos/administracion/planes/eliminar-plan/eliminar-plan.component";
import { EliminarMascotaComponent } from "./modulos/cliente/mascotas/eliminar-mascota/eliminar-mascota.component";

const routes: Routes = [
  { path: "inicio", component: InicioComponent },
  { path: "", pathMatch: "full", redirectTo: "inicio" },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "registro", component: RegistroComponent },
  { path: "recuperar-clave", component: RecuperarClaveComponent },
  { path: "contacto", component: CrearProspectoComponent },
  {
    path: "prospectos",
    component: ListarProspectosComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "eliminar-prospecto/:id",
    component: EliminarProspectoComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "crear-mascota",
    component: CrearMascotaComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "editar-mascota:id",
    component: EditarMascotaComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "eliminar-mascota/:id",
    component: EliminarMascotaComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "mascotas",
    component: ListarMascotasComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "crear-usuario",
    component: CrearUsuarioComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "editar-usuario/:id",
    component: EditarUsuarioComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "eliminar-usuario/:id",
    component: EliminarUsuarioComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "crear-plan",
    component: CrearPlanComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "editar-plan/:id",
    component: EditarPlanComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "eliminar-plan/:id",
    component: EliminarPlanComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "planes",
    component: ListarPlanesComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "crear-sucursal",
    component: CrearSucursalComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "editar-sucursal/:id",
    component: EditarSucursalComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "eliminar-sucursal/:id",
    component: EliminarSucursalComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "sucursales",
    component: ListarSucursalesComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: "usuarios",
    component: ListarUsuariosComponent,
    canActivate: [ValidadorSesionGuard],
  },
  { path: "**", component: ErrorComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
