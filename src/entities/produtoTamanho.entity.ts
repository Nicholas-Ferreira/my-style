import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, DeleteDateColumn, CreateDateColumn, ManyToMany } from 'typeorm';
import { Produto } from './produto.entity';

@Entity()
export class TamanhoProduto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
  
  @CreateDateColumn()
  criado_em: Date;
}   