import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  published: Date;

  @IsString()
  @IsNotEmpty()
  author: string;

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

