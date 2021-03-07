import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';

@Entity()
export class DetalhesEntregaPedido extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data_entrega: Date;

  @Column()
  endereco: string; // relacionamento
}   