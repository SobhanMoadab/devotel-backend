import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class GetPostsDTO {
    @IsOptional()
    @IsNumber()
    @Min(0)
    skip?: number;
  
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    limit?: number;
  }