import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { AuthorizationPayload } from '../interfaces/auth.interface';



@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        // Acceder al encabezado de autorización
        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader) {
            throw new UnauthorizedException('No se proporcionó un token de autorización');
        }

        // Obtener el token del encabezado de autorización
        const token = authorizationHeader.split(' ')[1]; // El token suele estar en el formato "Bearer <token>"
        const payload = jwt.decode(token) as AuthorizationPayload

        if (!payload) {
            throw new UnauthorizedException('Token inválido');
        }
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTime) {
            throw new UnauthorizedException('El token ha expirado');
        }
        if (payload.iat && payload.iat > currentTime) {
            throw new UnauthorizedException('El token es inválido');
        }

        return super.canActivate(context);
    }
}
