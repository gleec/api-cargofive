import { Module } from '@nestjs/common';
import { UserRepository } from 'src/core/abstracts/user-repository.abstract';
import { PostRepository } from 'src/core/abstracts/post-repository.abstract';
import { MemoryPostRepositoryService } from 'src/frameworks/memory/memory-post-repository.service';
import { PrismaUserRepository } from 'src/frameworks/prisma/prisma-user-repository.service';
import { PrismaModule } from 'src/frameworks/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    },
    {
      provide: PostRepository,
      useClass: MemoryPostRepositoryService
    }
  ],
  exports: [UserRepository, PostRepository]
})
export class DataServicesModule {}
