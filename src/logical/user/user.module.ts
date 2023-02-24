import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { userEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [
  TypeOrmModule.forFeature([userEntity]),
  ],
  providers: [UserService, AuthService,JwtService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {
}
