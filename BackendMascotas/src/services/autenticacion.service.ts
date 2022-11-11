import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) {}

  /*
   * Add service methods here
   */

  generarClave() {
    const clave = generador(8, false);
    return clave;
  }

  cicrarClave(clave: string) {
    const claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  descifrarClave(clave: string) {}

  identificarUsuario(correo: string, clave: string) {
    let claveCifrada = this.cicrarClave(clave);
    try {
      let p = this.usuarioRepository.findOne({
        where: {correo: correo, password: claveCifrada},
      });
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  generarTokenJWT(usuario: Usuario) {
    let token = jwt.sign(
      {
        data: {
          id: usuario.id,
          correo: usuario.correo,
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          rol: usuario.rol,
        },
      },
      process.env.CLAVE_JWT,
    );
    return token;
  }

  verificarTokenJWT(token: string) {
    try {
      let decoded = jwt.verify(token, process.env.CLAVE_JWT);
      if (decoded) {
        return decoded;
      }
      return false;
    } catch {
      return false;
    }
  }
}
