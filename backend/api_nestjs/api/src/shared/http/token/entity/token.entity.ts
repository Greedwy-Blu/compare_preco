import { ApiProperty } from '@nestjs/swagger';

export class token {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  hash: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: Number })
  userId: number;
}
