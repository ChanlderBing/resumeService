// src/logical/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { makeSalt, encryptPassword } from '../../utils/cryptogram'; // 引入加密函数
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { userEntity } from './user.entity';

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
  async findOne(userName: string): Promise<any | undefined> {
    const sql = `select userName,password,passwordSalt,id from user where userName ='${userName}' `; // 一段平淡无奇的 SQL 查询语句
    try {
        const user = await this.userRepository.query(sql);
        return user;
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
        const { userName,password, repassword } = requestBody;
        if (password !== repassword) {
          return {
            code: 400,
            msg: '两次密码输入不一致',
          };
        }
        const user = await this.findOne(userName);
        if (Array.prototype.isPrototypeOf(user) && user.length !== 0) {
          return {
            code: 400,
            msg: '用户已存在',
          };
        }
        const salt = makeSalt(); // 制作密码盐
        const hashPwd = encryptPassword(password, salt);  // 加密密码
        const registerSQL = `
          INSERT INTO user
            (userName, password, passwordSalt,photo)
          VALUES
            ('${userName}', '${hashPwd}', '${salt}','111')
        `;
        try {
          await this.userRepository.query(registerSQL)
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