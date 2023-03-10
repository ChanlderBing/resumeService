import { PostsService,PostsRo } from "./posts.service";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express'

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService:PostsService){}


    @UseGuards(AuthGuard('jwt'))
    @Post('setUserResume')
    async setUserResume(@Body() post,@Req() request){
        return await this.postsService.update(post,request.user.id)
    }
 
    @UseGuards(AuthGuard('jwt'))
    @Get('getUserResume')
    async getUserResume(@Body() get,@Req() request){
         await this.postsService.getUserResume(request.user.id)
    }
 
}

