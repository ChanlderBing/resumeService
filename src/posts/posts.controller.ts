import { PostsService,PostsRo } from "./posts.service";
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService:PostsService){}

    @Post()
    async create(@Body() post){
        return await this.postsService.create(post)
    }
    @Post('update')
    async update(@Body() post){
        return await this.postsService.update(post)
    }
}

