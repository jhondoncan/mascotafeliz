import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Credenciales, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {AutenticacionService} from '../services';
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}

  @post('/login', {
    responses: {
      '200': {
        description: 'Login de usuario',
      },
    },
  })
  async login(@requestBody() credenciales: Credenciales) {
    let p = await this.servicioAutenticacion.identificarUsuario(
      credenciales.correo,
      credenciales.password,
    );
    if (p) {
      let token = this.servicioAutenticacion.generarTokenJWT(p);
      return {
        datos: {
          id: p.id,
          nombres: p.nombres,
          apellidos: p.apellidos,
          correo: p.correo,
          rol: p.rol,
        },
        token: token,
      };
    } else {
      throw new HttpErrors[401]('Usuario o contraseña incorrectos');
    }
  }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    const clave = this.servicioAutenticacion.generarClave();
    const claveCifrada = this.servicioAutenticacion.cicrarClave(clave);
    usuario.password = claveCifrada;
    const p = await this.usuarioRepository.create(usuario);

    // TODO: Enviar correo electrónico con la clave
    const destino = usuario.correo;
    const asunto = '¡Bienvenido a MascotaFeliz!';
    const cuerpo = `¡Hola <strong>${usuario.nombres}</strong>! </br>Bienvenido a MascotaFeliz. </br>Tu clave de acceso al portal es: <strong>${clave}</strong> </br> Por favor no compartas tu clave con nadie.`;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: destino,
      from: 'arlem@misena.edu.co',
      subject: asunto,
      html: cuerpo,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Correo elecotrónico enviado');
      })
      .catch((error: any) => {
        console.error(error);
      });

    return p;
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Usuario) where?: Where<Usuario>): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'})
    filter?: FilterExcludingWhere<Usuario>,
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
