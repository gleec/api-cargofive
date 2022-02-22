import { Module } from '@nestjs/common';
import { DataServicesModule } from '../data-services/data-services.module';
import { PostService } from './post-service.service';
import { ScraperService } from './scraper.service';

@Module({
  imports: [
    DataServicesModule
  ],
  providers: [
    PostService,
    ScraperService
  ],
  exports: [
    PostService
  ]
})
export class  PostServiceModule {}
