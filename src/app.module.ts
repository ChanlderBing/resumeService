import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './config';
import { AuthModule } from './logical/auth/auth.module';
import { UserModule } from './logical/user/user.module';
import { UserController } from './logical/user/user.controller';
// let envFilePath = ['.env'];
// export const IS_DEV = process.env.NODE_ENV !== 'production';

// if (IS_DEV) {
//   envFilePath.unshift('env.development');
// } else {
//   envFilePath.unshift('env.production');
// }

@Module({
  imports: [PostsModule,TypeOrmModule.forRoot(env.DATABASE_CONFIG), AuthModule, UserModule],
  controllers: [AppController,UserController],
  providers: [AppService],
})
export class AppModule {}
