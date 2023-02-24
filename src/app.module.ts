import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './config';
import { AuthModule } from './logical/auth/auth.module';
import { UserModule } from './logical/user/user.module';
import { UserController } from './logical/user/user.controller';

@Module({
  imports: [PostsModule,TypeOrmModule.forRoot(env.DATABASE_CONFIG), AuthModule, UserModule],
  controllers: [AppController,UserController],
  providers: [AppService],
})
export class AppModule {}
