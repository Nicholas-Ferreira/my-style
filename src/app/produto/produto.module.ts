import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { CategoriaController } from './categoria.controller';

@Module({
  controllers: [ProdutoController, CategoriaController],
  providers: [ProdutoService]
})
export class ProdutoModule {}
