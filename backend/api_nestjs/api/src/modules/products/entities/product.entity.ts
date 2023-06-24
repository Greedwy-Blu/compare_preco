import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsInt } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

export class PrecoProdutos {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  nomeProduto?: string;

  @ApiPropertyOptional({ type: String })
  preco?: string;

  @ApiPropertyOptional({ type: String })
  promocao?: string;

  @IsDefined()
  user!: User;

  @IsDefined()
  @IsInt()
  userId!: number;
}
