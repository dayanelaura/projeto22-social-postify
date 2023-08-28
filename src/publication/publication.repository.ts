import { Injectable } from "@nestjs/common";
import { PublicationDTO } from "src/dtos/publication.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PublicationRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createPublication(body: PublicationDTO) {
    return this.prisma.publication.create({ data: body })
  }

  async getPublications(){
    return this.prisma.publication.findMany();
  }

  async getPublicationById(id: number) {
    return this.prisma.publication.findUnique({
      where: {
        id: id,
      },
    });
  }
  
  async updatePublicationById(id: number,  newId: number, mediaId: number, postId: number, date: Date) {
    return this.prisma.publication.update({
      where: {
        id: id,
      },
      data: {
        id: newId,
        mediaId: mediaId,
        postId: postId,
        date: date,
      },
    });
  }
  
  async deletePublicationById(id: number) {
    return this.prisma.publication.delete({
      where: {
        id: id,
      }
    });
  }
}