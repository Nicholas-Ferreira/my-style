import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class Cartao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titular: string;

  @Column()
  numero: number;

  @Column()
  codigo_seguranca: number;

  @Column()
  data_vencimento: Date;
  
  @OneToMany(type => Pedido, pedido => pedido.cartao)
  pedidos: Pedido[];
  
  @ManyToOne(type => Usuario, usuario => usuario.cartoes)
  usuario: Usuario;
}   