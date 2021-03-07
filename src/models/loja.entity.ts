import { Produto } from './produto.entity';
import { Pedido } from './pedido.entity';
import { Usuario } from './usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Loja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  logomarca: string;

  @Column()
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