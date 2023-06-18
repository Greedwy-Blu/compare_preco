import { User } from '../../user/entities/user.eninty';
import { ApiProperty } from '@nestjs/swagger';

export class PrecoProdutos {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  nomeProduto: string;

  @ApiProperty({ type: String })
  preco: string;

  @ApiProperty({ type: String })
  promocao: string;

  @ApiProperty({ type: String })
  tipoProduto: string;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: Number })
  userId: number;
}
