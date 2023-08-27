import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediaDTO } from 'src/dtos/media.dto';

@Controller("medias")
export class MediasController {
  constructor(private readonly mediasService: MediasService) { }

  @Post()
  async createMedia(@Body() mediaDto: MediaDTO) {
    return await this.mediasService.createMedia(mediaDto);
  }

  @Get()
  async getMedias(){
    return await this.mediasService.getMedias();
  }

  @Get(':id')
  getMediaById(@Param('id') id: number) {
    return this.mediasService.getMediaById(Number(id));
  }

  @Put(':id')
  updateMediaById(@Param('id') id: number, @Body() mediaDto: MediaDTO) {
    return this.mediasService.updateMediaById(Number(id), mediaDto);
  }
}