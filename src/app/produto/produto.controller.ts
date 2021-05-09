import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFiles, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Public } from 'src/shared/decorators/role.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { Usuario } from 'src/entities/usuario.entity';
import { GoogleService } from 'src/lib/googleCloud';
import { Produto } from 'src/entities/produto.entity';
import { Loja } from 'src/entities/loja.entity';
@Controller('produto')
export class ProdutoController {
  constructor(
    private readonly produtoService: ProdutoService,
  ) { }

  @Get()
  @Public()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Post()
  async create(
    @GetUser() usuario: Usuario,
    @Body() createProdutoDto: CreateProdutoDto
  ) {
    const loja = await Loja.findOne(createProdutoDto.idLoja, { where: { representante: usuario } })
    if (!loja) throw new NotFoundException("Loja não encontrada")

    return this.produtoService.create(loja, createProdutoDto)
  }

  @Post(':id/imagem')
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadFile(
    @Param('id') id: string,
    @GetUser() usuario: Usuario,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    if (!files) throw new BadRequestException('Nenhum imagem selecionanda')
    if (!files.length) throw new BadRequestException('Adicione pelo menos uma imagem')

    const produto = await Produto.findOne(+id, { relations: ['loja', 'loja.representante'] })
    if (!produto) throw new NotFoundException('Produto não encontrado')
    if (produto.loja.representante.id !== usuario.id)
      throw new ForbiddenException("Você deve ser o representante da loja para adicionar produtos")

    const dataImagens = await Promise.all(files.map(async file => {
      const data = await this.produtoService.upload(produto, file)
      return { ...data, file }
    }))

    return dataImagens
  }
}
