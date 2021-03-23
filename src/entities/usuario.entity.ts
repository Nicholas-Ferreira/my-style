import { Endereco } from './endereco.entity';
import { Cartao } from './cartao.entity';
import { Loja } from './loja.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, BaseEntity, UpdateDateColumn, Unique } from 'typeorm';
import { Pedido } from './pedido.entity';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ select: false, nullable: false })
  senha: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: string;

  @Column({ select: false, nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;

  @Column({ select: false, nullable: false })
  salt: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;

  @OneToMany(type => Loja, loja => loja.representante)
  lojas: Loja[];

  @OneToMany(type => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[];

  @OneToMany(type => Cartao, cartao => cartao.usuario)
  cartoes: Cartao[];

  @OneToMany(type => Endereco, endereco => endereco.usuario)
  enderecos: Endereco[];

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.senha;
  }
}