import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, ManyToOne } from 'typeorm';
import { Endereco } from './endereco.entity';
import { Pedido } from './pedido.entity';

@Entity()
export class Entrega extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @ManyToOne(type => Endereco, endereco => endereco.entragas)
  endereco: Endereco;

  @ManyToOne(type => Pedido, pedido => pedido.entregas)
  pedido: Pedido;
}   