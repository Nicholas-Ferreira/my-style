import { Injectable } from '@nestjs/common';
import { CategoriaProduto } from 'src/entities/categoriaProduto.entity';
import { Loja } from 'src/entities/loja.entity';
import { Produto } from 'src/entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  create(loja: Loja, categoria: CategoriaProduto, createProdutoDto: CreateProdutoDto) {
    return Produto.create({ ...createProdutoDto, loja, categoria }).save();
  }

  findAll() {
    return Produto.find();
  }

  findOne(id: number) {
    return Produto.findOne(id);
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return Produto.update(id, updateProdutoDto);
  }

  remove(id: number) {
    return Produto.delete(id);
  }
}
