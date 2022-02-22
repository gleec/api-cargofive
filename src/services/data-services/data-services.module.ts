import { Module } from '@nestjs/common';
import { UserRepository } from '@core/abstracts/user-repository.abstract';
import { PostRepository } from '@core/abstracts/post-repository.abstract';
import { PrismaModule } from '@frameworks/prisma/prisma.module';
import { PrismaUserRepository } from '@frameworks/prisma/prisma-user-repository.service';
import { PrismaPostRepository } from '@frameworks/prisma/prisma-post-repository.service';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    },
    {
      provide: PostRepository,
      useClass: PrismaPostRepository
    }
  ],
  exports: [UserRepository, PostRepository]
})
export class DataServicesModule {}
