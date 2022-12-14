import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SeguridadRoutingModule } from "./seguridad-routing.module";
import { LoginComponent } from "./login/login.component";
import { RecuperarClaveComponent } from "./recuperar-clave/recuperar-clave.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, RecuperarClaveComponent, LogoutComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SeguridadModule {}
