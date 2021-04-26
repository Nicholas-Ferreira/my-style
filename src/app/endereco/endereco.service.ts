import { Injectable } from '@nestjs/common';
import { Endereco } from 'src/entities/endereco.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Injectable()
export class EnderecoService {
  create(usuario: Usuario, createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
    return Endereco.create({ ...createEnderecoDto, usuario }).save()
  }

  findAll(usuario: Usuario) {
    return Endereco.find({ usuario })
  }

  findOne(usuario: Usuario, id: number) {
    return Endereco.findOne({ id, usuario })
  }

  update(usuario: Usuario, id: number, updateEnderecoDto: UpdateEnderecoDto) {
    return Endereco.update({ id, usuario }, updateEnderecoDto)
  }

  remove(usuario: Usuario, id: number) {
    return Endereco.delete(id)
  }
}