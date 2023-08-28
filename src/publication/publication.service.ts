import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { PublicationDTO, UpdatedPublicationDTO } from 'src/dtos/publication.dto';
import { MediasService } from 'src/medias/medias.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class PublicationService {
    constructor(
        private readonly publicationRepository: PublicationRepository,
        private readonly mediasService: MediasService,
        private readonly postsService: PostsService
    ) { }

    async createPublication(publicationDto: PublicationDTO) {
        try {
            const { mediaId, postId, date } = publicationDto;    
            const now = new Date();
            const publicationDate = new Date(date);

            if(publicationDate <= now)
                return new HttpException('Agende para uma data futura', HttpStatus.FORBIDDEN)
            
            return await this.publicationRepository.createPublication({
                mediaId,
                postId,
                date,
            });        
    
        } catch(error) {
            if (error.meta.field_name === "publications_mediaId_fkey (index)" && error.code === 'P2003')
                throw new HttpException('Mídia não encontrada', HttpStatus.NOT_FOUND);
            else if (error.meta.field_name === "publications_postId_fkey (index)" && error.code === 'P2003')
                throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
            
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
      }
    
      async getPublications(published: string, after: string) {
        const allPublications = await this.publicationRepository.getPublications();
        if(!allPublications) return [];
        
        let filteredPublications = allPublications;
        
        const now = new Date();
        if (published === 'true')
            filteredPublications = filteredPublications.filter(publication => publication.date < now);
        else if (published === 'false')
            filteredPublications = filteredPublications.filter(publication => publication.date > now);
        if (after)
            filteredPublications = filteredPublications.filter(publication => publication.date > new Date(after));
    
        return filteredPublications;
    }
    
    async getPublicationById(id: number){
        const publication = await this.publicationRepository.getPublicationById(id);
        if(!publication) throw new HttpException('Publicação não encontrada', HttpStatus.NOT_FOUND);
    
        return publication;
    }
    
    async updatePublicationById(id: number, publicationDto: UpdatedPublicationDTO) {
        try {            
            const { mediaId, postId, date } = publicationDto;
            const newId = publicationDto.id;
            const now = new Date();
            const publicationDate = new Date(date);
                
            const lastDate = (await this.getPublicationById(id)).date;
            if(lastDate <= now)
                throw new HttpException('Publicação já realizada', HttpStatus.FORBIDDEN);

            if(publicationDate <= now)
                throw new HttpException('Agende para uma data futura', HttpStatus.FORBIDDEN);

            await this.postsService.getPostById(postId);
            await this.mediasService.getMediaById(mediaId);

            return await this.publicationRepository.updatePublicationById(id, newId, mediaId, postId, publicationDate);
        } catch(error) {

            if (error.response === 'Publicação já realizada' && error.status === 403)
                throw new HttpException('Publicação já realizada', HttpStatus.FORBIDDEN);
            else if (error.response === 'Agende para uma data futura' && error.status === 403)
                throw new HttpException('Agende para uma data futura', HttpStatus.FORBIDDEN);
            else if (error.response === 'Publicação não encontrada' && error.status === 404)
                throw new HttpException('Publicação não encontrada', HttpStatus.NOT_FOUND);
            else if (error.response === 'Post não encontrado' && error.status === 404)
                throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
            else if (error.response === 'Mídia não encontrada' && error.status === 404)
                throw new HttpException('Mídia não encontrada', HttpStatus.NOT_FOUND);
            else if (error.meta.target[0] === "id" && error.code === 'P2002')
                throw new HttpException('Você está tentando atualizar para um id já existente', HttpStatus.FORBIDDEN);
    
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
    
    async deletePublicationById(id: number) {
        try {
            await this.publicationRepository.deletePublicationById(Number(id));  
        } catch(error) {
            if (error.meta.cause === "Record to delete does not exist." && error.code === 'P2025')
                throw new HttpException('Publicação não encontrada', HttpStatus.NOT_FOUND);
    
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}