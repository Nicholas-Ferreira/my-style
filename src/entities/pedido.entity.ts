import { Endereco } from './endereco.entity';
import { Cartao } from './cartao.entity';
import { ItemPedido } from './itemPedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany, BaseEntity, DeleteDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Entrega } from './entrega.entity';

export type IStatus = 'PROCESSANDO' | 'PAGO' | 'RECUSADO' | 'TRANSITO' | 'ENTREGUE' | 'CANCELADO'
@Entity()
export class Pedido extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'PRPCESSADO' })
  status: IStatus;

  @CreateDateColumn()
  criado_em: Date;

  @DeleteDateColumn()
  cancelado_em: Date

  @Column({ default: 1 })
  parcelado: number;

  @ManyToOne(type => Endereco, endereco => endereco.pedidos)
  endereco: Endereco;

  @ManyToOne(type => Cartao, cartao => cartao.pedidos)
  cartao: Cartao;

  @ManyToOne(type => Usuario, usuario => usuario.pedidos)
  usuario: Usuario;

  @OneToMany(type => ItemPedido, detalhes => detalhes.pedido, { 
    cascade: true 
  })
  detalhes: ItemPedido[];

  @OneToMany(type => Entrega, entrega => entrega.pedido)
  entregas: Entrega[];
}