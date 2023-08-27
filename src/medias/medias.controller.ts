import { Body, Controller, Post } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediaDTO } from 'src/dtos/media.dto';

@Controller("medias")
export class MediasController {
  constructor(private readonly mediasService: MediasService) { }

  @Post()
  async createMedia(@Body() mediaDto: MediaDTO) {
    return await this.mediasService.createMedia(mediaDto);
  }
}