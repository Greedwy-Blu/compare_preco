import { TokenService } from './token.service';
import { RefreshTokenDto } from './dto/refresh-token';
import { Controller, Get, Put, Body } from '@nestjs/common';

@Controller('token')
export class tokenController {
  constructor(private tokenService: TokenService) {}
  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.tokenService.refreshToken(data.oldToken);
  }
}
