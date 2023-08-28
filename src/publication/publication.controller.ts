import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationDTO, UpdatedPublicationDTO } from 'src/dtos/publication.dto';

@Controller('publications')
export class PublicationController {
    constructor(private readonly publicationService: PublicationService) { }
  
    @Post()
    async createPost(@Body() publicationDto: PublicationDTO) {
      return await this.publicationService.createPublication(publicationDto);
    }
  
    @Get()
    async getPublications(){
      return await this.publicationService.getPublications();
    }
  
    @Get(':id')
    getPublicationById(@Param('id') id: number) {
      return this.publicationService.getPublicationById(Number(id));
    }
  
    @Put(':id')
    updatePublicationById(@Param('id') id: number, @Body() publicationDto: UpdatedPublicationDTO) {
      return this.publicationService.updatePublicationById(Number(id), publicationDto);
    }
  
    @Delete(':id')
    deletePublicationById(@Param('id') id: number) {
      return this.publicationService.deletePublicationById(Number(id));
    }
}
