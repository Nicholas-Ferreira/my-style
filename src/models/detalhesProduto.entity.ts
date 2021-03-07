import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DetalhesProduto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marca: string;

  @Column()
  tamanho: string;

  @Column()
  cor: string;
}   