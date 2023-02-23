import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './config';
import { AuthService } from './logical/auth/auth.service';
import { AuthModule } from './logical/auth/auth.module';
import { UserModule } from './logical/user/user.module';

@Module({
  imports: [PostsModule,TypeOrmModule.forRoot(env.DATABASE_CONFIG), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
