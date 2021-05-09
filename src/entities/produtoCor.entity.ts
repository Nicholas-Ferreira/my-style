import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, DeleteDateColumn, CreateDateColumn } from 'typeorm';
import { Produto } from './produto.entity';

@Entity()
export class CorProduto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hex: string;
  
  @Column({ type: 'decimal', precision: 15, scale: 15, nullable: false })
  score: number;

  @Column({ type: 'decimal', precision: 15, scale: 15, nullable: false })
  pixelFraction: number;
  
  @ManyToOne(type => Produto, produto => produto.imagens)
  produto: Produto;
}   