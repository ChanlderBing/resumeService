import { PostsService,PostsRo } from "./posts.service";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express'

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService:PostsService){}


    @UseGuards(AuthGuard('jwt'))
    @Post('setUserResume')
    async setPerson(@Body() post,@Req() request){
        return await this.postsService.setUserResume(request.user.id,post)
    }
    
    @Post('updatePerson')
    async updatePerson(@Body() post,@Req() request){
        return await this.postsService.updatePerson(post)
    }
    @Post('updateProject')
    async updateProject(@Body() post,@Req() request){
        return await this.postsService.updateProject(post)
    }
    @Post('updateWork')
    async updateWork(@Body() post,@Req() request){
        return await this.postsService.updateWork(post)
    }
    @Post('updateSchool')
    async updateSchool(@Body() post,@Req() request){
        return await this.postsService.updateSchool(post)
    }
 
    @UseGuards(AuthGuard('jwt'))
    @Get('getUserResume')
    async getUserResume(@Body() get,@Req() request){
         await this.postsService.getUserResume(request.user.id)
    }
}

