import { Pedido } from 'src/entities/pedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Entrega } from './entrega.entity';

@Entity()
export class Endereco extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  logradouro: string;

  @Column()
  numero: string;

  @Column({ length: 8 })
  cep: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  estado: string;

  @Column()
  cidade: string;

  @ManyToOne(type => Usuario, usuario => usuario.enderecos)
  usuario: Usuario;

  @OneToMany(type => Entrega, entrega => entrega.endereco)
  entragas: Entrega[];

  @OneToMany(type => Pedido, pedido => pedido.endereco)
  pedidos: Pedido[];
}