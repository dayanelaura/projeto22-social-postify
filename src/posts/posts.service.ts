import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { PostDTO } from 'src/dtos/post.dto';

@Injectable()
export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) { }

    async createPost(postDto: PostDTO) {
        try {
            const { title, text, image } = postDto;
            if (!title || !text)
                throw new HttpException('Campos obrigatórios ausentes', HttpStatus.BAD_REQUEST);

            return await this.postsRepository.createPost({
                title,
                text,
                image
            });      
        } catch(error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
        }

        async getPosts(){
            const posts = await this.postsRepository.getPosts();
            if(!posts) return [];

            let formatedPost = [];
            posts.map((post) => {
                const { id, title, text, image } = post;
                if(image){
                    formatedPost.push({
                        id,
                        title,
                        text,
                        image
                    });
                }else if(image===null){
                    formatedPost.push({
                        id,
                        title,
                        text
                    });
                }
            })

            return formatedPost;
        }
    
        async getPostById(id: number){
            const post = await this.postsRepository.getPostById(id);
            if(!post) throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
        
            const { title, text, image } = post;

            if(image){
                return[{
                    id,
                    title,
                    text,
                    image
                }];
            }else if(image===null){
                return [{
                    id,
                    title,
                    text
                }];
            }
    };
    
    async updatePostById(id: number, postDto: PostDTO) {
    try {
        const { title, text, image } = postDto;
        if (!title || !text)
            throw new HttpException('Campos obrigatórios ausentes', HttpStatus.BAD_REQUEST);

        return await this.postsRepository.updatePostById(id, title, text, image);        

    } catch(error) {
        if (error.meta.cause === "Record to update not found." && error.code === 'P2025')
            throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);

        throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    }

    async deletePostById(id: number) {
    try {
        const deletedPost = await this.postsRepository.deletePostById(Number(id));  
        
        if(deletedPost.publications.length > 0)
            throw new HttpException('Posts associados a publicações não podem ser excluídos', HttpStatus.FORBIDDEN);

    } catch(error) {
        if (error.meta.cause === "Record to delete does not exist." && error.code === 'P2025')
            throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);

        throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    }
}
