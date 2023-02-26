import { PostsService,PostsRo } from "./posts.service";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService:PostsService){}


    @UseGuards(AuthGuard('jwt'))
    @Post('update')
    async update(@Body() post){
        return await this.postsService.update()
    }
 
}

