import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization'];

    if (token !== 'Bearer meu-token-fixo') {
      throw new ForbiddenException('Acesso negado: token inválido');
    }

    return true;
  }
}