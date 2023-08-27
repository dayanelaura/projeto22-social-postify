import { Injectable } from "@nestjs/common";
//import { PublicationDTO } from "src/dtos/publication.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PublicationRepository {
  constructor(private readonly prisma: PrismaService) { }

  /* async createMedia(body: PublicationDTO) {
    return await this.prisma.publication.create({ data: body })
  } */
}