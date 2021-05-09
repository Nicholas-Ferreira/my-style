import { Loja } from './loja.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity, ManyToMany, JoinTable, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { CategoriaProduto } from './categoriaProduto.entity';
import { ItemPedido } from './itemPedido.entity';
import { ImagemProduto } from './produtoImage.entity';
import { TamanhoProduto } from './produtoTamanho.entity';
import { TagProduto } from './produtoTag.entity';
import { CorProduto } from './produtoCor.entity';

@Entity()
export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  preco: number;

  @Column({ default: 1 })
  parcelado: number;

  @Column()
  style: string;

  @Column()
  frete: boolean;
  
  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;
  
  @DeleteDateColumn()
  deletado_em: Date;

  @ManyToOne(type => Loja, loja => loja.produtos)
  loja: Loja;

  @ManyToOne(type => CategoriaProduto, categoria => categoria.produtos)
  categoria: CategoriaProduto;

  @OneToMany(type => ItemPedido, itemPedido => itemPedido.produto)
  pedidos: ItemPedido[];

  @OneToMany(type => ImagemProduto, imagemProduto => imagemProduto.produto)
  imagens: ImagemProduto[];

  @OneToMany(type => CorProduto, corProduto => corProduto.produto, { 
    cascade: true 
  })
  cores: CorProduto[];

  @ManyToMany(type => TamanhoProduto)
  @JoinTable()
  tamanhos: TamanhoProduto[]

  @ManyToMany(type => TagProduto)
  @JoinTable()
  tags: TagProduto[]
}