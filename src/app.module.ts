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
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'mystyle',
      entities: [
        Cartao,
        CategoriaProduto,
        ItemPedido,
        Endereco,
        Entrega,
        Loja,
        Pedido,
        Produto,
        Usuario
      ],
      synchronize: true,
      logging: false,
    }),
    UsuarioModule,
    ProdutoModule,
    PedidoModule,
    LojaModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, PassportModule, ProviderRolesGuard],
  exports: [],
})
export class AppModule { }
