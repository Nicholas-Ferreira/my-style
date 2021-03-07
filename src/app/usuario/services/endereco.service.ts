import { Injectable } from '@nestjs/common';
import { Endereco } from 'src/entities/endereco.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { UpdateEnderecoDto } from '../dto/update-endereco.dto';

@Injectable()
export class EnderecoService {
  create(usuario: Usuario, createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
    return Endereco.create({ ...createEnderecoDto, usuario }).save()
  }

  findAll() {
    return Endereco.find()
  }

  findOne(id: number) {
    return Endereco.findOne(id)
  }

  update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    return Endereco.update(id, updateEnderecoDto)
  }

  remove(id: number) {
    return Endereco.delete(id)
  }
}
