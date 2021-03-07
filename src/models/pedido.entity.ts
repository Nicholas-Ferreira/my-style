import { Cartao } from './cartao.entity';
import { DetalhesPedido } from './detalhesPedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidade: number;


  @Column()
  loja: string;


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
  
  @OneToMany(type => DetalhesPedido, detalhes => detalhes.pedido)
  detalhes: DetalhesPedido[];
}   