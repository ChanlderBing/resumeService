import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return  '11' + process.env.NODE_ENV;
  }
  getHello1(post): string {
    return post.a ;
  }
}
