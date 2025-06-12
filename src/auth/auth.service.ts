import {
  BadRequestException,
  Injectable,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService, type User } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import type { UserSignin } from 'src/entity/userSignin';
import { db } from 'src/db';
import { sessions, users, tracks } from 'src/db/schema';
import bcrypt from 'bcrypt';
import { env } from 'src/env';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(signup: User) {
    db.query.tracks.findMany({});
    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.email, signup.email))
      .limit(1)
      .then((res) => res[0]);
    if (userExists) {
      throw new BadRequestException('Email já cadastrado');
    }
    const user = await this.usersService.create(signup);
    const { ...result } = user;
    return result;
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);

    if (!user || typeof user.passwordHash !== 'string') {
      throw new BadRequestException('Usuário ou senha inválidos');
    }

    const match = await bcrypt.compare(pass, user.passwordHash);

    if (!match) {
      return null;
    }
    const { passwordHash, ...result } = user;

    return result as User;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.usersService.findById(id);
    if (!user) throw new Error('User not found');
    if (!user.isActive) throw new Error('User is not active');
    const { ...result } = user;

    return result as User;
  }

  async login(user: UserSignin) {
    const validatedUser = await this.validateUser(user.email, user.password);

    if (!validatedUser) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
    const payload = {
      sub: validatedUser.id,
      username: validatedUser.username,
      email: validatedUser.email,
    };
    const { id, username, email } = validatedUser;
    const jwtSecret = process.env.JWT_SECRET || env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not set in environment variables');
    }

    const access_token = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: jwtSecret,
    });
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: jwtSecret,
    });
    const session = await db
      .insert(sessions)
      .values({
        userId: id,
        token: access_token,
        refreshToken: refresh_token,
        expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      })
      .returning();

    return { access_token, refresh_token, user: { id, username } };
  }
  async refreshTokens(refreshToken: string) {
    const session = await db
      .select()
      .from(sessions)
      .where(eq(sessions.refreshToken, refreshToken))
      .limit(1)
      .then((res) => res[0]);

    if (!session) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    interface JwtPayload {
      sub: string;
      username: string;
      email: string;
    }

    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: process.env.JWT_SECRET || env.JWT_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newAccessToken = await this.jwtService.signAsync(
      { sub: payload.sub, username: payload.username, email: payload.email },
      { expiresIn: '15m', secret: process.env.JWT_SECRET || env.JWT_SECRET },
    );

    const newRefreshToken = await this.jwtService.signAsync(
      { sub: payload.sub, username: payload.username, email: payload.email },
      { expiresIn: '7d', secret: process.env.JWT_SECRET || env.JWT_SECRET },
    );

    await db.delete(sessions).where(eq(sessions.refreshToken, refreshToken));
    await db.insert(sessions).values({
      userId: payload.sub,
      token: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }
  async logout(userId: string) {
    await db.delete(sessions).where(eq(sessions.userId, userId));
    return { message: 'Logged out successfully' };
  }
}
