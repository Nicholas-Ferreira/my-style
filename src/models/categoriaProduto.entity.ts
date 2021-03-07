import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoriaProduto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
}   