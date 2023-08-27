import { Injectable } from "@nestjs/common";
import { MediaDTO } from "src/dtos/media.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createMedia(body: MediaDTO) {
    return this.prisma.media.create({ data: body })
  }

  async getMedias(){
    return this.prisma.media.findMany();
  }

  async getMediaById(id: number) {
    return this.prisma.media.findUnique({
      where: {
        id: id,
      },
    });
  }
  
  async updateMediaById(id: number, title: string, username: string) {
    return this.prisma.media.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        username: username,
      },
    });
  }
  
  async deleteMediaById(id: number) {
    return this.prisma.media.delete({
      where: {
        id: id,
      },
      include: {
        publications: true,
      },
    });
  }
}