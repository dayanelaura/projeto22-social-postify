import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class PostDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  text: string;

  image?: string;
}
