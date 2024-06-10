import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MessageController } from './message/message.controller';
import { MessageModule } from './message/message.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, MessageModule],
  controllers: [AppController, MessageController],
  providers: [AppService],
})
export class AppModule {}
