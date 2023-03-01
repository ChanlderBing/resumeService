import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from 'src/logical/user/user.entity';
import { getRepository, Repository } from 'typeorm';


export interface PostsRo {
   // list: userEntity[];
  }
@Injectable()
export class PostsService {
    constructor(
      //  @InjectRepository(userEntity)
      //   private readonly postsRepository: Repository<userEntity>,
      ) {}
      // 创建文章
  // async create(post: Partial<userEntity>): Promise<userEntity> {
  //   return await this.postsRepository.save(post);
  // }
  async update() {
  const msg = 'niu'
    return msg
  }

  async getUserResume() {
      return  "666"
    }
  
}
