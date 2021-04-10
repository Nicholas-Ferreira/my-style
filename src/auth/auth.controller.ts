import { Usuario } from 'src/entities/usuario.entity';
import { Controller, Post, Body, ValidationPipe, Get, UseGuards, Req, SetMetadata, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignUpUsuarioDto } from './dto/signup-usuario.dto';
import { SignInUsuarioDto } from './dto/signin-usuario.dto';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { UserRole } from 'src/shared/roles/usuario.roles';
import { Roles } from 'src/shared/decorators/role.decorator';
import { Recaptcha } from '@nestlab/google-recaptcha';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Recaptcha()
  @Get('/captcha')
  async captcha() {
    return 'Captcha válido'
  }

  @Post('/signup')
  async signUp(@Body(ValidationPipe) signUpUsuarioDto: SignUpUsuarioDto) {
    const usuario = await this.authService.signUp(signUpUsuarioDto);
    if (usuario) await this.authService.sendConfirmationToken(usuario)
    delete usuario.confirmationToken
    delete usuario.senha
    delete usuario.salt
    delete usuario.recoverToken
    return usuario
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) signInUsuarioDto: SignInUsuarioDto): Promise<{ token: string }> {
    return await this.authService.signIn(signInUsuarioDto);
  }

  @Get('/confirm/:user_id/:token')
  async confirm(@Param('user_id') user_id: string, @Param('token') token: string) {
    return this.authService.confirmarEmail(user_id, token)
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@GetUser() user: Usuario): Usuario {
    return user;
  }

  @Get('/admin')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard())
  getAdmin(@GetUser() usuario: Usuario): Usuario {
    return usuario;
  }
}