import { PostsService } from "./posts.service";
import { Body, Controller, Get, Logger, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { inspect } from "util";
import { query } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService:PostsService){}

    @UseGuards(AuthGuard('jwt'))
    @Post('setUserResume')
    async setUserResume(@Body() post,@Req() request){
        return await this.postsService.setUserResume(request.user.id,post)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('updatePerson')
    async updatePerson(@Body() post,@Req() request){
        return await this.postsService.updatePerson(post)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('updateProject')
    async updateProject(@Body() post,@Req() request){
        return await this.postsService.updateProject(post)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('updateWork')
    async updateWork(@Body() post,@Req() request){
        return await this.postsService.updateWork(post)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('updateSchool')
    async updateSchool(@Body() post,@Req() request){
        return await this.postsService.updateSchool(post)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('updateSummary')
    async updateSummary(@Body() post,@Req() request){
        return await this.postsService.updateSummary(post)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('updateResumeName')
    async updateResumeName(@Body() post){
        return await this.postsService.updateResumeName(post)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('updateShowStatus')
    async updateShowStatus(@Body() post){
        return await this.postsService.updateShowStatus(post)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('updatePic')
    async updatePic(@Body() post,@Req() request){
        return await this.postsService.updatePic(post,request)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('setPerson')
    async setPerson(@Body() post,@Req() request){
        return await this.postsService.setPerson(null,post)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('setWork')
    async setWork(@Body() post,@Req() request){
        return await this.postsService.setWork(null,post)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('setProject')
    async setProject(@Body() post,@Req() request){
        return await this.postsService.setProject(null,post)
    }
    @UseGuards(AuthGuard('jwt'))
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
    @Get('ResumeInitByJWT')
    async ResumeInit(@Req() request){
        return await this.postsService.ResumeInit(request.user.id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getUserResumeName')
    async getUserResumeName(@Query('resumeId') resumeId){
        return await this.postsService.getUserResumeName(resumeId)
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

    @Get('getResumeInit')
    async getResumeInit(){
        return await this.postsService.ResumeInit(16)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('resumeDel')
    async resumeDel(@Body() post){
        return await this.postsService.resumeDel(post.resumeId)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('moudelDetailDel')
    async moudelDetailDel(@Body() post){
        return await this.postsService.moudelDetailDel(post.moduleId,post.id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('moudelSwitchDown')
    async moudelSwitchDown(@Body() post){
        return await this.postsService.moudelSwitchDown(post.resumeId,post.moduleId,post.moduleIndex)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('moudelSwitchUp')
    async mmoudelSwitchUp(@Body() post){
        return await this.postsService.moudelSwitchUp(post.resumeId,post.moduleId,post.moduleIndex)
    }
}


