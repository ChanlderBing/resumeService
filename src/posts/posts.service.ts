import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';


export interface PostsRo {
   // list: userEntity[];
  }
@Injectable()
export class PostsService {
    constructor(
      //  @InjectRepository(userEntity)
        //private readonly postsRepository: Repository<userEntity>,
      ) {}
      // 创建文章
  // async create(post: Partial<userEntity>): Promise<userEntity> {
  //   return await this.postsRepository.save(post);
  // }
  async update(): Promise<any> {
  const msg = 'niu'
    return  msg
  }
}
