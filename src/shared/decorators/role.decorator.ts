import { PUBLIC, ADMIN } from './../roles/usuario.roles';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
export const Public = () => SetMetadata(PUBLIC, true)
export const Admin = () => SetMetadata(ADMIN, true)