import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  endereco: string;

  @Column()
  numero: number;

  @Column()
  cep: string;

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
}