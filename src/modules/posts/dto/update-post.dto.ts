import { IsOptional, IsString, IsUrl } from "class-validator";

export class UpdatePostDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
