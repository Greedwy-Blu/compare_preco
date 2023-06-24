import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { hashSync } from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

// data tranfer object
export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nomeProduto: string;

  @ApiProperty()
  @IsNotEmpty()
  preco: string;

  @ApiProperty()
  @IsString()
  promocao: string;

  @ApiProperty()
  @IsString()
  tipoProduto: string;
}
