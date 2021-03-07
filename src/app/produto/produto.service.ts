import { Injectable } from '@nestjs/common';
import { Produto } from 'src/entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  create(createProdutoDto: CreateProdutoDto) {
    return Produto.create(createProdutoDto).save();
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
