import { PostsService,PostsRo } from "./posts.service";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express'

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService:PostsService){}


    @UseGuards(AuthGuard('jwt'))
    @Post('update')
    async update(@Body() post,@Req() request:Request){
        console.log(request);
        return await this.postsService.update()
    }
 
    @UseGuards(AuthGuard('jwt'))
    @Get('getUserResume')
    async getUserResume(@Body() get,@Req() request){
        console.log(request.user);
        
        return await this.postsService.getUserResume()
    }
 
}

