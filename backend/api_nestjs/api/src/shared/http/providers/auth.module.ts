import { forwardRef } from '@nestjs/common/utils';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../../../modules/user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/user/services/user.service';
import { TokenService } from '../token/token.service';
import { tokenModule } from '../token/token.module';
@Module({
  imports: [
    forwardRef(() => tokenModule),
    PassportModule.register({ defaultStrategy: 'bearer' }),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    forwardRef(() => AuthModule), // Certifique-se de importar o AuthModule aqui
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, TokenService],
  exports: [JwtModule, TokenService],
})
export class AuthModule {
  constructor(private readonly tokenService: TokenService) {}
}
