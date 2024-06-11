import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/CreateMessage.dto';
import { Public } from '../decorators/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  // GET ROUTES
  @Public()
  // @UseGuards(JwtAuthGuard)
  @Get('getAll')
  async getAll() {
    return await this.messageService.getAll();
  }

  // POST ROUTES
  @Public()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createMessage(@Body() createMessageDto: CreateMessageDto, @Req() req: any) {
    const user = req.user.username;
    createMessageDto.username = user;
    const message = this.messageService.createMessage(createMessageDto);
    return message;
  }
}
