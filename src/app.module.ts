import { UsuarioModule } from './app/usuario/usuario.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemPedido } from './entities/itemPedido.entity';
import { CategoriaProduto } from './entities/categoriaProduto.entity';
import { Cartao } from './entities/cartao.entity';
import { Endereco } from './entities/endereco.entity';
import { Entrega } from './entities/entrega.entity';
import { Loja } from './entities/loja.entity';
import { Pedido } from './entities/pedido.entity';
import { Produto } from './entities/produto.entity';
import { Usuario } from './entities/usuario.entity';
import { ProdutoModule } from './app/produto/produto.module';
import { PedidoModule } from './app/pedido/pedido.module';
import { LojaModule } from './app/loja/loja.module';
import { AuthModule } from './auth/auth.module';
import { ProviderRolesGuard } from './shared/roles/guard.roles';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { GoogleRecaptchaModule, GoogleRecaptchaNetwork } from '@nestlab/google-recaptcha';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    GoogleRecaptchaModule.forRoot({
      secretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
      response: req => req.headers.recaptcha,
      skipIf: process.env.NODE_ENV !== 'production',
      network: GoogleRecaptchaNetwork.Recaptcha,
      agent: null
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, PassportModule, ProviderRolesGuard],
  exports: [],
})
export class AppModule { }
