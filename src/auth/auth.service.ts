import { SignInUsuarioDto } from './dto/signin-usuario.dto';
import { SignUpUsuarioDto } from './dto/signup-usuario.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { Injectable } from '@nestjs/common';
import { ConflictException, InternalServerErrorException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common/exceptions';
import { UserRole } from 'src/shared/roles/usuario.roles';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) { }

  async signUp(createUsuarioDto: SignUpUsuarioDto): Promise<Usuario> {
    if (createUsuarioDto.senha != createUsuarioDto.confirmar_senha) {
      throw new UnprocessableEntityException('As senhas não conferem');
    }

    const { email, nome, senha } = createUsuarioDto;
    const usuario = new Usuario;
    usuario.email = email;
    usuario.nome = nome;
    usuario.role = UserRole.USER;
    usuario.status = true;
    usuario.confirmationToken = crypto.randomBytes(32).toString('hex');
    usuario.salt = await bcrypt.genSalt();
    usuario.senha = await bcrypt.hash(senha, usuario.salt);

    return await usuario.save()
      .catch(error => {
        if (error.code.toString() === '23505') {
          throw new ConflictException('Endereço de email já está em uso');
        } else {
          throw new InternalServerErrorException('Erro ao salvar o usuário no banco de dados');
        }
      })
  }

  async signIn(credentialsDto: SignInUsuarioDto) {
    const { email, senha } = credentialsDto;
    const usuario = await Usuario.findOneOrFail({ email, status: true }, { select: ['salt', 'senha'] });
    const auth = await usuario.checkPassword(senha)

    if (!auth) throw new UnauthorizedException('Credenciais inválidas');

    const jwtPayload = { id: usuario.id };
    const token = await this.jwtService.sign(jwtPayload);
    return { token }
  }
}