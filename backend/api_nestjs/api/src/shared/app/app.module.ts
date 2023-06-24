import { forwardRef } from '@nestjs/common/utils';
import { tokenModule } from './../http/token/token.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '../http/providers/auth.module';
import { PrismaService } from '../database/prisma.service';
import { UsersService } from 'src/modules/user/services/user.service';
import { TokenService } from '../http/token/token.service';
import { UsersModule } from 'src/modules/user/user.module';
import { AuthService } from '../http/providers/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../http/providers/constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [TokenService, JwtService],
})
export class AppModule {}
