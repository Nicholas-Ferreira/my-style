import { JwtAuthGuard } from './../../app/auth/jwt-auth.guard';
import { APP_GUARD, Reflector } from '@nestjs/core';

export const ProviderRolesGuard = { provide: APP_GUARD, useClass: JwtAuthGuard }