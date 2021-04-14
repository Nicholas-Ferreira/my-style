import { Usuario } from 'src/entities/usuario.entity';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: { id: number }) {
    const { id } = payload;
    const usuario = await Usuario.findOne(id);
    if (!usuario) throw new UnauthorizedException('Usuário não encontrado');

    return usuario;
  }
}