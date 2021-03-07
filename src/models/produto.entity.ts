import { Loja } from './loja.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  preco: number;

  @ManyToOne(type => Loja, loja => loja.produtos)
  loja: Loja;
}   