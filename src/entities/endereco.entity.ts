import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Entrega } from './entrega.entity';

@Entity()
export class Endereco extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  endereco: string;

  @Column()
  numero: number;

  @Column()
  cep: number;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  estado: string;

  @Column()
  cidade: string;

  @ManyToOne(type => Usuario, usuario => usuario.enderecos)
  usuario: Usuario;

  @OneToMany(type => Entrega, entrega => entrega.endereco)
  entragas: Entrega[];
}