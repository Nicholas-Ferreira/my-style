import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class Cartao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titular: string;

  @Column({ length: 4 })
  numero: string;

  @Column()
  data_vencimento: Date;

  @Column({ select: false, length: 500 })
  hash: string;

  @CreateDateColumn()
  criado_em: Date;

  @DeleteDateColumn()
  cancelado_em: Date

  @OneToMany(type => Pedido, pedido => pedido.cartao)
  pedidos: Pedido[];

  @ManyToOne(type => Usuario, usuario => usuario.cartoes)
  usuario: Usuario;
}