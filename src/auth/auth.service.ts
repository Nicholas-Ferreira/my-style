import { SignInUsuarioDto } from './dto/signin-usuario.dto';
import { SignUpUsuarioDto } from './dto/signup-usuario.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { Injectable } from '@nestjs/common';
import { ConflictException, InternalServerErrorException, NotAcceptableException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common/exceptions';
import { UserRole } from 'src/shared/roles/usuario.roles';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { SendGrid } from 'src/lib/sendgrid';
import { CONFIRMATION_EMAIL } from 'src/shared/email/template.email';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) { }

  async signUp(createUsuarioDto: SignUpUsuarioDto): Promise<Usuario> {
    const { email, nome, senha } = createUsuarioDto;

    if (createUsuarioDto.senha != createUsuarioDto.confirmar_senha) {
      throw new UnprocessableEntityException('As senhas não conferem');
    }

    const usuario = await Usuario.findOne({ where: { email: email } })
    if (usuario) {
      if (usuario.status) throw new ConflictException('Endereço de email já está em uso');
      else return usuario
    }

    const novo_usuario = new Usuario();
    novo_usuario.email = email;
    novo_usuario.nome = nome;
    novo_usuario.role = UserRole.USER;
    novo_usuario.status = false;
    novo_usuario.confirmationToken = crypto.randomBytes(32).toString('hex');
    novo_usuario.salt = await bcrypt.genSalt();
    novo_usuario.senha = await bcrypt.hash(senha, novo_usuario.salt);

    return await novo_usuario.save()
      .catch(error => {
        if (error.code.toString() === '23505' || error.code == 'ER_DUP_ENTRY') {
          throw new ConflictException('Endereço de email já está em uso');
        } else {
          throw new InternalServerErrorException('Erro ao salvar o usuário no banco de dados');
        }
      })
  }

  async signIn(credentialsDto: SignInUsuarioDto) {
    const { email, senha } = credentialsDto;
    
    const usuario = await Usuario.findOne({ email, status: true }, { select: ['salt', 'senha'] });
    if (!usuario) throw new NotFoundException("Usuário não encontrado")

    const auth = await usuario.checkPassword(senha)
    if (!auth) throw new UnauthorizedException('Credenciais inválidas');

    const jwtPayload = { id: usuario.id };
    const token = await this.jwtService.sign(jwtPayload);
    return { token }
  }

  async confirmarEmail(usuario_id, token) {
    const usuario = await Usuario.findOne(usuario_id, { select: ['id', 'status', 'confirmationToken'] })
    if (!usuario) throw new NotFoundException("Usuário não encontrado")
    if (usuario.status) throw new NotAcceptableException("Usuário já validado")
    if (usuario.confirmationToken != token) throw new UnauthorizedException("Token Inválido")

    usuario.status = true
    return usuario.save()
  }

  async sendConfirmationToken(usuario: Usuario) {
    usuario = await Usuario.findOneOrFail(usuario.id, { select: ['id', 'email', 'confirmationToken'] })
    new SendGrid({
      to: usuario.email,
      subject: "Ative sua conta na My Style",
      templateId: CONFIRMATION_EMAIL,
      dynamicTemplateData:  {
        linkToConfirmation: `<a href='http://localhost:3000/auth/confirm/${usuario.id}/${usuario.confirmationToken}'>Confirmar e-mail</a>`
      },
    }).send()
  }
}