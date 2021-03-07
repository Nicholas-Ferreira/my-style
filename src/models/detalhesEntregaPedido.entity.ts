import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class DetalhesEntregaPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data_entrega: Date;

  @Column()
  endereco: string; // relacionamento
}   