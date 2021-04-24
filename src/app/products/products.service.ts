import { ProdutoRepository } from '../../repositories/produto.repository';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  findAll() {
    return ProdutoRepository.listar()
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
}
