import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, DeleteDateColumn, CreateDateColumn } from 'typeorm';
import { Produto } from './produto.entity';

@Entity()
export class ImagemProduto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
  
  @Column()
  principal: boolean;

  @CreateDateColumn()
  criado_em: Date;
  
  @DeleteDateColumn()
  deletado_em: Date;
  
  @ManyToOne(type => Produto, produto => produto.imagens)
  produto: Produto;
}   