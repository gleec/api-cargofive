import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from './prisma-user-repository.service';
import { PrismaPostRepository } from './prisma-post-repository.service';

@Module({
  providers: [PrismaService, PrismaUserRepository, PrismaPostRepository],
  exports: [PrismaService, PrismaUserRepository, PrismaPostRepository]
})
export class PrismaModule {}
