import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './config';

@Module({
  imports: [PostsModule,TypeOrmModule.forRoot(env.DATABASE_CONFIG)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
