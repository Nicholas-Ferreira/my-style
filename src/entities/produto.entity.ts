import { Loja } from './loja.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity } from 'typeorm';
import { CategoriaProduto } from './categoriaProduto.entity';
import { ItemPedido } from './itemPedido.entity';

@Entity()
export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  preco: number;

  @Column()
  tamanho: string;

  @Column()
  cor: string;

  @ManyToOne(type => Loja, loja => loja.produtos)
  loja: Loja;

  @ManyToOne(type => CategoriaProduto, categoria => categoria.produtos)
  categoria: CategoriaProduto;
  
  @OneToMany(type => ItemPedido, itemPedido => itemPedido.produto)
  pedidos: ItemPedido[];
}   