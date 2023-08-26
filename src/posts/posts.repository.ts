import { Injectable } from '@nestjs/common';
//import { CreatePostDTO } from '../../dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

/*   async addUser(data: CreatePostDTO) {
    await this.prisma.post.create({ data: data });
  } */

  async findAllPosts() {
    return await this.prisma.post.findMany({});
  }

  async findPostsById(id: number) {
    return await this.prisma.post.findFirst({ where: { id } });
  }
}