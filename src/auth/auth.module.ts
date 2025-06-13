/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { SendEmailService } from 'src/send-email/send-email.service';
import { SendEmailModule } from 'src/send-email/send-email.module';
@Injectable()
class JwtAuthGuard extends AuthGuard('jwt') {}

@Module({
  imports: [
    UsersModule,
    PassportModule,
    SendEmailModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
      verifyOptions: { algorithms: ['RS256'] },
      global: true,
    }),
  ],
  providers: [
    AuthService,
    SendEmailService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
