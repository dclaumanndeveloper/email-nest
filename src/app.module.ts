/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';

import { AuthService } from './auth/auth.service';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { SendEmailModule } from './send-email/send-email.module';
import { SendEmailService } from './send-email/send-email.service';
@Module({
  imports: [CacheModule.register(), AuthModule, UsersModule, SendEmailModule],
  controllers: [AuthController],
  providers: [AppService, AuthService, UsersService, SendEmailService, JwtService],
})
export class AppModule {}
