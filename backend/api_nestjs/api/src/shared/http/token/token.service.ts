import { UsersService } from '../../../modules/user/services/user.service';
import { forwardRef } from '@nestjs/common/utils';
import { PrismaService } from '../../database/prisma.service';
import { Injectable, Inject } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthService } from '../providers/auth.service';
import { createTokenBody } from './dto/create-token-body';
import { User } from '../../../modules/user/entities/user.entity';
@Injectable()
export class tokenService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async save(hash: string, username: string, userId: string | number) {
    const objToken = await this.prisma.token.findFirst({
      where: {
        username: username,
      },
    });

    if (objToken) {
      return this.prisma.token.update({
        where: {
          id: objToken.id,
        },
        data: {
          hash: hash,
        },
      });
    } else {
      return this.prisma.token.create({
        data: {
          hash: hash,
          username: username,
          userId: Number(userId),
        },
      });
    }
  }

  async refreshToken(oldToken: string) {
    const objToken = await this.prisma.token.findFirst({
      where: { hash: oldToken },
    });

    if (objToken) {
      const user = await this.prisma.token.findFirst({
        where: { username: objToken.username },
      });
      return this.authService.login(user);
    } else {
      return new HttpException(
        {
          errorMessage: 'Token inválido',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getUsuarioByToken(token: string): Promise<User> {
    token = token.replace('Bearer ', '').trim();
    const objToken: createTokenBody = await this.prisma.token.findFirst({
      where: {
        hash: token,
      },
    });
    if (objToken) {
      const usuario = await this.userService.findByEmail(objToken.username);
      return usuario;
    } else {
      //é uma requisição inválida
      return null;
    }
  }

  async getUsuarioByTokenID(token: string): Promise<User> {
    token = token.replace('Bearer ', '').trim();
    const objToken: createTokenBody = await this.prisma.token.findFirst({
      where: {
        hash: token,
      },
    });
    if (objToken) {
      const usuario = await this.userService.findOne(objToken.userId);
      return usuario;
    } else {
      //é uma requisição inválida
      return null;
    }
  }
}
