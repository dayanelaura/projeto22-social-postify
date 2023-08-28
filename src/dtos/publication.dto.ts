import { Transform, Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class PublicationDTO {
  @IsNumber()
  mediaId: number;

  @IsNumber()
  postId: number;
  
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: string;
}
//Organicar dps com o Omit para não ficar repetido
export class UpdatedPublicationDTO {
  @IsNumber()
  id: number;

  @IsNumber()
  mediaId: number;

  @IsNumber()
  postId: number;
  
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: string;
}