import { Pedido } from './pedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class DetalhesPedido {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  quantidade: number;

  @Column()
  produto: string; // relacionamento

  @ManyToOne(type => Pedido, pedido => pedido.detalhes)
  pedido: Pedido;
}   