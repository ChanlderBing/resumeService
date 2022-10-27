import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PostsEntity } from './posts.entity';

export interface PostsRo {
    list: PostsEntity[];
  }
@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>,
      ) {}
      
      // 创建文章
  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {

    if (post.resume.length > 500) {
        throw new HttpException('缺少文章标题', 401);
    }
    return await this.postsRepository.save(post);
  }
  async update(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const {information} = post;
    const {code,msg} = await this.postsRepository.query(`update user set information = ${information} where id ='5'`);

    return  msg
  }
}
