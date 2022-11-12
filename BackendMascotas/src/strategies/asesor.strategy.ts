import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {Request} from 'express';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

export class EstratgiaAsesor implements AuthenticationStrategy {
  name = 'asesor';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (token) {
      const datos = this.servicioAutenticacion.verificarTokenJWT(token);
      if (datos) {
        const perfil: UserProfile = Object.assign({
          id: datos.data.id,
          nombre: datos.data.nombres,
          rol: datos.data.rol,
        });
        return perfil;
      } else {
        throw new HttpErrors[401]('Token no valido');
      }
    } else {
      throw new HttpErrors[401]('No se ha enviado el token');
    }
  }
}
