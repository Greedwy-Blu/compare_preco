import { forwardRef } from '@nestjs/common/utils';
import { User } from '../../../modules/user/entities/user.entity';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../../modules/user/services/user.service';
import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserToken } from './models/UserToken';
import { UserPayload } from './models/UserPayload';
import { UnauthorizedError } from './errors/unauthorized.error';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);
    this.tokenService.save(token, user.email, user.id);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
  async loginToken(token: string) {
    const user: User = await this.tokenService.getUsuarioByToken(token);
    if (user) {
      return this.login(user);
    } else {
      return new HttpException(
        {
          errorMessage: 'Token inválido',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
