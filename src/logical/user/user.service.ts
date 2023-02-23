// src/logical/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { makeSalt, encryptPassword } from '../../utils/cryptogram'; // 引入加密函数
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { userEntity } from '../../posts/posts.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(userEntity)
        private readonly userRepository: Repository<userEntity>,
      ) {}
  /**
   * 查询是否有该用户
   * @param username 用户名
   */
  async findOne(username: string): Promise<any | undefined> {
    const sql = ``; // 一段平淡无奇的 SQL 查询语句
    try {
        const {code,msg} = await this.userRepository.query(`update user set where id ='5'`);
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }
   /**
   * 注册
   * @param requestBody 请求体
   */
    async register(requestBody: any): Promise<any> {
        const { accountName, realName, password, repassword, mobile } = requestBody;
        if (password !== repassword) {
          return {
            code: 400,
            msg: '两次密码输入不一致',
          };
        }
        const user = await this.findOne(accountName);
        if (user) {
          return {
            code: 400,
            msg: '用户已存在',
          };
        }
        const salt = makeSalt(); // 制作密码盐
        const hashPwd = encryptPassword(password, salt);  // 加密密码
        const registerSQL = `
          INSERT INTO admin_user
            (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
          VALUES
            ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
        `;
        try {
          
          return {
            code: 200,
            msg: 'Success',
          };
        } catch (error) {
          return {
            code: 503,
            msg: `Service error: ${error}`,
          };
        }
      }
}