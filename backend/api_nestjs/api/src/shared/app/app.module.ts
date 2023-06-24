import { ProductModule } from './../../modules/products/produtc.module';
import { Module } from '@nestjs/common';
import { TokenService } from '../http/token/token.service';
import { UsersModule } from 'src/modules/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../http/providers/constants';
import { AuthModule } from '../http/providers/auth.module';

@Module({
  imports: [
    UsersModule,
    ProductModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [JwtService],
})
export class AppModule {}
