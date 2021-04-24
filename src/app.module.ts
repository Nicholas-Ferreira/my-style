import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { ProviderRolesGuard } from './shared/roles/guard.roles';
import { JwtStrategy } from './app/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { GoogleRecaptchaModule, GoogleRecaptchaNetwork } from '@nestlab/google-recaptcha';
import { ProdutoModule } from './app/produto/produto.module';
import { PedidoModule } from './app/pedido/pedido.module';

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
    AuthModule,
    ProdutoModule,
    PedidoModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, PassportModule, ProviderRolesGuard],
  exports: [],
})
export class AppModule { }
