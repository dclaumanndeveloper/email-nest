import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'Sample User' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['email', 'password'],
    },
    description: 'Login authentication',
    required: true,
  })
  async login(@Body() req: { username: string; password: string }) {
    console.log('req', req);
    return this.authService.login({
      email: req.username,
      password: req.password,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req: { user: any }): any {
    return req.user;
  }
}
