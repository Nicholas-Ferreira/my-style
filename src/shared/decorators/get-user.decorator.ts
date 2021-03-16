import { Usuario } from 'src/entities/usuario.entity';
import { createParamDecorator } from '@nestjs/common';


export const GetUser = createParamDecorator(
  (data, req): Usuario => req.args[0].user
);