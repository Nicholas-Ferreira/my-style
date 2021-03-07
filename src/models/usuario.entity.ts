import { Endereco } from './endereco.entity';
import { Cartao } from './cartao.entity';
import { Loja } from './loja.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  cpf: string;
  
  @Column()
  senha: string;

  @Column()
  idade: number;

  @CreateDateColumn()
  criado_em: Date;

  @OneToMany(type => Loja, loja => loja.representante)
  lojas: Loja[];

  @OneToMany(type => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[];

  @OneToMany(type => Cartao, cartao => cartao.usuario)
  cartoes: Cartao[];

  @OneToMany(type => Endereco, endereco => endereco.usuario)
  enderecos: Endereco[];
}   