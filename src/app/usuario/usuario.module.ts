import { Module } from '@nestjs/common';
import { CartaoService } from './services/cartao.service';
import { UsuarioService } from './services/usuario.service';
import { EnderecoService } from './services/endereco.service';
import { UsuarioController } from './usuario.controller';
import { CartaoController } from './cartao.controller';
import { EnderecoController } from './endereco.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UsuarioController, CartaoController, EnderecoController],
  providers: [UsuarioService, CartaoService, EnderecoService]
})
export class UsuarioModule {}