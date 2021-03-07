import { Cartao } from './cartao.entity';
import { ItemPedido } from './itemPedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany, BaseEntity } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Entrega } from './entrega.entity';
@Entity()
export class Pedido extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidade: number;

  @Column()
  status: string;

  @Column()
  produto: string;

  @CreateDateColumn()
  criado_em: Date;
  
  @ManyToOne(type => Cartao, cartao => cartao.pedidos)
  cartao: Cartao;
  
  @ManyToOne(type => Usuario, usuario => usuario.pedidos)
  usuario: Usuario;
  
  @OneToMany(type => ItemPedido, detalhes => detalhes.pedido)
  detalhes: ItemPedido[];
  
  @OneToMany(type => Entrega, entrega => entrega.pedido)
  entregas: Entrega[];
}   