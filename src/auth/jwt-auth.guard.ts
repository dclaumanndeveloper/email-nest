import {
  Injectable,
  UnauthorizedException,
  type ExecutionContext,
} from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { sessions } from 'src/db/schema';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<{
      [x: string]: Record<string, unknown>;
      headers: Record<string, unknown>;
    }>();
    const authHeader =
      typeof request.headers['authorization'] === 'string'
        ? request.headers['authorization']
        : undefined;
    const token = authHeader?.split(' ')[1];

    if (typeof token !== 'string') {
      throw new UnauthorizedException('Acesso negado!');
    }

    const payload = this.jwtService.verify<{
      payload: Record<string, unknown>;
    }>(token, {
      secret: process.env.JWT_SECRET,
    });
    request.user = payload;
    const userId = request.user.sub;
    if (typeof userId !== 'string') {
      throw new UnauthorizedException('Invalid user ID in token');
    }
    const isAuthenticated = await this.verificationUser(token);
    if (isAuthenticated) {
      return !!request.user;
    }

    throw new UnauthorizedException('Acesso negado!');
  }
  async verificationUser(token: string) {
    if (!token) {
      throw new UnauthorizedException('Acesso negado!');
    }
    const userSessions = await db
      .select()
      .from(sessions)
      .where(eq(sessions.token, token));
    const now = new Date();
    const allExpired =
      userSessions.length > 0 &&
      userSessions.every((session) => session.expiresIn <= now);
    if (allExpired) {
      await db.delete(sessions).where(eq(sessions.token, token));
      throw new UnauthorizedException(
        'Acesso negado! Todas as sessões expiraram.',
      );
    }
    if (userSessions.length === 0) {
      throw new UnauthorizedException(
        'No active sessions found for this user.',
      );
    }
    return true;
  }
}
