import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreatePostDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
