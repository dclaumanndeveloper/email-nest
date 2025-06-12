import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './task/task.controller';
import { AuthController } from './auth/auth.controller';
import { TaskService } from './task/task.service';
import { AuthService } from './auth/auth.service';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';

@Module({
  imports: [CacheModule.register(), AuthModule, UsersModule],
  controllers: [TaskController, AuthController],
  providers: [AppService, TaskService, AuthService, UsersService, JwtService],
})
export class AppModule {}
