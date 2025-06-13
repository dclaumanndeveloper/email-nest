/* eslint-disable prettier/prettier */
 
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserSchemaSignup, type UserSignup } from 'src/entity/userSignup';
import { AuthService } from './auth.service';
import { UserSchemaSignin, type UserSignin } from 'src/entity/userSignin';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe';
import { send } from 'process';
import { SendEmailService } from 'src/send-email/send-email.service';
import { is } from 'drizzle-orm';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sendEmailService: SendEmailService,
  ) {}

  @Post('signin')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'sample@email.com' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['email', 'password'],
    },
    description: 'Login authentication',
    required: true,
  })
  @UsePipes(new ZodValidationPipe(UserSchemaSignin))
  async signIn(
    @Body() user: UserSignin,
  ): Promise<{ token: any; message: string }> {
    const login = await this.authService.login(user);
    return { token: login, message: 'Login successful' };
  }
  @Post('refresh')
  async refresh(@Body() body: { refresh_token: string }) {
    return this.authService.refreshTokens(body.refresh_token);
  }

  @Post('signup')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'Sample User' },
        email: { type: 'string', example: 'teste@gmail.com' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['username', 'email', 'password'],
    },
    description: 'User object to be created',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Cadastrado com sucesso!',
  })
  @HttpCode(HttpStatus.CREATED) // Set the status code to 201
  @UsePipes(new ZodValidationPipe(UserSchemaSignup))
  async signUp(@Body() user: UserSignup) {
    const userCreate = {
      username: user.username,
      email: user.email,
      passwordHash: user.password
     
    };
    const createdUser = await this.authService.signup(userCreate);
    
    return { message: 'Cadastrado com sucesso!', user: createdUser };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  async getProfile(@Request() req: { user: { sub: string } }): Promise<any> {
    const userId: string = req.user.sub;
    const profile: any = await this.authService.findById(userId);
    if (!profile) {
      throw new Error('User not found');
    }
    return profile;
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT) // Set the status code to 204
  async logout(@Request() req: { user: { sub: string } }) {
    await this.authService.logout(req.user.sub);
  }
}
