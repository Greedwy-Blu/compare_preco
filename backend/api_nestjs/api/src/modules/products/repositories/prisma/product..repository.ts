import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../dtos/create-product-body';
import { PrecoProdutos } from '../../entities/product.entity';
import { ProductsRepository } from '../product.repository';
import { PrismaService } from 'src/shared/database/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductsPrismaRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<PrecoProdutos> {
    const product = plainToClass(PrecoProdutos, data);

    const newProduct = await this.prisma.precoProdutos.create({
      data: {
        nomeProduto: data.nomeProduto,
        preco: data.preco,
        promocao: data.promocao,
        tipoProduto: data.tipoProduto,
      },
    });

    return plainToClass(PrecoProdutos, newProduct);
  }

  async findAll(): Promise<PrecoProdutos[]> {
    const products = await this.prisma.precoProdutos.findMany();
    return plainToClass(PrecoProdutos, products);
  }

  async findOne(id: number): Promise<PrecoProdutos> {
    const product = await this.prisma.precoProdutos.findUnique({
      where: { id },
    });
    return plainToClass(PrecoProdutos, product);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.precoProdutos.delete({
      where: { id },
    });
  }

  async findByProduct(nomeProduto: string): Promise<PrecoProdutos> {
    const product = await this.prisma.precoProdutos.findUnique({
      where: { nomeProduto: { equals: nomeProduto } }, // Use a propriedade "equals" para comparar o nomeProduto
    });
    return plainToClass(PrecoProdutos, product);
  }
}
