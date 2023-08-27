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
            throw new HttpException('Mídia já existente', HttpStatus.CONFLICT)
        
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getMedias(){
    const medias = await this.mediasRepository.getMedias();
    if(!medias) return [];

    return medias;
  }

  async getMediaById(id: number){
    const medias = await this.mediasRepository.getMediaById(id);
    if(!medias) throw new HttpException('Mídia não encontrada', HttpStatus.NOT_FOUND);

    return medias;
  }

  async updateMediaById(id: number, mediaDto: MediaDTO) {
    try {
        const { title, username } = mediaDto;
        if (!title || !username)
            throw new HttpException('Campos obrigatórios ausentes', HttpStatus.BAD_REQUEST);

        return await this.mediasRepository.updateMediaById(id, title, username);        

    } catch(error) {
        if(error.code === 'P2002' && error.meta.target.includes('title' && 'username')) 
            throw new HttpException('Mídia já existente', HttpStatus.CONFLICT)

        else if (error.meta.cause === "Record to update not found." && error.code === 'P2025')
            throw new HttpException('Mídia não encontrada', HttpStatus.NOT_FOUND);

        throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteMediaById(id: number) {
    try {
        const deletedMedia = await this.mediasRepository.deleteMediaById(Number(id));  
        
        if(deletedMedia.publications.length > 0)
            throw new HttpException('Mídias associadas a publicações não podem ser excluídas', HttpStatus.FORBIDDEN);

    } catch(error) {
        if (error.meta.cause === "Record to delete does not exist." && error.code === 'P2025')
            throw new HttpException('Mídia não encontrada', HttpStatus.NOT_FOUND);

        throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
