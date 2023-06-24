import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from '../../../modules/user/dtos/create-user-body';
import { TokenService } from './token.service';
import { UsersModule } from '../../../modules/user/user.module';
import { tokenController } from './token.controller';
import { AuthModule } from '../../../shared/http/providers/auth.module';
import { forwardRef } from '@nestjs/common/utils';
import { Module } from '@nestjs/common';
import { UsersService } from 'src/modules/user/services/user.service';
import { AuthService } from '../providers/auth.service';

@Module({
  imports: [forwardRef(() => AuthModule), UsersModule],
  controllers: [tokenController],
  providers: [TokenService, PrismaService, UsersService, AuthService],
  exports: [TokenService],
})
export class tokenModule {}
