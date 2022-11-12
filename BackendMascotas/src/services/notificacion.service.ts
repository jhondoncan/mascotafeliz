import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {UsuarioRepository} from '../repositories';
const sgMail = require('@sendgrid/mail');
const axios = require('axios');

require('dotenv').config();

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(
    /* Add @inject to inject parameters */
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) {}

  /*
   * Add service methods here
   */

  enviarCorreo(destino: string, asunto: string, cuerpo: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: destino,
      from: process.env.CORREO_SENDGRID,
      subject: asunto,
      html: cuerpo,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Correo electrónico enviado');
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  enviarSMS(destino: string, mensaje: string) {
    const encodedParams = new URLSearchParams();
    encodedParams.append('to', `+57${destino}`);
    encodedParams.append('p', `${process.env.KEY_SMS}`);
    encodedParams.append('text', `${mensaje}`);

    const options = {
      method: 'POST',
      url: 'https://sms77io.p.rapidapi.com/sms',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.KEY_RAPIDAPI_SMS,
        'X-RapidAPI-Host': 'sms77io.p.rapidapi.com',
      },
      data: encodedParams,
    };

    axios
      .request(options)
      .then(function (response: {data: unknown}) {
        console.log(response.data);
      })
      .catch(function (error: unknown) {
        console.error(error);
      });
  }

  enviarSMSTwilio(destino: string, mensaje: string) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: mensaje,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+57' + destino,
      })
      .then((message: {sid: unknown}) => console.log(message.sid));
  }
}
