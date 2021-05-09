import { Produto } from './produto.entity';
import { Pedido } from './pedido.entity';
import { Usuario } from './usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, BaseEntity } from 'typeorm';

@Entity()
export class Loja extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  nome: string;

  @Column()
  logomarca: string;

  @Column({ length: 14 })
  cnpj: string;

  @Column()
  email: string;

  @CreateDateColumn()
  criado_em: Date;

  @OneToMany(type => Produto, produto => produto.loja)
  produtos: Produto[];

  @ManyToOne(type => Usuario, usuario => usuario.lojas)
  representante: Usuario;
}