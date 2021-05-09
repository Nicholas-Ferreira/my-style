import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, DeleteDateColumn, CreateDateColumn, ManyToMany } from 'typeorm';
import { Produto } from './produto.entity';

@Entity()
export class TagProduto extends BaseEntity {
  constructor(description?: string) {
    super()
    this.description = description
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  description: string;
}