import { Injectable } from "@nestjs/common";
import { MediaDTO } from "src/dtos/media.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createMedia(body: MediaDTO) {
    return await this.prisma.media.create({ data: body })
  }
}