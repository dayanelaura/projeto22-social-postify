import { Injectable } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';

@Injectable()
export class PublicationService {
    constructor(private readonly usersRepository: PublicationRepository) { }

}