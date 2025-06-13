/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { CreateSendEmailDto } from './dto/create-send-email.dto';
import { ApiBody } from '@nestjs/swagger';
import type { Subject } from 'rxjs';
import { create } from 'lodash';

@Controller('send-email')
export class SendEmailController {
  constructor(private readonly sendEmailService: SendEmailService) {}

  @Post()
   @ApiBody({
      schema: {
        type: 'object',
        properties: {
          to: { type: 'string', example: 'desenvolvedor.newmusic@gmail.com' },
          subject: { type: 'string', example: 'Bem vindo a nossa plataforma!' },
        },
        required: ['to', 'subject', 'html'],
      },
      description: 'Send email welcome',
      required: true,
    })
  welcome(@Body() createSendEmailDto: CreateSendEmailDto) {
    return this.sendEmailService.welcome(createSendEmailDto);
  }
  @Post('recovery')
   @ApiBody({
      schema: {
        type: 'object',
        properties: {
          to: { type: 'string', example: 'desenvolvedor.newmusic@gmail.com' },
          subject: { type: 'string', example: 'Recuperação de senha!' },
        },
        required: ['to', 'subject', 'html'],
      },
      description: 'Send email recovery',
      required: true,
    })
  recovery(@Body() createSendEmailDto: CreateSendEmailDto) {
    return this.sendEmailService.recovery(createSendEmailDto);
  }
  
@Post('blocked')
   @ApiBody({
      schema: {
        type: 'object',
        properties: {
          to: { type: 'string', example: 'desenvolvedor.newmusic@gmail.com' },
          subject: { type: 'string', example: 'Conta bloqueada!' },
        
        },
        required: ['to', 'subject'],
      },
      description: 'Send email',
      required: true,
    })
  blocked(@Body() createSendEmailDto: CreateSendEmailDto) {
    return this.sendEmailService.blocked({
      ...createSendEmailDto,
    });
  }

  @Post('blocked-definition')
   @ApiBody({
      schema: {
        type: 'object',
        properties: {
          to: { type: 'string', example: 'desenvolvedor.newmusic@gmail.com' },
          subject: { type: 'string', example: 'Conta extinta!' },
        
        },
        required: ['to', 'subject'],
      },
      description: 'Send email',
      required: true,
    })
  blockedDefinition(@Body() createSendEmailDto: CreateSendEmailDto) {
    return this.sendEmailService.blockedDefinition({
      ...createSendEmailDto,
    });
  }

 @Post('release')
   @ApiBody({
      schema: {
        type: 'object',
        properties: {
          to: { type: 'string', example: 'desenvolvedor.newmusic@gmail.com' },
          subject: { type: 'string', example: 'Lançamento efetuado!' },
        
        },
        required: ['to', 'subject'],
      },
      description: 'Send email',
      required: true,
    })
  release(@Body() createSendEmailDto: CreateSendEmailDto) {
    return this.sendEmailService.release({
      ...createSendEmailDto,
    });
  }

   @Post('contract')
   @ApiBody({
      schema: {
        type: 'object',
        properties: {
          to: { type: 'string', example: 'desenvolvedor.newmusic@gmail.com' },
          subject: { type: 'string', example: 'Contrato concluido!' },
        
        },
        required: ['to', 'subject'],
      },
      description: 'Send email',
      required: true,
    })
  contract(@Body() createSendEmailDto: CreateSendEmailDto) {
    return this.sendEmailService.finishContract({
      ...createSendEmailDto,
    });
  }


  @Post('send')
   @ApiBody({
      schema: {
        type: 'object',
        properties: {
          to: { type: 'string', example: 'desenvolvedor.newmusic@gmail.com' },
          subject: { type: 'string', example: 'Bem vindo a nossa plataforma!' },
        
        },
        required: ['to', 'subject'],
      },
      description: 'Send email',
      required: true,
    })
  sendEmail(@Body() createSendEmailDto: CreateSendEmailDto) {
    return this.sendEmailService.sendEmail({
      ...createSendEmailDto,
    });
  }
}