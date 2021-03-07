import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';

@Entity()
export class Entrega extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}   