import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class MediaDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
