import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  publishedAt: Date | string;

  @IsNumber()
  author: number;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  description: string;


}

export class UpdatePostDto extends PartialType(CreatePostDto) {}

