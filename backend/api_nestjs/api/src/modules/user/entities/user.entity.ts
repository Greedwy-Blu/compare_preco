import { IsDefined } from 'class-validator';
import { PrecoProdutos } from './../../products/entities/product.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  email?: string;

  @ApiPropertyOptional({ type: String })
  password?: string;

  @ApiPropertyOptional({ type: String })
  name?: string;

  @IsDefined()
  PrecoProdutos!: PrecoProdutos[];
}
