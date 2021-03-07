import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return Usuario.create(createUsuarioDto).save()
  }

  findAll() {
    return Usuario.find()
  }

  findOne(id: number) {
    return Usuario.findOne(id)
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return Usuario.update(id, updateUsuarioDto)
  }

  remove(id: number) {
    return Usuario.delete(id)
  }
}
