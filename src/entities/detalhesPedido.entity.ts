import { Pedido } from './pedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';

@Entity()
export class DetalhesPedido extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  quantidade: number;

  @Column()
  produto: string; // relacionamento

  @ManyToOne(type => Pedido, pedido => pedido.detalhes)
  pedido: Pedido;
}   