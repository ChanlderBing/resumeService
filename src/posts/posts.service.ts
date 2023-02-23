import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { userEntity } from './posts.entity';

export interface PostsRo {
    list: userEntity[];
  }
@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(userEntity)
        private readonly postsRepository: Repository<userEntity>,
      ) {}
      // 创建文章
  async create(post: Partial<userEntity>): Promise<userEntity> {
    
    return await this.postsRepository.save(post);
  }
  async update(post: Partial<userEntity>): Promise<userEntity> {
    const {code,msg} = await this.postsRepository.query(`update user set where id ='5'`);
    return  msg
  }
}
