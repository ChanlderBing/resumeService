import { PostsService,PostsRo } from "./posts.service";
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService:PostsService){}
    
    @Post('update')
    async update(@Body() post){
        return await this.postsService.update(post)
    }
    @Post('login')
// 如果使用@Response()需要使用res.send返回接口信息，使用原来的return无法返回响应
async login(@Body() info: LoginDto, @Response() res) {
  try {
    const { account, pwd } = info;
    const person = await this.userService.findUser(account); 
    // 登录失败
    if (person.pwd !== pwd) {
      throw new Error('账号或密码错误');
    }
    //登录成功
// 签发token: 此处将用户id和所属的组织机构id（后面接口会根据组织机构id做数据筛选）作为参数生成token
    let tokenParams = {
      userId: person.id,
    };
    // 按需添加departId属性：有的用户不属于任何组织机构，则不加
    if (person.department) {
      tokenParams['departId'] = person.department.id;
    }
    const token = this.certificationService.genToken(tokenParams);
    // 如通过Cookie来做也可以
    // res.cookie('auth', token, {
    //   httpOnly: true, // 前端不可获取和修改cookie，只能在http请求中自行携带
    //   signed: true,
    // });
    res.json(
      ResultData.success({
        account: person.account,
        userName: person.userName,
        role: person.role,
        userProjectCount: person.userProjectInfo?.length,
        auth: token.accessToken,
      }),
    );
  } catch (err) {
    res.json(ResultData.fail(AppHttpCode.LOGIN_FAIL, err.message));
  }
}
}

