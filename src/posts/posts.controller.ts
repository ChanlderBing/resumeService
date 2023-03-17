import { PostsService,PostsRo } from "./posts.service";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express'

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService:PostsService){}


    //@UseGuards(AuthGuard('jwt'))
    @Post('setPerson')
    async setPerson(@Body() post,@Req() request){
        return await this.postsService.setPerson(post)
    }
    
    @Post('updatePerson')
    async updatePerson(@Body() post,@Req() request){
        return await this.postsService.updatePerson(post)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('setWork')
    async setWork(@Body() post,@Req() request){
        return await this.postsService.setWork(post)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('setSchool')
    async setSchool(@Body() post,@Req() request){
        return await this.postsService.setSchool(post)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('setSummary')
    async setSummary(@Body() post,@Req() request){
        return await this.postsService.setSummary(post)
    }
 
    @UseGuards(AuthGuard('jwt'))
    @Get('getUserResume')
    async getUserResume(@Body() get,@Req() request){
         await this.postsService.getUserResume(request.user.id)
    }
}

