import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MediaDTO } from 'src/dtos/media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository) { }

  async createMedia(mediaDto: MediaDTO) {
    try {
        const { title, username } = mediaDto;
        if (!title || !username)
            throw new HttpException('Campos obrigatórios ausentes', HttpStatus.BAD_REQUEST);

        return await this.mediasRepository.createMedia({
            title,
            username
        });        

    } catch(error) {
        if(error.code === 'P2002' && error.meta.target.includes('title' && 'username')) 
            throw new HttpException('Media já existente', HttpStatus.CONFLICT)
        
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getMedias(){
    const medias = this.mediasRepository.getMedias();
    if(!medias) return [];

    return medias;
  }
}
