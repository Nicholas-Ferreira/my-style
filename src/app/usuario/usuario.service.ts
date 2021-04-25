import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
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