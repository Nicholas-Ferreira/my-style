import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Produto } from './produto.entity';

@Entity()
export class CategoriaProduto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(type => Produto, produto => produto.categoria)
  produtos: Produto[];
}   