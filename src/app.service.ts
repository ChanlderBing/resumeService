import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "牛的" ;
  }
  getHello1(post): string {
    return post.a ;
  }
}
