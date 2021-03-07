import { Loja } from './loja.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity } from 'typeorm';

@Entity()
export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  preco: number;

  @ManyToOne(type => Loja, loja => loja.produtos)
  loja: Loja;
}   