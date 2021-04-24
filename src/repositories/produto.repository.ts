import { CategoriaProduto } from 'src/entities/categoriaProduto.entity';
import { ImagemProduto } from '../entities/produtoImage.entity';
import { Produto } from '../entities/produto.entity';


export class ProdutoRepository {
  static listar() {
    return Produto.find({
      relations: ['imagens', 'categoria', 'tamanhos', 'loja']
    })
  }
}