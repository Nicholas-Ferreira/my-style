import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Entrega {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
  
}   