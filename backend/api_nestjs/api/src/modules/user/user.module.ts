import { forwardRef } from '@nestjs/common/utils';
import { Module } from '@nestjs/common';
import { UsersService } from './services/user.service';
import { UsersController } from './controllers/user.controller';
import { UsersRepository } from './repositories/users.repository';
import { UsersInMemoryRepository } from './repositories/in-memory/users.in-memory.reporitory';
import { PrismaService } from '../../shared/database/prisma.service';
import { UsersPrismaRepository } from './repositories/prisma/users.prisma.repository';
import { AuthModule } from 'src/shared/http/providers/auth.module';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
