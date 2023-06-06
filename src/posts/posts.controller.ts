import { PostsService } from "./posts.service";
import { Body, Controller, Get, Logger, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { inspect } from "util";
import { query } from "express";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService:PostsService){}

    @UseGuards(AuthGuard('jwt'))
    @Post('setUserResume')
    async setUserResume(@Body() post,@Req() request){
        Logger.log(`${inspect(request.user)}`)
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
    @Post('setPerson')
    async setPerson(@Body() post,@Req() request){
        return await this.postsService.setPerson(10,post)
    }
    
    @Post('setSchool')
    async setSchool(@Body() post,@Req() request){
        return await this.postsService.setSchool(10,post)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('getUserResume')
    async getUserResume(@Query('resumeId') resumeId){
        return await this.postsService.getUserResume(resumeId)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getUserResumeAll')
    async getUserResumeAll(@Req() request){
        return await this.postsService.getUserResumeAll(request.user.id)
    }

    @Get('getUserResumeOne')
    async getUserResumeOne(){
        return await this.postsService.getUserResumeOne()
    }
}


