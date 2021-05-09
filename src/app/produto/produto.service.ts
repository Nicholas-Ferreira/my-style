import { ImagemProduto } from './../../entities/produtoImage.entity';
import { TagProduto } from './../../entities/produtoTag.entity';
import { Loja } from './../../entities/loja.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from 'src/entities/produto.entity';
import { GoogleService } from 'src/lib/googleCloud';
import { Usuario } from 'src/entities/usuario.entity';
import { TamanhoProduto } from 'src/entities/produtoTamanho.entity';
import { convertImagePropertiesAnnotationToColors, convertLabelAnnotationsToTag } from 'src/utils/upload';

@Injectable()
export class ProdutoService {
  constructor(
    private readonly googleService: GoogleService
  ) { }

  findAll() {
    return Produto.find({
      relations: ['imagens', 'categoria', 'tamanhos', 'loja']
    })
  }

  findOne(id: number) {
    return Produto.findOne(id, {
      relations: ['imagens', 'categoria', 'tamanhos', 'loja', 'tags', 'cores']
    })
  }

  async create(loja: Loja, createProdutoDto: CreateProdutoDto) {
    const produto = new Produto()
    produto.titulo = createProdutoDto.titulo
    produto.descricao = createProdutoDto.descricao
    produto.style = createProdutoDto.style
    produto.preco = createProdutoDto.preco
    produto.frete = createProdutoDto.frete
    produto.tamanhos = await Promise.all(createProdutoDto.tamanhos.map(t => TamanhoProduto.findOneOrFail(t)))
    produto.loja = loja
    await produto.save()

    return produto
  }

  async upload(produto: Produto, file: Express.Multer.File) {
    const safe = await this.googleService.isSafeImage(file.path);
    if (safe.error) return { error: safe.error }

    const data = await this.googleService.imageDetect(file.path);
    const tags = await convertLabelAnnotationsToTag(data.labelAnnotations)
    const logos = await convertLabelAnnotationsToTag(data.logoAnnotations)
    const colors = await convertImagePropertiesAnnotationToColors(data.imagePropertiesAnnotation?.dominantColors?.colors)

    const publicUrl = await this.googleService.uploadBucket(produto, file)
    const image = new ImagemProduto()
    image.url = publicUrl
    image.produto = produto
    image.principal = false
    await image.save()

    produto.tags = [...tags, ...logos]
    produto.cores = colors
    await produto.save()

    return { publicUrl, produto }
  }
}
