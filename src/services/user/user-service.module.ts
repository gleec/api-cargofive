import { Module } from '@nestjs/common';
import { DataServicesModule } from '../data-services/data-services.module';
import { UserService } from './user-service.service';

@Module({
  imports: [
    DataServicesModule
  ],
  providers: [
    UserService
  ],
  exports: [
    UserService
  ]
})
export class UserServiceModule {}
