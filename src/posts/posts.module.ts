import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { personalEntity,workEntity,schoolEntity,summaryEntity,projectEntity, resumeEntity } from '../posts/posts.entity';
import { UserService } from 'src/logical/user/user.service';
import { userEntity } from 'src/logical/user/user.entity';
import { personalmodelEntity } from 'src/entyties/personalModel.entity';
import { resumemodelEntity } from 'src/entyties/personModel.entity';
import { MulterModule } from '@nestjs/platform-express';
import path from 'path';
import { diskStorage } from 'multer';


@Module({
  imports:[
  TypeOrmModule.forFeature([resumemodelEntity]),
  TypeOrmModule.forFeature([personalmodelEntity]),
  TypeOrmModule.forFeature([resumeEntity]),
  TypeOrmModule.forFeature([userEntity]),
  TypeOrmModule.forFeature([personalEntity]),
  TypeOrmModule.forFeature([workEntity]),
  TypeOrmModule.forFeature([schoolEntity]),
  TypeOrmModule.forFeature([summaryEntity]),
  TypeOrmModule.forFeature([projectEntity]),],
  controllers: [PostsController],
  providers: [PostsService,UserService]
})
export class PostsModule {}
