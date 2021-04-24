import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from 'src/entities/produto.entity';

@Injectable()
export class ProdutoService {
  findAll() {
    return Produto.find({
      relations: ['imagens', 'categoria', 'tamanhos', 'loja']
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
}
