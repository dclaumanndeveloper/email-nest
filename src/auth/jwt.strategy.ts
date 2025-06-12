import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { z } from 'zod';
import { env } from 'src/env';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { sessions } from 'src/db/schema';

const tokenPayloadSchema = z.object({
  sub: z.string().uuid().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  token: z.string(),
});

export type UserPayload = z.infer<typeof tokenPayloadSchema>;

/**
 * Implements the JWT authentication strategy using Passport.
 * This strategy extracts the JWT from the Authorization header, verifies it using the secret key,
 * and validates the associated session in the database.
 */
/**
 * Constructs the JwtStrategy.
 * Reads the JWT secret from environment variables and configures the Passport JWT strategy.
 * @throws {Error} If the JWT_SECRET environment variable is not defined.
 */
/**
 * Validates the JWT payload.
 * This method is automatically called by Passport after a token has been successfully decoded and verified.
 * It checks if a session corresponding to the token in the payload exists in the database.
 *
 * @param payload - The decoded JWT payload. Expected to contain `sub` (user ID), `username`, and `token` (session token).
 * @returns An object containing the user's ID and username if the session is valid.
 * @throws {UnauthorizedException} If the session associated with the token is not found or is invalid.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload) {
    const userSession = await db
      .select()
      .from(sessions)
      .where(eq(sessions.token, payload.token))
      .limit(1)
      .then((res) => res[0]);

    if (!userSession) {
      throw new UnauthorizedException('Session invalid or expired');
    }

    return { userId: payload.sub, username: payload.username };
  }
}
