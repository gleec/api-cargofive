import { IsNotEmpty, IsString } from 'class-validator';

export class ScrapePosts {
  @IsString()
  @IsNotEmpty()
  category: string;
}


