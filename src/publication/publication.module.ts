import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { MediasModule } from 'src/medias/medias.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  providers: [PublicationService, PublicationRepository],
  controllers: [PublicationController],
  imports: [MediasModule, PostsModule]
})
export class PublicationModule {}
