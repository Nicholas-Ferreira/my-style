import { Pedido } from './pedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Produto } from './produto.entity';

@Entity()
export class ItemPedido extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  preco: number;
  
  @Column()
  quantidade: number;

  @ManyToOne(type => Pedido, pedido => pedido.detalhes)
  pedido: Pedido;
  
  @ManyToOne(type => Produto, produto => produto.pedidos)
  produto: Produto;
}   