import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostDTO } from 'src/dtos/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }
  
    @Post()
    async createPost(@Body() postDto: PostDTO) {
      return await this.postsService.createPost(postDto);
    }
  
    @Get()
    async getPosts(){
      return await this.postsService.getPosts();
    }
  
    @Get(':id')
    getPostById(@Param('id') id: number) {
      return this.postsService.getPostById(Number(id));
    }
  
    @Put(':id')
    updatePostById(@Param('id') id: number, @Body() postDto: PostDTO) {
      return this.postsService.updatePostById(Number(id), postDto);
    }
  
    @Delete(':id')
    deletePostById(@Param('id') id: number) {
      return this.postsService.deletePostById(Number(id));
    }
}
