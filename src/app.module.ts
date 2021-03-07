import { UsuarioModule } from './app/usuario/usuario.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DetalhesEntregaPedido } from './entities/detalhesEntregaPedido.entity';
import { DetalhesPedido } from './entities/detalhesPedido.entity';
import { DetalhesProduto } from './entities/detalhesProduto.entity';
import { CategoriaProduto } from './entities/categoriaProduto.entity';
import { Cartao } from './entities/cartao.entity';
import { Endereco } from './entities/endereco.entity';
import { Entrega } from './entities/entrega.entity';
import { Loja } from './entities/loja.entity';
import { Pedido } from './entities/pedido.entity';
import { Produto } from './entities/produto.entity';
import { Usuario } from './entities/usuario.entity';
import { ProdutoModule } from './app/produto/produto.module';


@Module({
  imports: [
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
        DetalhesEntregaPedido,
        DetalhesPedido,
        DetalhesProduto,
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
    ProdutoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
