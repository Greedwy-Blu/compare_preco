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
}
