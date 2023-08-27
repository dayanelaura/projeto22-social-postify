import { Injectable } from "@nestjs/common";
import { PostDTO } from "src/dtos/post.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(body: PostDTO) {
    return this.prisma.post.create({ data: body })
  }

  async getPosts(){
    return this.prisma.post.findMany();
  }

  async getPostById(id: number) {
    return this.prisma.post.findUnique({
      where: {
        id: id,
      },
    });
  }
  
  async updatePostById(id: number, title: string, text: string, image: string) {
    return this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        text: text,
        image: image,
      },
    });
  }
  
  async deletePostById(id: number) {
    return this.prisma.post.delete({
      where: {
        id: id,
      },
      include: {
        publications: true,
      },
    });
  }
}