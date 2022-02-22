import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class PostQuery {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  author: number;

  @IsString()
  @IsOptional()
  category: string;
}


