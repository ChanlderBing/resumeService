import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { personalEntity,userEntity,workEntity,schoolEntity,summaryEntity,projectEntity } from '../posts/posts.entity';

@Module({
  imports:[TypeOrmModule.forFeature([userEntity]),
  TypeOrmModule.forFeature([personalEntity]),
  TypeOrmModule.forFeature([workEntity]),
  TypeOrmModule.forFeature([schoolEntity]),
  TypeOrmModule.forFeature([summaryEntity]),
  TypeOrmModule.forFeature([projectEntity])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
